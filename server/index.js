import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToMongoDB from "./db/connectToMongoDB.js";
import routes from "./routers/routes.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: [process.env.LOCAL_CLIENT_URL, process.env.LOCAL_CLIENT_URL_2],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port: ${PORT}`);
});
