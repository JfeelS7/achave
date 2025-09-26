"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mercadoPagoRouter = void 0;
const express_1 = require("express");
const mercadopagoController_1 = require("../controllers/mercadopagoController");
const router = (0, express_1.Router)();
exports.mercadoPagoRouter = router;
router.post('/checkout', mercadopagoController_1.mercadopagoController.criarPagamento);
router.post('/webhook', mercadopagoController_1.mercadopagoController.webhookMP);
