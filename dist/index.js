"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const prisma_1 = require("./lib/prisma");
const port = process.env.PORT || 3000;
async function main() {
    try {
        await prisma_1.prisma.$connect();
        console.log('Prisma conectado ao banco de dados!');
        server_1.default.listen(port, () => console.log(`Server on http://localhost:${port}`));
    }
    catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        process.exit(1);
    }
}
main();
