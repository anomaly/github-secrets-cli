import {Command, flags} from '@oclif/command'
import {CLIError} from '@oclif/errors'
import dotenv from 'dotenv'
import {request} from '@octokit/request'
import fs from 'fs-extra'
import sodium from 'tweetsodium'
import {configuration} from '../../utils/config'
import yaml from 'js-yaml'

type Env = {[env: string]: string}

export default class SecretsSync extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    personalAccessToken: flags.string({
      char: 't',
      description: 'Your GitHub Personal Access Token.',
      required: false,
    }),
    org: flags.string({
      char: 'o',
      description: 'Organisation the repo belongs to.',
      required: false,
    }),
    repo: flags.string({
      char: 'r',
      description: 'Name of the repo.',
      required: false,
    }),
    base64: flags.boolean({
      char: 'b',
      description: 'base64 the values before encoding.',
      required: false,
      default: false,
    }),
    format: flags.string({
      char: 'f',
      description: 'File format to parse secrets from.',
      required: true,
      options: ['env', 'json', 'yaml'],
    }),
  }

  static args = [{
    name: 'file', 
    required: true,
    description: 'Path to the file to read from.'
  }]

  async run() {
    const {args, flags} = this.parse(SecretsSync)

    try {
      if (!args.file) {
        this.error(new CLIError('Please provide a file'))
      }
      const messageString = fs.readFileSync(args.file, 'utf-8')

      let output: Env = {}

      switch (flags.format) {
        case 'env':
          output = dotenv.parse(messageString, {debug: true})
          // Check that the parser could read anything valid from the file
          if (
            Object.keys(output).length === 0 ||
            output.constructor !== Object
          ) {
            this.error('File is either empty or not a valid .env format')
          }
          break
        case 'json':
          try {
            output = JSON.parse(messageString)
            // Check that the parser could read anything valid from the file
          } catch (error) {
            this.error('File is either empty or not a valid json format')
          }
          break
        case 'yaml':
          output = yaml.load(messageString) as Env
          // Check that the parser could read anything valid from the file
          if (
            Object.keys(output).length === 0 ||
            output?.constructor !== Object
          ) {
            this.error('File is either empty or not a valid yaml format')
          }
          break
      }

      const conf = await configuration(this)

      const requestWithAuth = request.defaults({
        headers: {
          authorization: `token ${
            flags.personalAccessToken ?? conf.personalAccessToken
          }`,
        },
      })

      const {data: token} = await requestWithAuth(
        'GET /repos/{owner}/{repo}/actions/secrets/public-key',
        {
          owner: flags.org ?? conf.org,
          repo: flags.repo ?? conf.repo,
        }
      )

      Object.keys(output).forEach(async key => {
        let value = output[key]
        if (flags.base64) {
          value = Buffer.from(value).toString('base64')
        }

        const messageBytes = Buffer.from(value)

        const keyBytes = Buffer.from(token.key, 'base64')

        const encryptedBytes = sodium.seal(messageBytes, keyBytes)

        const encrypted = Buffer.from(encryptedBytes).toString('base64')

        try {
          await requestWithAuth(
            'PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}',
            {
              owner: flags.org ?? conf.org,
              repo: flags.repo ?? conf.repo,
              secret_name: key,
              encrypted_value: encrypted,
              key_id: token.key_id,
            }
          )
          this.log(`Updated secret: ${key}`)
        } catch (error) {
          this.error(`Unable to update secret: ${key} \n${error}`)
        }
      })
    } catch (error) {
      this.error(new CLIError(error), {exit: 1})
    }
  }
}
