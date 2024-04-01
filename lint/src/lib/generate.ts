import createConfigFiles from './create-config-files'
import addScripts from './add-scripts'
import createHuskyFiles from './create-husky-files'
import {
  checkCacheLog,
  createCacheLog,
  type TaskRecordData
} from './create-cache-log'
import log from './log'
import path from 'path'

const taskRecord = () => {
  const data: TaskRecordData = {
    startTime: Date.now(),
    tasks: {
      successful: 0,
      fail: 0
    },
    logs: [
      '· Running tttiga-lint install',
      `@tttiga/lint: tttiga-lint install: > @tttiga/lint tttiga-lint install ${process.cwd()}`
    ]
  }
  return {
    data,
    record: ({
      successful = 0,
      fail = 0,
      logs = []
    }: Partial<
      Record<'successful' | 'fail', number> & Record<'logs', string[]>
    >) => {
      data.tasks.successful += successful
      data.tasks.fail += fail
      data.logs = data.logs.concat(logs)
    }
  }
}

/**
 * @description 生成配置文件、添加 lint scripts 命令
 */
const generate = async (): Promise<void> => {
  log(
    `· Running tttiga-lint install\n{blue @tttiga/lint: tttiga-lint install: }> @tttiga/lint tttiga-lint install ${process.cwd()}`
  )

  const cacheLogStat = await checkCacheLog()

  if (cacheLogStat !== false) {
    const { data, record } = taskRecord()
    record(await createConfigFiles())
    record(await addScripts())
    record(await createHuskyFiles())

    createCacheLog(data, cacheLogStat)
  } else {
    log(
      `{blue @tttiga/lint: tttiga-lint install: }{red Break: Cache log file exists: }{blue ${path.join(process.cwd(), 'tttiga-lint/cache.log')}}`
    )
  }
}

export default generate
