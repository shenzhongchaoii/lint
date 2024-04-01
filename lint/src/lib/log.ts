import chalk from 'chalk'

export interface Content {
  color: 'white' | 'blue' | 'gray' | 'green' | 'red'
  text: string
}

export const log = (text: string) => {
  // @eslint-disabled-next-line
  console.log(chalk`${text}`)
}

export default log
