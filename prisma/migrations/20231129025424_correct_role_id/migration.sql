-- CreateTable
CREATE TABLE `BackTalk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `talkId` INTEGER NOT NULL,
    `ownerId` INTEGER NOT NULL,
    `tags` VARCHAR(191) NOT NULL,
    `isNSFW` BOOLEAN NOT NULL,
    `is18Plus` BOOLEAN NOT NULL,

    INDEX `BackTalk_ownerId_idx`(`ownerId`),
    INDEX `BackTalk_talkId_idx`(`talkId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dislike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ownerId` INTEGER NOT NULL,
    `talkId` INTEGER NOT NULL,

    INDEX `Dislike_ownerId_idx`(`ownerId`),
    INDEX `Dislike_talkId_idx`(`talkId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ownerId` INTEGER NOT NULL,
    `talkId` INTEGER NOT NULL,

    INDEX `Like_ownerId_idx`(`ownerId`),
    INDEX `Like_talkId_idx`(`talkId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Talk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `video` VARCHAR(191) NULL,
    `ownerId` INTEGER NOT NULL,
    `tags` VARCHAR(191) NULL,
    `isNSFW` BOOLEAN NOT NULL DEFAULT false,
    `is18Plus` BOOLEAN NOT NULL DEFAULT false,

    INDEX `Talk_ownerId_idx`(`ownerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `profilePic` VARCHAR(191) NULL,
    `emailVerified` BOOLEAN NOT NULL,
    `roleId` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `lang` VARCHAR(191) NOT NULL DEFAULT 'en',

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    INDEX `User_roleId_idx`(`roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Retalks` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
    `isNSFW` BOOLEAN NOT NULL DEFAULT false,
    `is18Plus` BOOLEAN NOT NULL DEFAULT false,

    INDEX `_Retalks_B_index`(`B`),
    UNIQUE INDEX `_Retalks_AB_unique`(`A`, `B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserFollowers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    INDEX `_UserFollowers_B_index`(`B`),
    UNIQUE INDEX `_UserFollowers_AB_unique`(`A`, `B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserFriends` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    INDEX `_UserFriends_B_index`(`B`),
    UNIQUE INDEX `_UserFriends_AB_unique`(`A`, `B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TalksToCategories` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TalksToCategories_AB_unique`(`A`, `B`),
    INDEX `_TalksToCategories_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
