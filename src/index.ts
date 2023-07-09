import App from './app';
import Router from './routes/index.route';

const app = new App([new Router()]);
app.listen();
