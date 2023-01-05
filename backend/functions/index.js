import { https } from "firebase-functions";
import express from "express";
import routes from "./routes.js";
const app = express();
app.use(routes);

export const NFTapis = https.onRequest(app);
