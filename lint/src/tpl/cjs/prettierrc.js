module.exports = {
  bracketSpacing: true, // 对象大括号内两边是否加空格 { a:0 }
  arrowParens: 'avoid', // 单个参数的箭头函数不加括号 x => x
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'none',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json'
      }
    }
  ]
}
