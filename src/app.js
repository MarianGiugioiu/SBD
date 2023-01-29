import express from 'express';
import chalk from 'chalk';

import { userRouter } from './routes/user.js';
import { storeRouter } from './routes/store.js';
import { productRouter } from './routes/product.js';
import { employeeRouter } from './routes/employee.js';
import { handleError } from './routes/middleware.js';



const app = express();

app.get('/health', (req, res) => {
    res.send({
        message: 'Up and running'
    })
});

app.use(express.json());

app.use('/users', userRouter);
app.use('/stores', storeRouter);
app.use('/products', productRouter);
app.use('/employees', employeeRouter);

app.use(handleError);

app.listen(4200, (err) => {
    err && console.error(err);
    console.log(chalk.magenta(`Server started on port`), chalk.yellow(4200));
});