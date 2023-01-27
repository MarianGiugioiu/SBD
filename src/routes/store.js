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
        console.log(records);
        res.json(records)
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/manager', checkRole(['manager']), async (req, res) => {
    StoreManager.findAll({
        raw:true
    })
    .then(records => {
        console.log(records);
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
        console.log(record);
        res.json(record)
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/', checkRole(['user', 'manager']), async (req, res) => {
    const { location, name, businessHours } = req.body;
    res.send(await StoreUser.create({
        location,
        name,
        businessHours
    }));
});

router.post('/manager', checkRole(['manager']), async (req, res) => {
    const { location, name, businessHours, averageMonthlyIncome } = req.body;
    res.send(await StoreManager.create({
        location,
        name,
        businessHours,
        averageMonthlyIncome
    }));
});

export { router as storeRouter };