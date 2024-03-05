import { getAllListings_sitemap } from "airbnb/lib/lisitng";

export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_URI;

    // get all listings
    const listings = await getAllListings_sitemap();
    const listingUrls = listings?.data?.map((listing) => {
        return {
            url: `${baseUrl}/listing/${listing.id}`,
            lastModified: new Date(),
        };
    }) || [];

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        ...listingUrls,
    ]
}