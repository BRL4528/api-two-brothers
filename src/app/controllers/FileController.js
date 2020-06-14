import File from '../schemas/File';

class FileController {
  async index(req, res) {
    try {
      const files = await File.find();

      return res.json(files);
    } catch (error) {
      return res.status(500).send('Error fetching files' + error);
    }
  }

  async store(req, res) {
    try {
      const { originalname: name, filename: path } = req.file;

      const file = await File.create({
        name,
        path,
        url: `${process.env.APP_URL}files/${path}`,
      });

      return res.json(file);
    } catch (error) {
      return res.status(500).send('Error adding file' + error);
    }
  }
}

export default new FileController();
