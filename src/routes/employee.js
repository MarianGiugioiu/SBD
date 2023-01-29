import { Router } from "express";
import { StoreUser } from "../models/user/store.js";
import { StoreManager } from "../models/manager/store.js";
import { Employee } from "../models/shared/employees.js";
import { checkRole } from "./middleware.js";

const router = Router();

router.get('/', checkRole(['user', 'manager']), async (req, res) => {
    Employee.findAll({
        raw:true
    })
    .then(records => {
        res.json(records)
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/:id',checkRole(['user', 'manager']), async (req, res) => {
    Employee.findAll({
        where: { store_id: req.params.id },
        raw:true
    })
    .then(record => {
        res.json(record)
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

export { router as employeeRouter };