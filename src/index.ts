import App from './app';
import userRouter from './routes/user.route';
import questionRouter from './routes/question.route';

const app = new App([
    new userRouter(),
    new questionRouter()
]);

app.listen();