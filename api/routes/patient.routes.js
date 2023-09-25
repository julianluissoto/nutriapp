import { Router } from "express";
const router = Router();

import {
  //getPatientsByNutritionistId,
  deletepatient,
  createNewPatient,
  updatePatient,
  // getNutriPlanByUserId,
  getPatientById,
  getPatientsByNutritionistId,
} from "../controllers/patients.controller.js";

import {
  createNewNutritionist,
  getAllNutritionists,
  loginNutritionist,
  getNutritionistPatientByPatientId,
  nutriLogout,
} from "../controllers/nutritionist.controller.js";

import { getUserData } from "../controllers/patients-user.controller.js";
import { isAuthenticated } from "../middleware/nutriAuth.js";
router
  .get("/patients", getNutritionistPatientByPatientId)
  .get("/patients/:id", getPatientById)
  .get("/nutripatients/:id", getPatientsByNutritionistId)

  .get("/nutritionists", getAllNutritionists)
  //.get("/nutritionist/:id", isAuthenticated, getPatientsByNutritionistId)
  .get("/users", getUserData)
  .get("/logout", nutriLogout)
  .post("/patients", createNewPatient)
  .post("/nutritionists", createNewNutritionist)
  .post("/nutrilogin", loginNutritionist)
  .delete("/patient/:id", deletepatient)
  .put("/patient/:id", updatePatient);

export default router;
