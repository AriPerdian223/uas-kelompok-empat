-- CreateTable
CREATE TABLE `users` (
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `token` VARCHAR(100) NULL,

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `undangans` (
    `undanganId` INTEGER NOT NULL AUTO_INCREMENT,
    `namaPengantin` VARCHAR(100) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `lokasi` VARCHAR(100) NOT NULL,
    `yourStatus` ENUM('Hadir', 'TidakHadir', 'MungkinHadir') NOT NULL,
    `username` VARCHAR(100) NOT NULL,

    INDEX `idx_user_undangans_username`(`username`),
    PRIMARY KEY (`undanganId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `undangans` ADD CONSTRAINT `undangans_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
