/*
  Warnings:

  - Added the required column `priceB2b` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeUser` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "prestation" JSONB,
ADD COLUMN     "priceB2b" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "typeUser" TEXT NOT NULL;
