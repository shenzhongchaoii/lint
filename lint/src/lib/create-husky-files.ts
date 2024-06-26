import util from 'util'
import { exec } from 'child_process'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'

export const processExec = util.promisify(exec)

const files = [
  'pre-commit',
  'prepare-commit-msg',
  'commit-msg',
  'post-commit',
  'applypatch-msg',
  'pre-applypatch',
  'post-applypatch',
  'pre-rebase',
  'post-rewrite',
  'post-checkout',
  'post-merge',
  'pre-push',
  'pre-auto-gc'
]

const createFiles = async (dir = '.husky') => {
  if (process.env.HUSKY === '0') return 'HUSKY=0 skip install'
  if (dir.includes('..')) return '.. not allowed'

  fs.mkdirSync(path.join(dir, '_'), { recursive: true })

  files.forEach(file =>
    fs.writeFileSync(
      path.join(dir, '_', file),
      `#!/usr/bin/env sh\n. "\${0%/*}/h"`,
      { mode: 0o755 }
    )
  )
  fs.writeFileSync(path.join(dir, '_', '.gitignore'), '*')
  fs.writeFileSync(path.join(dir, '_', 'husky.sh'), '')
  fs.writeFileSync(
    path.join(dir, 'commit-msg'),
    `#!/usr/bin/env sh\n. "$(dirname -- "$0")/_/husky.sh"\n\nnpx --no -- commitlint --edit $1`,
    { mode: 0o755 }
  )
  fs.writeFileSync(
    path.join(dir, 'pre-commit'),
    `#!/usr/bin/env sh\n. "$(dirname -- "$0")/_/husky.sh"\n\nnpm run lint:lint-staged`,
    { mode: 0o755 }
  )

  await fs.copyFile(
    path.resolve(process.argv[1], '../../dist/tpl/husky/h'),
    path.join(dir, '_', 'h')
  )

  return ''
}

/**
 * @description 安装指定包
 */
export const createHuskyFiles = async (): Promise<
  Record<'successful' | 'fail', number> & Partial<Record<'logs', string[]>>
> => {
  console.log(
    `${chalk.blue('@tttiga/lint: tttiga-lint install: ℹ ')}Generating husky's configuration files`
  )

  // 安装
  await createFiles()

  console.log(
    `${chalk.blue('@tttiga/lint: tttiga-lint install: ')}${chalk.green('✔ ')}Generate successful for husky's configuration files`
  )

  return {
    successful: 1,
    fail: 0,
    logs: [
      "@tttiga/lint: tttiga-lint install: ℹ Generating husky's configuration files",
      "@tttiga/lint: tttiga-lint install: ✔ Generate successful for husky's configuration files"
    ]
  }
}

export default createHuskyFiles
