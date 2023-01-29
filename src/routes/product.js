import { Router } from "express";
import { StoreUser } from "../models/user/store.js";
import { StoreManager } from "../models/manager/store.js";
import { checkRole, handleError } from "./middleware.js";
import { ProductManager } from "../models/manager/product.js";
import { SequelizeService } from "../config/db.js";
import { Stock } from "../models/shared/stock.js";
import { ProductUser } from "../models/user/product.js";

const sequelize = SequelizeService.getManagerInstance();

const router = Router();

router.get('/', checkRole(['user', 'manager']), async (req, res) => {
    ProductUser.findAll({
        raw:true
    })
    .then(records => {
        res.json(records)
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/:productId/:storeId', checkRole(['user', 'manager']), async (req, res, next) => {
    try {
        let products = await ProductUser.findAll({
            where: { product_id: req.params.productId },
            raw:true
        });
        let stores = await StoreUser.findAll({
            where: { store_id: req.params.storeId},
            raw:true
        });
        if (products.length && stores.length) {
            let product = products[0];
            let store = stores[0];
            let stocks = await Stock.findAll({
                where: {
                    product_id: product.productId,
                    store_id: store.storeId
                },
                raw:true
            });
            if (stocks.length) {
                let stock = stocks[0];
                product.quantity = stock.quantity;
                product.unitPrice = stock.unitPrice;
                product.store = store.name;
            }
            res.status(201).json([product]);
        }
    } catch (error) {
        handleError(error, req, res, next);
    }

});

router.post('/manager', checkRole(['manager']), async (req, res, next) => {
    const { name, weight, producer, storeId, quantity, unitPrice } = req.body;
    const result = await StoreUser.findAll({
        where: { store_id: storeId },
        raw:true
    });
    if (result.length) {
        try {
            let product;
            const result = await sequelize.transaction(async (t) => {
                product = await ProductManager.create({
                    name,
                    weight,
                    producer
                }, { transaction: t });

                const productId = product.dataValues.productId;
                console.log(productId);

                let stock = await Stock.create({
                    storeId,
                    productId,
                    quantity,
                    unitPrice
                }, { transaction: t });

                console.log(stock.dataValues.productId);
            });
            res.status(201).json(product);
        } catch (error) {
            handleError(error, req, res, next);
        }
    }
});



export { router as productRouter };