import chalk from 'chalk'

export interface Content {
  color: 'white' | 'blue' | 'gray' | 'green' | 'red'
  text: string
}

export const log = (content: Content[] | string) => {
  const message =
    typeof content === 'string'
      ? chalk.white(content)
      : content.map(ele => chalk[ele.color](ele.text)).join('')

  // @eslint-disabled-next-line
  console.log(message)
}

export default log
