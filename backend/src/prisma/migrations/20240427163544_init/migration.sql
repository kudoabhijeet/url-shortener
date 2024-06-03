-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "shortcode" TEXT NOT NULL,
    "longUrl" TEXT,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortcode_key" ON "Url"("shortcode");
