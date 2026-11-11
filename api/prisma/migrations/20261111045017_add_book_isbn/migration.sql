/*
  Warnings:

  - A unique constraint covering the columns `[isbn]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isbn` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "isbn" TEXT,
ADD COLUMN     "totalCopies" INTEGER NOT NULL DEFAULT 1;

UPDATE "Book" SET "isbn" = '9780261102217' WHERE "title" = 'The Hobbit';
UPDATE "Book" SET "isbn" = '9781408894620' WHERE "title" = 'Harry Potter and the Philosopher''s Stone';
UPDATE "Book" SET "isbn" = '9780756404741' WHERE "title" = 'The Name of the Wind';
UPDATE "Book" SET "isbn" = '9780261102354' WHERE "title" = 'The Fellowship of the Ring';
UPDATE "Book" SET "isbn" = '9780006716778' WHERE "title" = 'The Lion, the Witch and the Wardrobe';
UPDATE "Book" SET "isbn" = '9780753827666' WHERE "title" = 'Gone Girl';
UPDATE "Book" SET "isbn" = '9780857054036' WHERE "title" = 'The Girl with the Dragon Tattoo';
UPDATE "Book" SET "isbn" = '9780141199177' WHERE "title" = 'The Hound of the Baskervilles';
UPDATE "Book" SET "isbn" = '9780007527502' WHERE "title" = 'Murder on the Orient Express';
UPDATE "Book" SET "isbn" = '9781409181637' WHERE "title" = 'The Silent Patient';
UPDATE "Book" SET "isbn" = '9780441172719' WHERE "title" = 'Dune';
UPDATE "Book" SET "isbn" = '9780141036144' WHERE "title" = '1984';
UPDATE "Book" SET "isbn" = '9780008117498' WHERE "title" = 'Foundation';
UPDATE "Book" SET "isbn" = '9780091956141' WHERE "title" = 'The Martian';
UPDATE "Book" SET "isbn" = '9780143105428' WHERE "title" = 'Pride and Prejudice';

ALTER TABLE "Book"
ALTER COLUMN "isbn" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");
