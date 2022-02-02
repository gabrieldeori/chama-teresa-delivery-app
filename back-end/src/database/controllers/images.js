const path = require('path');

async function getImageByFile(req, res, _nex) {
  const { file } = req.params;
  const image = path.join(__dirname, `../../../public/${file}`);
  return res.status(200).sendFile(image);
}

module.exports = {
  getImageByFile,
};
