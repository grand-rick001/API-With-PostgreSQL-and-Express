import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import book_store_routes from './handlers/books';
import usersRoutes from './handlers/users';
import cors from 'cors';
import morgan from 'morgan';

const app: express.Application = express();
const port = 3000;
const corsOptions = {
	origin: 'https://someotherdomain.com',
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan('common'));

book_store_routes(app);
usersRoutes(app);

app.get('/', function (req: Request, res: Response) {
	res.send('Hello World!');
});

app.listen(port, function () {
	console.log(`starting app on: http://localhost${port}`);
});
