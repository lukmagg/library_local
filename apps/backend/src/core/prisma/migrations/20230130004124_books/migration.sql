/*
  Warnings:

  - You are about to drop the column `image` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `inStock` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `lend` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `private` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Book` table. All the data in the column will be lost.
  - Added the required column `area` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edition` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventory` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pages` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Area" AS ENUM ('MATHEMATICS', 'LITERATURE', 'GEOGRAPHY', 'HISTORY');

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "image",
DROP COLUMN "inStock",
DROP COLUMN "lend",
DROP COLUMN "private",
DROP COLUMN "updatedAt",
ADD COLUMN     "area" "Area" NOT NULL,
ADD COLUMN     "edition" TEXT NOT NULL,
ADD COLUMN     "inventory" INTEGER NOT NULL,
ADD COLUMN     "pages" INTEGER NOT NULL;
