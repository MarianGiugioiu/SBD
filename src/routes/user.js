import { Router } from "express";
import { User } from "../models/shared/user.js";
import { Sequelize } from "sequelize";

const router = Router();

router.get('/', async (req, res) => {
    User.findAll({
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

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({
        where: {
            username
        }
    }).then(async user => {
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        
        if (!(await User.validPassword(password, user.dataValues.password))) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = user.generateJWT();
        return res.status(200).json({ token });
    });
});

router.post('/register', async (req, res, next) => { 
    const { username, password, name } = req.body;
    User.create({
        username,
        password,
        role: 'user',
        name
    })
    .then((item) => res.status(201).json(item))
    .catch (next);
});

router.post('/register/manager', async (req, res, next) => {
    const { username, password, name } = req.body;
    User.create({
        username,
        password,
        role: 'manager',
        name
    })
    .then((item) => res.status(201).json(item))
    .catch (next);
});

router.put('/:id', (req, res, next) => {
    User.update(req.body, {
      where: { user_id: req.params.id },
      returning: true
    })
    .then(([ affectedCount, affectedRows ]) => {
        if (affectedCount) res.json(affectedRows);
        else res.status(404).json({ error: 'Record not found' });
    })
    .catch (next);
});

router.delete('/:id', (req, res, next) => {
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