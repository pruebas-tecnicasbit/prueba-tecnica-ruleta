import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import ruletaRouter from "./routes/ruleta.routes.js";
import apuestaRouter from "./routes/apuesta.routes.js";

const app = express();
dotenv.config();
app.use(express.json());
const PORT = process.env.MONGO_URI || 3000;

connectDB();

app.use(ruletaRouter);
app.use(apuestaRouter);

app.listen(3000, () => {
  console.log(`[SERVER] server running in port: http://localhost:${PORT}`);
});
