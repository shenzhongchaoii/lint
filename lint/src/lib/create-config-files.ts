import fs from 'fs-extra'
import glob from 'fast-glob'
import path from 'path'
import chalk from 'chalk'

const copyFiles = ({
  files,
  destDir
}: Record<'files', string[]> & Record<'destDir', string>) => {
  return Promise.all(
    files.map(file => {
      const dest = path.resolve(destDir, path.basename(file))
      return fs.copyFile(file, dest)
    })
  )
}

const createConfigFile = async () => {
  const json = await fs.readFile('package.json', 'utf-8')
  const { type }: Record<string, any> = JSON.parse(json)

  const source = path.resolve(
    process.argv[1],
    `../../dist/tpl/${!type || type === 'commonjs' ? 'cjs' : 'es'}`
  )
  const files = await glob('**/*', {
    cwd: source,
    absolute: true,
    onlyFiles: true,
    dot: true
  })

  return copyFiles({
    files,
    destDir: process.cwd()
  })
}

export const createConfigFiles = async (): Promise<
  Record<'successful' | 'fail', number> & Partial<Record<'logs', string[]>>
> => {
  console.log(
    `${chalk.blue('@tttiga/lint: tttiga-lint install: ℹ ')}Generating configuration files`
  )

  let result
  try {
    await createConfigFile()

    console.log(
      `${chalk.blue('@tttiga/lint: tttiga-lint install: ')}${chalk.green('✔ ')}Generate successful for .eslintrc.js, .eslintignore, .prettierrc.js, .prettierignore, .stylelintrc.js, .stylelintignore, .lintstagedrc.js, .commitlintrc.js, .huskyrc.js, .husky/`
    )

    result = {
      successful: 1,
      fail: 0,
      logs: [
        '@tttiga/lint: tttiga-lint install: ℹ Generating configuration files',
        '@tttiga/lint: tttiga-lint install: ✔ Generate successful for .eslintrc.js, .eslintignore, .prettierrc.js, .prettierignore, .stylelintrc.js, .stylelintignore, .lintstagedrc.js, .commitlintrc.js, .huskyrc.js, .husky/'
      ]
    }
  } catch {
    result = {
      successful: 0,
      fail: 1
    }
  }

  return result
}

export default createConfigFiles
