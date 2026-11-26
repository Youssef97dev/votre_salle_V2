-- CreateTable
CREATE TABLE "User" (
    "adresse" TEXT,
    "companyInfo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT,
    "id" TEXT NOT NULL,
    "isVerified" BOOLEAN,
    "lastName" TEXT,
    "pack" INTEGER,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "profileImage" TEXT,
    "profileLogo" TEXT,
    "roleNotification" TEXT,
    "roles" JSONB NOT NULL,
    "typeUser" TEXT NOT NULL,
    "typeUserNotification" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "verificationToken" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listing" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "guests" DECIMAL(65,30) NOT NULL,
    "id" TEXT NOT NULL,
    "listingCreatedById" TEXT NOT NULL,
    "locationData" JSONB NOT NULL,
    "locationType" TEXT NOT NULL,
    "mapData" JSONB NOT NULL,
    "photos" JSONB NOT NULL,
    "placeAmeneties" JSONB NOT NULL,
    "placeType" TEXT NOT NULL,
    "prestation" JSONB,
    "price" DOUBLE PRECISION NOT NULL,
    "priceB2b" DOUBLE PRECISION NOT NULL,
    "slug" TEXT,
    "tax" DECIMAL(65,30) NOT NULL,
    "title" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "status" TEXT,
    "tripinfo" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "listingId" TEXT,
    "ratings" DECIMAL(65,30),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,
    "status" TEXT,
    "tripsId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "id" TEXT NOT NULL,
    "photo" TEXT,
    "read" BOOLEAN,
    "title" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_verificationToken_key" ON "User"("verificationToken");

-- CreateIndex
CREATE UNIQUE INDEX "Listing_slug_key" ON "Listing"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_tripsId_key" ON "Invoice"("tripsId");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_listingCreatedById_fkey" FOREIGN KEY ("listingCreatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_tripsId_fkey" FOREIGN KEY ("tripsId") REFERENCES "Trip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
