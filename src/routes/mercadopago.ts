import { Router } from 'express';
import { mercadopagoController } from '../controllers/mercadopagoController';

const router = Router();

router.post('/checkoutessencial', mercadopagoController.criarPagamentoEssencial);
router.post('/checkoutmestra', mercadopagoController.criarPagamentoMestra);
router.post('/webhook', mercadopagoController.webhookMP);

export { router as mercadoPagoRouter };