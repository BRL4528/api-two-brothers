import DashClient from '../schemas/DashClient';
import File from '../schemas/File';

class DashClientController {
  async index(req, res) {
    try {
      const contacts = await DashClient.find();

      return res.json(contacts);
    } catch (error) {
      return res.status(500).send('Error fetching banners' + error);
    }
  }

  async store(req, res) {
    try {
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
    } catch (error) {
      return res.status(500).send('Error adding banners' + error);
    }
  }
}

export default new DashClientController();
