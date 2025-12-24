-- DropIndex
DROP INDEX "Book_title_key";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "edition" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3);
