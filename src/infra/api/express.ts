import express from 'express';

import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../customers/typeorm/customer.model";
import { customerRoute } from './routes/custormer.routes';

let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false
  });

  sequelize.addModels([CustomerModel]);
  await sequelize.sync();
}

setupDb();
const app = express();

app.use(express.json());

app.use('/customers', customerRoute);

export { app, sequelize };