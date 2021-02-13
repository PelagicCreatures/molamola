import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import {
	terser
}
	from 'rollup-plugin-terser'

export default {
	input: './index.js',
	external: ['@pelagiccreatures/sargasso'],

	output: [{
		format: 'iife',
		name: 'MolaMolaModule',
		file: './dist/molamola.iife.js',
		globals: {
			'@pelagiccreatures/sargasso': 'SargassoModule'
		},
		sourcemap: true
	}, {
		format: 'iife',
		name: 'MolaMolaModule',
		file: './dist/molamola.iife.min.js',
		globals: {
			'@pelagiccreatures/sargasso': 'SargassoModule'
		},
		plugins: [terser({
			output: {
				comments: false
			}
		})],
		sourcemap: true
	}],

	plugins: [
		json(),
		nodeResolve(),
		commonjs()
	]
}
