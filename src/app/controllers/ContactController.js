import Contact from '../schemas/Contact';
import User from '../schemas/User';

class ContactController {
  async index(req, res) {
    const isUser = await User.findOne({ _id: req.userId });

    if (!isUser) {
      return res.status(400).json({ error: 'User not exists' });
    }

    const contacts = await Contact.find();

    return res.json(contacts);
  }

  async store(req, res) {
    const { name, email, cel, tel, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      cel,
      tel,
      message,
    });

    return res.json(contact);
  }

  async update(req, res) {
    const { _id } = req.params;

    const isUser = await User.findOne({ _id: req.userId });

    if (!isUser) {
      return res.status(400).json({ error: 'User not exists' });
    }

    const contact = await Contact.findByIdAndUpdate(_id, {
      read: true,
    });
    return res.json(contact);
  }
}

export default new ContactController();
