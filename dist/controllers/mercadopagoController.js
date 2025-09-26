"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mercadopagoController = void 0;
const mercadopago_1 = require("mercadopago");
const prisma_1 = require("../lib/prisma");
const uuid_1 = require("uuid");
//import { enviarEmail } from '../services/emailService';
const configMercadoPago = new mercadopago_1.MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });
const preferencia = new mercadopago_1.Preference(configMercadoPago);
const payment = new mercadopago_1.Payment(configMercadoPago);
exports.mercadopagoController = {
    async criarPagamento(req, res) {
        try {
            const { nome, email, telefone } = req.body;
            const codigo = (0, uuid_1.v4)().split('-')[0];
            const cliente = await prisma_1.prisma.cliente.create({
                data: { nome, email, telefone, codigo }
            });
            const body = {
                items: [
                    {
                        id: '1',
                        title: 'Acesso simples',
                        quantity: 1,
                        unit_price: 2,
                        currency_id: 'BRL',
                        category_id: 'learnings',
                        description: 'Imersão exclusiva no mercado imobiliário: garanta sua vaga para o evento presencial "A Chave". Aprenda sobre posicionamento de marca, precificação, processos e mentalidade empresarial com especialistas do setor. Transforme sua presença em ativo milionário!'
                    }
                ],
                payer: {
                    name: nome,
                    email: email,
                    phone: {
                        number: telefone
                    }
                },
                back_urls: {
                    success: 'https://achaveimersao.com.br/success.html',
                    failure: 'https://achaveimersao.com.br/failure.html',
                    pending: 'https://achaveimersao.com.br/pending.html'
                },
                auto_return: 'approved',
                external_reference: cliente.id
            };
            const response = await preferencia.create({ body });
            console.log(response);
            return res.status(200).json({ init_point: response.init_point });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao criar pagamento' });
        }
    },
    async webhookMP(req, res) {
        const { status, id, external_reference } = req.body;
        if (status === 'approved') {
            const paymentId = id;
            try {
                const response = await payment.get({ id: paymentId });
                const cliente = await prisma_1.prisma.cliente.update({
                    where: {
                        id: external_reference
                    },
                    data: {
                        pago: true
                    }
                });
                return console.log(response, cliente);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ erro: 'Erro ao receber webhook' });
            }
        }
    }
};
