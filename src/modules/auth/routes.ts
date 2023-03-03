import { Router } from 'express';

import User, { IAuthLogin } from '../users/model';
import PasswordHasher from './../auth/service';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body as IAuthLogin;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isMatch = await PasswordHasher.comparePasswords(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = PasswordHasher.generateJWT(user._id);

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: (err as Error).message,
    });
  }
});

export default router;
