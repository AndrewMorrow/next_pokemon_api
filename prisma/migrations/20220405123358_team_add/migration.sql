/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `team` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Team_id_key` ON `Team`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Team_name_key` ON `Team`(`name`);
