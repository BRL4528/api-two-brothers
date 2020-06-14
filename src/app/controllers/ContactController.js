import Contact from '../schemas/Contact';
import User from '../schemas/User';

class ContactController {
  async index(req, res) {
    try {
      const isUser = await User.findOne({ _id: req.userId });

      if (!isUser) {
        return res.status(400).json({ error: 'User not exists' });
      }

      const contacts = await Contact.find();

      return res.json(contacts);
    } catch (error) {
      return res.status(500).send('Error fetching contacts' + error);
    }
  }

  async store(req, res) {
    try {
      const { name, email, cel, tel, message } = req.body;

      const contact = await Contact.create({
        name,
        email,
        cel,
        tel,
        message,
      });

      return res.json(contact);
    } catch (error) {
      return res.status(500).send('Error adding contact' + error);
    }
  }

  async update(req, res) {
    try {
      const { _id } = req.params;

      const isUser = await User.findOne({ _id: req.userId });

      if (!isUser) {
        return res.status(400).json({ error: 'User not exists' });
      }

      const contact = await Contact.findByIdAndUpdate(_id, {
        read: true,
      });
      return res.json(contact);
    } catch (error) {
      return res.status(500).send('Error editing read contact' + error);
    }
  }
}

export default new ContactController();
