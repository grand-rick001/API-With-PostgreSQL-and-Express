import OrderStore, { Order } from '../models/order';
import express, { Request, Response } from 'express';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
	try {
		const allOrders = await store.index();
		res.json(allOrders);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const create = async (req: Request, res: Response) => {
	const order1: Order = {
		status: req.body.status,
		user_id: req.body.userId,
	};
	try {
		const newOrder = await store.create(order1);
		res.json(newOrder);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const show = async (req: Request, res: Response) => {
	try {
		const order = await store.show(req.params.id);
		res.json(order);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const destroy = async (req: Request, res: Response) => {
	try {
		const deleted = await store.delete(req.params.id);
		res.json(deleted);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const addProduct = async (req: Request, res: Response) => {
	const quantity = req.body.quantity;
	const orderId = req.body.orderId;
	const productId = req.body.productId;
	try {
		const newProduct = await store.addProduct(quantity, orderId, productId);
		if (newProduct === null) {
			res.json('Order is closed.');
			return;
		}
		res.json(newProduct);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const ordersRoutes = (app: express.Application) => {
	app.get('/orders', index);
	app.get('/orders/:id', show);
	app.post('/orders', create);
	app.delete('/orders/:id', destroy);
	app.post('/orders/:id/products', addProduct);
};

export default ordersRoutes;
