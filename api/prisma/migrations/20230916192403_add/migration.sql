-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_email_fkey";

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "patientUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_patientUserId_fkey" FOREIGN KEY ("patientUserId") REFERENCES "PatientUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
