-- AlterTable
CREATE SEQUENCE patient_patientid_seq;
ALTER TABLE "Patient" ALTER COLUMN "patientId" SET DEFAULT nextval('patient_patientid_seq'),
ADD CONSTRAINT "Patient_pkey" PRIMARY KEY ("patientId");
ALTER SEQUENCE patient_patientid_seq OWNED BY "Patient"."patientId";
