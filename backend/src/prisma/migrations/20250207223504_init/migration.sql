/*
  Warnings:

  - You are about to drop the `Url` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Url";

-- CreateTable
CREATE TABLE "Urls" (
    "id" SERIAL NOT NULL,
    "shortcode" TEXT NOT NULL,
    "longUrl" TEXT,

    CONSTRAINT "Urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Urls_shortcode_key" ON "Urls"("shortcode");
