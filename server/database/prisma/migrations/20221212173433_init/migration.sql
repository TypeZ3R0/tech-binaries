/*
  Warnings:

  - You are about to drop the column `userId` on the `Author` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Author" DROP CONSTRAINT "Author_userId_fkey";

-- DropIndex
DROP INDEX "Author_userId_key";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Author_userEmail_key" ON "Author"("userEmail");

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
