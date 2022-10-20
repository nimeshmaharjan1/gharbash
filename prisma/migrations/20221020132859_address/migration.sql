/*
  Warnings:

  - Added the required column `address` to the `Home` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Home` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Home` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Home" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
