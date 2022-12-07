//Config Inicial

const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config()


// Forma de ler JSON/ Middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
//Rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

//Rota inicial / endpoint
app.get("/", (req, res) => {
  //Mostrar req

  res.json({ message: "Oi express!" });
});

//Entregar uma porta para o express
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.ovurkl8.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectamos ao mongoDB");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
