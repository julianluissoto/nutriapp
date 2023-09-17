/*
  Warnings:

  - Added the required column `location` to the `Nutritionist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodPlan` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objective` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipes` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tips` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nutritionist" ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "dni" INTEGER NOT NULL,
ADD COLUMN     "first_consult" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "foodPlan" JSONB NOT NULL,
ADD COLUMN     "height" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "objective" TEXT NOT NULL,
ADD COLUMN     "recipes" JSONB NOT NULL,
ADD COLUMN     "tips" TEXT NOT NULL,
ADD COLUMN     "weight" TEXT NOT NULL;
