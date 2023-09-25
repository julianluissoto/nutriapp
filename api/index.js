import express from "express";
import morgan from "morgan";
import cors from "cors";
import patientsRouter from "./routes/patient.routes.js";
import userRoute from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(patientsRouter);
app.use(userRoute);

app.listen(PORT, () => console.log(" listen on port:", PORT));
