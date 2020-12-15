import {expect, test} from '@oclif/test'

describe('secrets:remove', () => {
  test
  .stdout()
  .command(['secrets:remove'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['secrets:remove', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
