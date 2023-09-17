import { Router } from "express";
const router = Router();

import {
  getPatientsByNutritionistId,
  deletepatient,
  createNewPatient,
  updatePatient,
} from "../controllers/patients.controller.js";

import {
  createNewNutritionist,
  getAllNutritionists,
  loginNutritionist,
  getNutritionistPatientByPatientId,
} from "../controllers/nutritionist.controller.js";

import { getUserData } from "../controllers/patients-user.controller.js";
router.get("/patient", getNutritionistPatientByPatientId);
router.get("/patient/:id", getPatientsByNutritionistId);
router.get("/nutritionists", getAllNutritionists);
router.get("/nutritionist/:id", getPatientsByNutritionistId);
router.get("/user/", getUserData);

router.post("/patients", createNewPatient);
router.post("/nutritionist", createNewNutritionist);
router.post("/nutrilogin", loginNutritionist);

router.delete("/patient/:id", deletepatient);

router.put("/patient/:id", updatePatient);

export default router;
