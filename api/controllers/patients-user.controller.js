import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

const userSignUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario con el mismo correo electrónico ya existe
    const existingUser = await prisma.patientUser.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "El correo electrónico ya está en uso" });
    }

    const { name, lastname } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // Create a new nutritionist using Prisma
    await prisma.patientUser.create({
      data: {
        name,
        lastname,
        email,
        password: hashPassword,
      },
    });

    res.json({
      message: `Nueva usuario ${name} ${lastname} creado`,
    });
  } catch (error) {
    console.error("Error al crear usuario", error);

    res.status(500).json({ error: "Error al crear usuario" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("login, :", email, password);
  try {
    // Find the user by email in the database
    const user = await prisma.patientUser.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // If the email and password are correct, retrieve the patient information
    const patient = await prisma.patient.findUnique({
      where: { email },
    });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Return the patient information or any other data you need
    res.json({ patient });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login" });
  }
};
const getUserData = (req, res) => {
  try {
  } catch (error) {}
};

export { userLogin, getUserData, userSignUp };
