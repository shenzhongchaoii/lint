#!/usr/bin/env node
import { Command } from 'commander'
import generate from './lib/generate'
// @ts-ignore
import { version } from '../package.json'

// 构建运行程序
const program = new Command()

program
  // options
  .version(version || '0.0.1', '-v, --version')
  // commands
  .command('install')
  .description(
    '生成eslint、prettier、stylelint、lint-staged、husky、commitlint 配置文件、添加 lint scripts 命令等'
  )

  // 执行对应输出
  .action(() => {
    generate()
  })

// 开始解析
program.parse()
