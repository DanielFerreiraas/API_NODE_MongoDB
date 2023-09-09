const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://dan:027539761@cluster0.7ebcgfv.mongodb.net/apimongo?retryWrites=true&w=majority")
  .then(() => {
    console.log("Conectado ao banco com sucesso!!");
  })
  .catch((error) => {
    console.log("Falha ao conectar no banco");
    console.error(error);
  });

mongoose.Promise = global.Promise;
module.exports = mongoose;