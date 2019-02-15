import {createElement, render} from 'rax';
import DomDriver from 'driver-dom';
import App from './App';

render(<App />, document.body, { driver: DomDriver });
