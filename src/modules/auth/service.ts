import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export default class PasswordHasher {
  static async hashPassword(password: string) {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (err) {
      throw new Error('Error hashing password');
    }
  }

  static async comparePasswords(password: string, hashedPassword: string) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (err) {
      throw new Error('Error comparing passwords');
    }
  }

  static generateJWT(id: string) {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: '5m',
    });
  }
}
