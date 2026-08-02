/*
  Warnings:

  - A unique constraint covering the columns `[pictureId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pictureId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionX` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionY` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "pictureId" INTEGER NOT NULL,
ADD COLUMN     "positionX" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "positionY" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Picture" ADD COLUMN     "path" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Character_pictureId_key" ON "Character"("pictureId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
