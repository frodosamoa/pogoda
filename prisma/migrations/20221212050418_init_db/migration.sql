-- CreateTable
CREATE TABLE "City" (
    "cityId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "normalizedName" TEXT NOT NULL,
    "population" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "countryCode" TEXT NOT NULL,
    "normalizedCountryCode" TEXT NOT NULL,
    "countryName" TEXT NOT NULL,
    "normalizedCountryName" TEXT NOT NULL,
    "administrativeName" TEXT,
    "normalizedAdministrativeName" TEXT,

    CONSTRAINT "City_pkey" PRIMARY KEY ("cityId")
);

-- CreateIndex
CREATE INDEX "City_normalizedName_idx" ON "City"("normalizedName");

-- CreateIndex
CREATE INDEX "City_population_idx" ON "City"("population" DESC);
