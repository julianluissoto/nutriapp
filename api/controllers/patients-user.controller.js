import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

/* const userSignUp = async (req, res) => {
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
}; */

const userLogin = async (req, res) => {
  const { email, userID } = req.body;
  console.log("login, :", email, userID);
  try {
    // Find the user by email in the database
    const user = await prisma.patient.findUnique({
      where: { email, id: parseInt(userID) },
    });
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login" });
  }
};
const getUserData = async (req, res) => {
  const { id } = req.params;

  try {
    const patients = await prisma.patient.findMany({
      where: {
        nutritionist: {
          id: parseInt(id),
        },
      },
    });

    res.json({ patients });
  } catch (error) {
    console.error("Error al recuperar los datos del usuario", error);
    res.status(500).json({
      error: "Ocurrió un error al recuperar los datos del usuario",
    });
  }
};

export { userLogin, getUserData /* userSignUp */ };
