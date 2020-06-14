import DashClient from '../schemas/DashClient';
import File from '../schemas/File';

class ContactController {
  async index(req, res) {
    const contacts = await DashClient.find();

    return res.json(contacts);
  }

  async store(req, res) {
    const { id, opacity, displayLogo } = req.body;

    const files = await File.find();
    const dashClient = await DashClient.find();

    const file = id.map((item) => files.find((archive) => archive.id === item));

    if (dashClient.length === 0) {
      const listBanner = await DashClient.create({
        file,
        opacity,
        displayLogo,
      });

      return res.json(listBanner);
    }
    const listBanner = await DashClient.updateOne({
      file,
      opacity,
      displayLogo,
    });

    return res.json(listBanner);
  }
}

export default new ContactController();
