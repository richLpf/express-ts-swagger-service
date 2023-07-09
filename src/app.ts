import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import DB from './databases';
import { PORT } from './config';
import { Routes } from './interfaces/routes.interface';
 
const corsOptions = {
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

class App {
	app: express.Application;
	port = 3000;
	constructor(routers: Routes[]) {
		this.port = Number(PORT) || this.port;
		this.app = express();
		this.connectToDatabase();
		this.initializeMiddlewares();
		this.initializeRoutes(routers);
		this.initializeSwagger();
	}

	private connectToDatabase() {
		DB.sequelize.sync({ force: false });
	}

	private initializeMiddlewares() {
		// this.app.use(morgan(LOG_FORMAT, { stream }));
		this.app.use(cors(corsOptions));
		// this.app.use(hpp());
		// this.app.use(helmet());
		// this.app.use(compression());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		// this.app.use(cookieParser());
		// this.app.all('*', function(req, res, next) {
		//   res.setHeader("Content-Type", "application/json;charset=utf-8");
		//   next();
		// });
	}

	private initializeRoutes(routes: Routes[]) {
		routes.forEach(route => {
			this.app.use('/v1/', route.router);
		});
	}

	private initializeSwagger() {
		const options = {
			swaggerDefinition: {
				info: {
					title: '接口文档',
					version: '1.0.0',
					description:
						'swagger使用文档：https://swagger.io/docs/specification/basic-structure/',
				},
				servers: [
					{
						url: 'http://localhost:3000/',
						description: 'Development server',
					},
					{
						url: 'http://localhost:4000/',
						description: 'Development server',
					},
				],
			},
			apis: ['swagger*.yaml'],
		};

		const specs = swaggerJSDoc(options);
		this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
	}
	public listen() {
		this.app.listen(this.port, () => {
			console.log(`TypeScript with Express
              http://localhost:${this.port}/`);
		});
	}
}

export default App;
