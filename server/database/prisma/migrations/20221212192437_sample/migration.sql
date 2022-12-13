/*
  Warnings:

  - Added the required column `authorName` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "authorName" VARCHAR(255) NOT NULL;
