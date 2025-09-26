import { Router } from 'express';
import { mercadopagoController } from '../controllers/mercadopagoController';

const router = Router();

router.post('/checkout', mercadopagoController.criarPagamento);
router.post('/webhook', mercadopagoController.webhookMP);

export { router as mercadoPagoRouter };