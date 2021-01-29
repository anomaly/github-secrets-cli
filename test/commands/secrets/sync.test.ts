import {expect, test} from '@oclif/test'

describe('secrets:sync', () => {
  test
  .stdout()
  .command(['secrets:sync'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['secrets:sync', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
