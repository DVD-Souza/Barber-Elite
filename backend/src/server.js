require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

connectDB(process.env.MONGO_URI);

// Servir arquivos estáticos do frontendconst path = require("path");
app.use(express.static(path.join(__dirname, "../public")));


app.use("/api/auth", require("./routes/auth"));
app.use("/api/services", require("./routes/services"));
app.use("/api/professionals", require("./routes/professionals"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/favorites", require("./routes/favorites"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server rodando na porta " + PORT);
});
