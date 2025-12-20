/*
  Warnings:

  - Added the required column `updatedAt` to the `Rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RentalStatus" AS ENUM ('RENTED', 'RETURNED', 'LATE_RETURN', 'EXTENDED');

-- AlterTable
ALTER TABLE "Rental" ADD COLUMN     "extended" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "extendedDays" INTEGER,
ADD COLUMN     "status" "RentalStatus" NOT NULL DEFAULT 'RENTED',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "rentedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Rental_status_idx" ON "Rental"("status");
