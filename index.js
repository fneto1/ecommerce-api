require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const port = process.env.PORT;

//db connection
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@cluster0.dbvkode.mongodb.net/shop?retryWrites=true&w=majority`
  )
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => console.log(error));

//config JSON and form data response
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//endpoints

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log("Backend server is running!");
});
