const mongoose = require("mongoose");
const envDataUrl = require("../config/enviroment.json")

mongoose.connect(envDataUrl.DATABASE_URL)
  .then(() => {
    console.log("Conectado ao banco com sucesso!!");
  })
  .catch((error) => {
    console.log("Falha ao conectar no banco");
    console.error(error);
  });

mongoose.Promise = global.Promise;
module.exports = mongoose;