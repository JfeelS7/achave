import express from 'express';
import path from 'path';
import { mercadoPagoRouter } from './routes/mercadopago';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1', mercadoPagoRouter);

export default app;