import bcrypt from "bcryptjs";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const getAllNutritionists = async (req, res) => {
  const allNutritionists = await prisma.nutritionist.findMany();
  if (!!allNutritionists)
    return res.status(404).json({ message: "not nutritionists found" });
  console.log(allNutritionists);
};

const createNewNutritionist = async (req, res) => {
  try {
    const { email, name, lastname, password, location } = req.body;

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // Create a new nutritionist using Prisma
    const nutritionist = await prisma.nutritionist.create({
      data: {
        name,
        lastname,
        email,
        password: hashPassword,
        location,
      },
    });

    res.json({
      message: `Nueva nutricionista ${name} ${lastname} agregada`,
      nutritionistId: nutritionist.id,
    });
  } catch (error) {
    console.error("Error al agregar la nueva nutricionista:", error);

    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      // Handle unique constraint violation for email
      return res
        .status(409)
        .json({ error: "El correo electrónico ya está en uso" });
    }

    res.status(500).json({ error: "Error al agregar la nueva nutricionista" });
  }
};

const loginNutritionist = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the nutritionist by email in the database
    const nutritionist = await prisma.nutritionist.findUnique({
      where: { email },
      include: {
        patients: true, // Select all fields for patients
      },
    });

    if (!nutritionist) {
      return res.status(404).json({ error: "Nutritionist not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, nutritionist.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    req.session.nutritionistId = nutritionist.id;
    // If the email and password are correct, you can return the nutritionist data
    res.json({ nutritionist });
  } catch (error) {
    console.error("Error during nutritionist login:", error);
    res.status(500).json({ error: "Error during nutritionist login" });
  }
};
const nutriLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ error: "Error logging out" });
    } else {
      res.clearCookie("connect.sid"); // Clear the session cookie
      res.status(202).json({ message: "Logged out successfully" });
    }
  });
};

const getNutritionistPatientByPatientId = async (req, res) => {
  console.log("entre");

  const { nutritionistId, patientId } = req.query;
  console.log(nutritionistId, patientId);

  if (!nutritionistId || !patientId) {
    return res.status(400).json({
      error: "Both nutritionistId and patientId are required query parameters",
    });
  }

  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: parseInt(patientId),
        nutritionist: { id: parseInt(nutritionistId) },
      },
    });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json({ patient });
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ error: "Error fetching patient" });
  }
};

export {
  createNewNutritionist,
  getNutritionistPatientByPatientId,
  getAllNutritionists,
  loginNutritionist,
  nutriLogout,
};
