import { Router } from "express";
import { User } from "../models/user.js";

const router = Router();

router.post('/', async (req, res) => {
    const { username, password, role, name } = req.body;
    res.send(await User.create({
        username,
        password,
        role,
        name
    }));
});

export { router as userRouter };