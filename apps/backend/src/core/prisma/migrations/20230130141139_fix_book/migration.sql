-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "author" DROP NOT NULL,
ALTER COLUMN "area" DROP NOT NULL,
ALTER COLUMN "edition" DROP NOT NULL,
ALTER COLUMN "inventory" DROP NOT NULL,
ALTER COLUMN "pages" DROP NOT NULL;
