/*
  Warnings:

  - Added the required column `bio` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "bio" VARCHAR(1024) NOT NULL;
