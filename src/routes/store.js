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

router.get('/:id', checkRole(['user', 'manager']), async (req, res) => {
    StoreUser.findAll({
        where: { store_id: req.params.id },
        raw:true
    })
    .then(record => {
        res.json(record)
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/manager/:id', checkRole(['manager']), async (req, res) => {
    StoreManager.findAll({
        where: { store_id: req.params.id },
        raw:true
    })
    .then(record => {
        res.json(record)
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/user', checkRole(['user', 'manager']), async (req, res, next) => {
    const { location, name, businessHours } = req.body;
    StoreUser.create({
        location,
        name,
        businessHours
    })
    .then((item) => res.status(201).json(item))
    .catch (next);
});

router.post('/', checkRole(['manager']), async (req, res, next) => {
    const { location, name, businessHours, averageMonthlyIncome } = req.body;
    StoreManager.create({
        location,
        name,
        businessHours,
        averageMonthlyIncome
    })
    .then((item) =>{res.status(201).json(item)})
    .catch (next);
});

router.put('/:id', checkRole(['manager']), (req, res, next) => {
    StoreManager.update(req.body, {
      where: { store_id: req.params.id },
      returning: true
    })
    .then(([ affectedCount, affectedRows ]) => {
        if (affectedCount) res.json(affectedRows);
        else res.status(404).json({ error: 'Record not found' });
    })
    .catch (next);
});

router.delete('/:id', checkRole(['manager']), (req, res, next) => {
    StoreManager.destroy({
      where: { store_id: req.params.id },
    })
    .then(affectedCount => {
        if (affectedCount) res.json({ message: 'Record deleted' });
        else res.status(404).json({ error: 'Record not found' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

export { router as storeRouter };