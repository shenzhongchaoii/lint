import fs from 'fs-extra'
import glob from 'fast-glob'
import path from 'path'
import log, { type Content } from './log'

const copyFiles = ({
  files,
  destDir
}: Record<'files', string[]> & Record<'destDir', string>) => {
  return Promise.all(
    files.map(file => {
      const dest = path.resolve(destDir, `.${path.basename(file)}`)
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
    onlyFiles: true
  })

  return copyFiles({
    files,
    destDir: process.cwd()
  })
}

const logs: Content[][] = [
  [
    {
      color: 'blue',
      text: '@tttiga/lint: tttiga-lint install: '
    },
    {
      color: 'blue',
      text: 'ℹ '
    },
    {
      color: 'white',
      text: 'Generating configuration files'
    }
  ],
  [
    {
      color: 'blue',
      text: '@tttiga/lint: tttiga-lint install: '
    },
    {
      color: 'green',
      text: '✔ '
    },
    {
      color: 'white',
      text: 'Generate successful for .eslintrc.js, .eslintignore, .prettierrc.js, .prettierignore, .stylelintrc.js, .stylelintignore, .lintstagedrc.js, .commitlintrc.js, .huskyrc.js, .husky/'
    }
  ]
]

export const createConfigFiles = async (): Promise<
  Record<'successful' | 'fail', number> & Partial<Record<'logs', string[]>>
> => {
  log(logs[0])

  let result
  try {
    await createConfigFile()

    log(logs[1])

    result = {
      successful: 1,
      fail: 0,
      logs: [
        logs[0].map(ele => ele.text).join(''),
        logs[1].map(ele => ele.text).join('')
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
