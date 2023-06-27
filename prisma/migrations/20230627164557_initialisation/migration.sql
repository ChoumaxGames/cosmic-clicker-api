-- CreateTable
CREATE TABLE `User` (
    `uid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
