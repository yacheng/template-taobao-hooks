import {createElement, render} from 'rax';
import * as DomDriver from './driver/driver-dom';
// import DomDriver from 'driver-browser';
import * as WeexDriver from 'driver-weex';
import App from './App';

export const isWeex = typeof callNative === 'function' || typeof WXEnvironment === 'object' && WXEnvironment.platform !== 'Web';
if (isWeex) {
	render(<App />, document.body, { driver: WeexDriver });
} else {
	render(<App />, document.body, { driver: DomDriver });
}

