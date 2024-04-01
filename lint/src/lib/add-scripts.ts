import fs from 'fs-extra'
import log from './log'

export const addScripts = async (): Promise<
  Record<'successful' | 'fail', number> & Partial<Record<'logs', string[]>>
> => {
  log(
    `{blue @tttiga/lint: tttiga-lint install: ℹ }Adding scripts to package.json`
  )
  let result
  try {
    const json = await fs.readFile('package.json', 'utf-8')
    const data: Record<string, any> = JSON.parse(json)
    data.scripts = data.scripts || {}
    data.scripts['prepare'] = 'husky install'
    data.scripts['lint:eslint'] =
      'eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix'
    data.scripts['lint:prettier'] =
      'prettier --write "**/*.{js,json,tsx,css,less,scss,vue,html,md}"'
    data.scripts['lint:stylelint'] =
      'stylelint --cache --fix "**/*.{vue,less,postcss,css,scss}" --cache --cache-location node_modules/.cache/stylelint/'
    data.scripts['lint:lint-staged'] = 'lint-staged'
    data.scripts['lint'] =
      'npm run lint:eslint && npm run lint:prettier && npm run lint:stylelint'
    const modifiedJson = JSON.stringify(data, null, 2)
    await fs.writeFile('package.json', modifiedJson, 'utf8')

    log(
      `{blue @tttiga/lint: tttiga-lint install: }{green ✔ }Add successful for scripts["prepare"], scripts["lint:eslint"], scripts["lint:prettier"], , scripts["lint:stylelint"], scripts["lint:lint-staged"], scripts["lint"]`
    )

    result = {
      successful: 1,
      fail: 0,
      logs: [
        '@tttiga/lint: tttiga-lint install: ℹ Adding scripts to package.json',
        '@tttiga/lint: tttiga-lint install: ✔ Add successful for scripts["prepare"], scripts["lint:eslint"], scripts["lint:prettier"], , scripts["lint:stylelint"], scripts["lint:lint-staged"], scripts["lint"]'
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

export default addScripts
