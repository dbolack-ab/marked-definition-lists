export default [
  {
    input: 'src/index.js',
    output: {
      name: 'definition-lists',
      file: 'lib/index.umd.js',
      format: 'umd'
    }
  },
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.cjs',
      format: 'cjs'
    }
  }
];
