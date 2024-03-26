export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
      /**
       * type[scope]: [function] description
       *
       * ^^^^^^^^^^^^^^ empty line.
       * - Something here
       */
      'body-leading-blank': [1, 'always'],
      /**
       * type[scope]: [function] description
       *
       * - something here
       *
       * ^^^^^^^^^^^^^^
       */
      'footer-leading-blank': [1, 'always'],
      /**
       * type[scope]: [function] description [No more than 72 characters]
       *      ^^^^^
       */
      'header-max-length': [2, 'always', 72],
      /**
       * type[scope]: [function] description
       *      ^^^^^
       */
      'scope-enum': [2, 'always', scopes],
      'scope-case': [2, 'always', 'lower-case'],
      'subject-case': [
        1,
        'never',
        ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
      ],
      'subject-empty': [2, 'never'],
      'subject-full-stop': [2, 'never', '.'],
      'type-case': [2, 'always', 'lower-case'],
      'type-empty': [2, 'never'],
      /**
       * type[scope]: [function] description
       * ^^^^
       */
      'type-enum': [
        2,
        'always',
        [
          'build',
          'chore',
          'ci',
          'docs',
          'feat',
          'fix',
          'perf',
          'refactor',
          'revert',
          'release',
          'style',
          'test',
          'improvement'
        ]
      ]
    },
    prompt: {
      // 中英文对照版
      // messages: {
      //   type: '选择你要提交的类型 :',
      //   scope: '选择一个提交范围 (可选):',
      //   customScope: '请输入自定义的提交范围 :',
      //   subject: '填写简短精炼的变更描述 :\n',
      //   body: '填写更加详细的变更描述 (可选)。使用 "|" 换行 :\n',
      //   breaking: '列举非兼容性重大的变更 (可选)。使用 "|" 换行 :\n',
      //   footerPrefixsSelect: '选择关联issue前缀 (可选):',
      //   customFooterPrefixs: '输入自定义issue前缀 :',
      //   footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      //   confirmCommit: '是否提交或修改commit ?'
      // },
      // types: [
      //   { value: 'feat', name: 'feat:     新增功能' },
      //   { value: 'fix', name: 'fix:      修复缺陷' },
      //   { value: 'docs', name: 'docs:     文档变更' },
      //   { value: 'style', name: 'style:    代码格式' },
      //   { value: 'refactor', name: 'refactor: 代码重构' },
      //   { value: 'perf', name: 'perf:     性能优化' },
      //   { value: 'test', name: 'test:     添加疏漏测试或已有测试改动' },
      //   {
      //     value: 'build',
      //     name: 'build:    构建流程、外部依赖变更 (如升级 npm 包、修改打包配置等)'
      //   },
      //   { value: 'ci', name: 'ci:       修改 CI 配置、脚本' },
      //   { value: 'revert', name: 'revert:   回滚 commit' },
      //   {
      //     value: 'chore',
      //     name: 'chore:    对构建过程或辅助工具和库的更改 (不影响源文件、测试用例)'
      //   },
      //   { value: 'wip', name: 'wip:      正在开发中' },
      //   { value: 'workflow', name: 'workflow: 工作流程改进' },
      //   { value: 'types', name: 'types:    类型定义文件修改' }
      // ]
    }
  }
  