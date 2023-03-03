import { Router } from 'express';

import PasswordHasher from '../auth/service';
import User, { IUser } from './model';

const router = Router();

router.get('/', async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  res.status(200).json(user);
});

router.post('/', async (req, res) => {
  const { email } = req.body as IUser;
  const findUser = await User.findOne({ email });

  if (findUser) {
    return res.status(400).json({ message: 'This email already exist' });
  }

  const hashedPassword = await PasswordHasher.hashPassword(req.body.password);
  const newUser = await User.create({ ...req.body, password: hashedPassword });
  res.status(201).json(newUser);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.deleteOne({ _id: id });
  res.json(deletedUser);
});

export default router;
