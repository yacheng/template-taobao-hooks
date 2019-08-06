import { isWeex, isWeb } from 'universal-env';
import * as ddd from './driver-weex';

let driver;
if (isWeex) {
	driver = require('./driver-weex');
} else if (isWeb) {
	driver = require('./driver-dom');
}

export default driver;

