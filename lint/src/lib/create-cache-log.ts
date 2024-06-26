import fs from 'fs-extra'
import chalk from 'chalk'

/**
 * @description 获取文件或目录的状态
 */
const checkStat = (path: string) => {
  return new Promise(resolve => {
    fs.stat(path, (error, stats) => {
      if (error) {
        resolve(false)
      } else {
        resolve(stats)
      }
    })
  })
}

export const checkCacheLog = async () => {
  const dirStat = (await checkStat('.tttiga-lint/cache.log')) as fs.Stats
  if (dirStat) {
    const data = await fs.readFile('.tttiga-lint/cache.log', 'utf-8')
    if (data.length > 0) {
      return false
    }

    return
  }
  return true
}

export interface TaskRecordData {
  startTime: number
  tasks: Record<'successful' | 'fail', number>
  logs: string[]
}

export const createCacheLog = async (
  taskRecordData: TaskRecordData,
  cacheLogStat?: boolean
) => {
  if (cacheLogStat) {
    await fs.mkdir('.tttiga-lint')
  }

  let logText = taskRecordData.logs.join('\n')
  await fs.writeFile('.tttiga-lint/cache.log', logText)

  const taskStr = `${taskRecordData.tasks.successful + 1} successful, ${
    taskRecordData.tasks.fail
  } fail 4 total`

  const timeStr = `${
    Math.round((Date.now() - taskRecordData.startTime) * 1000) / 1000 / 1000
  }s`

  console.log(
    `${chalk.blue('@tttiga/lint: tttiga-lint install: ')}Σ Generate successful for .tttiga-lint/cache.log successful`
  )

  logText += `
@tttiga/lint: tttiga-lint install: Σ Generate successful for .tttiga-lint/cache.log successful

Tasks:    ${taskStr}
Cached:    1 cached, 1 total
Time:    ${timeStr}
  `
  await fs.writeFile('.tttiga-lint/cache.log', logText, 'utf8')
  console.log(
    `Tasks:    ${taskStr}\nCached:    1 cached, 1 total\nTime:    ${timeStr}`
  )
}

export default createCacheLog
