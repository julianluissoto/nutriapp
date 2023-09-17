import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createNewPatient = async (req, res) => {
  try {
    const {
      nutritionist_Id,
      name,
      lastname,
      email,
      age,
      weight,
      height,
      foodPlan,
      objective,

      tips,
      dni,
      recipes,
      location,
    } = req.body;
    console.log(req.body);
    const dniInteger = parseInt(dni);
    const ageToInteger = parseInt(age);

    const existingPatient = await prisma.patient.findUnique({
      where: {
        dni: dniInteger,
      },
    });

    if (existingPatient) {
      return res.status(409).json({
        error: `el paciente ya existe con el dni ${dni}.`,
      });
    }

    await prisma.patient.create({
      data: {
        nutritionist: {
          connect: { id: nutritionist_Id },
        },
        name,
        lastname,
        email,
        age: ageToInteger,
        weight,
        height,
        foodPlan,
        objective,

        tips,
        dni: dniInteger,
        recipes,
        location,
      },
    });

    res.json({
      message: `Nuevo paciente ${name} ${lastname} agregado`,
    });
  } catch (error) {
    console.error("Error al agregar la nueva paciente:", error);
  }
};

const getPatientsByNutritionistId = async (req, res) => {
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
    console.error("Error al recuperar los pacientes del nutricionista:", error);
    res.status(500).json({
      error: "Ocurrió un error al recuperar los pacientes del nutricionista",
    });
  }
};

const deletepatient = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the patient with the given ID exists
    const checkQuery = "SELECT * FROM nutriweb.patients WHERE patient_id = $1";
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Delete the patient using DELETE query
    const deleteQuery = "DELETE FROM nutriweb.patients WHERE patient_id = $1";
    await pool.query(deleteQuery, [id]);

    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the patient" });
  }
};

const updatePatient = async (req, res) => {
  const { id } = req.params; // Extract patient_id from request params
  const updatedData = req.body; // Updated data from request body

  try {
    // Check if the patient with the given ID exists
    const existingPatient = await prisma.patient.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Update the patient using Prisma
    const updatedPatient = await prisma.patient.update({
      where: {
        id: parseInt(id),
      },
      data: updatedData,
    });

    res.json({
      message: "Patient updated successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    console.error("Error updating patient:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the patient" });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
};

export {
  createNewPatient,
  getPatientsByNutritionistId,
  deletepatient,
  updatePatient,
};
