import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/patient.routes.js";
import userRoute from "./routes/user.routes.js";

const PORT = 3000;
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(router);
app.use(userRoute);

app.listen(PORT, () => console.log("listen on port:", PORT));
