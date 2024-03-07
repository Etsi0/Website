import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
	if (req.method === 'POST') {
		return await CreateCP2077(req, res);
	} else if (req.method === 'GET') {
		return await GetCP2077(req, res);
	} else {
		return res.status(405).json({ message: 'Method not allowed', success: false });
	}
}

async function GetCP2077(req, res) {
	const body = req.body;
	try {
		const newEntry = await prisma.cP2077.findMany();
		return res.status(200).json(newEntry, { success: true });
	} catch (error) {
		console.error('Fetch error', error);
		res.status(500).json({ error: 'Error fetch mod listing', success: false });
	}
}

async function GetCP2077Dependencies(req, res) {
	const body = req.body;
	try {
		const newEntry = await prisma.cP2077.create({
			data: {
				name: body.name,
				description: body.description,
				category: body.category,
			},
		});
		return res.status(200).json(newEntry, { success: true });
	} catch (error) {
		console.error('Request error', error);
		res.status(500).json({ error: 'Error creating mod listing', success: false });
	}
}

async function CreateCP2077(req, res) {
	const body = req.body;
	try {
		const newEntry = await prisma.cP2077.create({
			data: {
				name: body.name,
				description: body.description,
				category: body.category,
			},
		});
		return res.status(200).json(newEntry, { success: true });
	} catch (error) {
		console.error('Request error', error);
		res.status(500).json({ error: 'Error creating mod listing', success: false });
	}
}

async function CreateCP2077Dependencies(req, res) {
	const body = req.body;
	try {
		const newEntry = await prisma.cP2077.create({
			data: {
				name: body.name,
				description: body.description,
				category: body.category,
			},
		});
		return res.status(200).json(newEntry, { success: true });
	} catch (error) {
		console.error('Request error', error);
		res.status(500).json({ error: 'Error creating mod listing', success: false });
	}
}
