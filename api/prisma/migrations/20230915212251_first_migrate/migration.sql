-- CreateTable
CREATE TABLE "Patient" (
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Nutritionist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Nutritionist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Nutritionist_email_key" ON "Nutritionist"("email");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Nutritionist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
