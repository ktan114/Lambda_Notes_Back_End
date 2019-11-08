require('dotenv').config();

const uri = {
  production: process.env.MLABURI,
  development: process.env.LOCALURI,
};
module.exports = {
  uri: uri.development,
  passport: process.env.PASSPORT,
};
