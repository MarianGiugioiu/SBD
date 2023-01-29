import { Router } from "express";
import { StoreUser } from "../models/user/store.js";
import { StoreManager } from "../models/manager/store.js";
import { checkRole } from "./middleware.js";

const router = Router();

router.get('/', checkRole(['user', 'manager']), async (req, res) => {
    StoreUser.findAll({
        raw:true
    })
    .then(records => {
        res.json(records)
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/manager', checkRole(['manager']), async (req, res) => {
    StoreManager.findAll({
        raw:true
    })
    .then(records => {
        res.json(records)
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/:id', async (req, res) => {
    User.findAll({
        where: { user_id: req.params.id },
        raw:true
    })
    .then(record => {
        res.json(record)
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/', checkRole(['user', 'manager']), async (req, res, next) => {
    const { location, name, businessHours } = req.body;
    StoreUser.create({
        location,
        name,
        businessHours
    })
    .then((item) => res.status(201).json(item))
    .catch (next);
});

router.post('/manager', checkRole(['manager']), async (req, res, next) => {
    const { location, name, businessHours, averageMonthlyIncome } = req.body;
    StoreManager.create({
        location,
        name,
        businessHours,
        averageMonthlyIncome
    })
    .then((item) => res.status(201).json(item))
    .catch (next);
});

export { router as storeRouter };