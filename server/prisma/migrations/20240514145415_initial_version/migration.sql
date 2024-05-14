/*
  Warnings:

  - Added the required column `conditions` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "conditions" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "suspended" BOOLEAN;
