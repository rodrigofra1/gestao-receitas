/*
  Warnings:

  - Added the required column `sharedWithId` to the `SharedRecipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SharedRecipe" ADD COLUMN     "sharedWithId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SharedRecipe" ADD CONSTRAINT "SharedRecipe_sharedWithId_fkey" FOREIGN KEY ("sharedWithId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
