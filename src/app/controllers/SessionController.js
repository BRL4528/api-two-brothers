import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import authConfig from '../../config/auth';
import User from '../schemas/User';

class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Password does not match' });
      }

      const { _id, name } = user;

      return res.json({
        user: {
          _id,
          name,
          email,
        },
        token: jwt.sign({ _id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (error) {
      return res.status(500).send(`Error authenticating${error}`);
    }
  }
}

export default new SessionController();
