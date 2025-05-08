import todoStore from './store/todo.store.js';
import './style.css';
import { App } from './todos/app.js';


todoStore.initStore();
App('#app')