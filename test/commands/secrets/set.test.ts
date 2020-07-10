import {expect, test} from '@oclif/test'

describe('secrets:set', () => {
  test
  .stdout()
  .command(['secrets:set'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['secrets:set', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
