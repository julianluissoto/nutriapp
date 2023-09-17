/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `PatientUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PatientUser_email_key" ON "PatientUser"("email");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_email_fkey" FOREIGN KEY ("email") REFERENCES "PatientUser"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
