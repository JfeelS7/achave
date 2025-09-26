
import app from './server';
import { prisma } from './lib/prisma';

const port = process.env.PORT || 3000;

async function main() {
	try {
		await prisma.$connect();
		console.log('Prisma conectado ao banco de dados!');
		app.listen(port, () => console.log(`Server on http://localhost:${port}`));
	} catch (error) {
		console.error('Erro ao conectar ao banco de dados:', error);
		process.exit(1);
	}
}

main();