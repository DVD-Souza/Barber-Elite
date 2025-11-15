require("dotenv").config();
const connectDB = require("../config/db");

const Service = require("../models/service");
const Professional = require("../models/professional");

(async () => {
  await connectDB(process.env.MONGO_URI);

  await Service.deleteMany();
  await Professional.deleteMany();

  await Service.insertMany([
    { name: "Corte Masculino", duration: 30, price: 40, description: "Corte clássico" },
    { name: "Barba", duration: 20, price: 25, description: "Barba completa" }
  ]);

  await Professional.insertMany([
    { name: "Carlos" },
    { name: "João" }
  ]);

  console.log("Seed finalizada!");
  process.exit();
})();
