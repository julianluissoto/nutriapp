/*
  Warnings:

  - The primary key for the `Patient` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_pkey",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Patient_id_seq";
