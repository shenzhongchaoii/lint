const { copySync } = require('fs-extra')

copySync('src/tpl/', 'dist/tpl', { recursive: true })
