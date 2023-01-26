import { Router } from "express";
import { User } from "../models/user.js";

const router = Router();

router.get('/', async (req, res) => {
    User.findAll({
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

router.post('/', async (req, res) => {
    const { username, password, role, name } = req.body;
    console.log(req.body);
    res.send(await User.create({
        username,
        password,
        role,
        name
    }));
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
      where: { user_id: req.params.id },
      returning: true
    })
    .then(([ affectedCount, affectedRows ]) => {
        if (affectedCount) res.json(affectedRows);
        else res.status(404).json({ error: 'Record not found' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.delete('/:id', (req, res) => {
    User.destroy({
      where: { user_id: req.params.id }
    })
    .then(affectedCount => {
        if (affectedCount) res.json({ message: 'Record deleted' });
        else res.status(404).json({ error: 'Record not found' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
  });

export { router as userRouter };