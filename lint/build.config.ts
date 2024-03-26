import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  externals: ['commander'],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true
  }
})
