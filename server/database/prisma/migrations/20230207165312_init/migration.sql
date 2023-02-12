-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
