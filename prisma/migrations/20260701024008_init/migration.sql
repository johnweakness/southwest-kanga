-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "siteAddress" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "serviceDescription" TEXT NOT NULL,
    "preferredDate" TEXT NOT NULL,
    "preferredTime" TEXT,
    "estimatedHours" REAL,
    "mobilizationFee" REAL NOT NULL DEFAULT 150,
    "additionalNotes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "totalCost" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MobilizationSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "fee" REAL NOT NULL DEFAULT 150,
    "updatedAt" DATETIME NOT NULL
);
