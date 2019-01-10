import {expect, test} from '@oclif/test'

xdescribe('post-commit', () => {
  test
    .stdout()
    .command(['post-commit'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['post-commit', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
