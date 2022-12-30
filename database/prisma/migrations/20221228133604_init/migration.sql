-- AlterTable
ALTER TABLE `post` MODIFY `description` VARCHAR(2000) NOT NULL;

-- AlterTable
ALTER TABLE `refreshtoken` MODIFY `token` VARCHAR(512) NOT NULL;
