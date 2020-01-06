import resolve from '@rollup/plugin-node-resolve';
//import babel from 'rollup-plugin-babel';

export default {
  input: 'src/main.js',
  output: {
    dir: 'dist',
    format: 'iife'
  },
  plugins: [
		resolve(),
		//babel({
		//	exclude: 'node_modules/**'
		//})
	]
};
