import bcrypt from 'bcryptjs';
import User from '../schemas/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.find();

      return res.json(users);
    } catch(error) {
     return res.status(500).send("Error fetching user!" + error);
    }
  }

  async store(req, res) {
   try {
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
   } catch(error) {
    return res.status(500).send("Error inserting new user: " + error);
   }
  }

  async update(req, res) {
    try {
      const { about } = req.body;

    const userExists = await User.findOne({ _id: req.userId });

    if (!userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    await userExists.updateOne({
      about,
    });

    return res.json(userExists);
    } catch(error) {
      return res.status(500).send("Error editing user!" + error);
    }
  }
}

export default new UserController();
