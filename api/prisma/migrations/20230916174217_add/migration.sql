/*
  Warnings:

  - You are about to drop the column `password` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "password";

-- CreateTable
CREATE TABLE "PatientUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "PatientUser_pkey" PRIMARY KEY ("id")
);
