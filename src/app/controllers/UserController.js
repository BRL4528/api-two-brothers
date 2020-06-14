import bcrypt from 'bcryptjs';
import User from '../schemas/User';

class UserController {
  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  }

  async store(req, res) {
    const { name, email, password, about } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const userCreated = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
      about,
    });

    return res.json(userCreated);
  }

  async update(req, res) {
    const { about } = req.body;

    const userExists = await User.findOne({ _id: req.userId });

    if (!userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    await userExists.updateOne({
      about,
    });

    return res.json(userExists);
  }
}

export default new UserController();
