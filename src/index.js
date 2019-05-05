import {createElement, render} from 'rax';
import driver from './driver/index';
import App from './App';

render(<App />, document.body, { driver: driver });

