import { getAllListings_sitemap } from "airbnb/lib/lisitng";

const Sitemap = ({ baseUrl, listings }) => {
  
    const listingUrls = listings?.data?.map((listing) => ({
      url: `${baseUrl}/listing/${listing.id}`,
      lastModified: new Date(),
    })) || [];
  
    const sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
      ...listingUrls,
    ];
  
    return (
      `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemap.map((url) => `
          <url>
            <loc>${url.url}</loc>
            <lastmod>${url.lastModified.toISOString()}</lastmod>
          </url>
        `).join('')}
      </urlset>`
    );
  };
  
  export async function getServerSideProps() {
    const baseUrl = process.env.NEXT_PUBLIC_URI;
  
    try {
      // Fetch listings data
      const listings = await getAllListings_sitemap();
      console.log("listings :", listings)
  
      return {
        props: {
          baseUrl,
          listings,
        },
      };
    } catch (error) {
      console.error("Error fetching listings:", error);
      throw error; // Propagate the error
    }
  }
  
  export default Sitemap;