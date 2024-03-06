import { createUrl } from "../lib/http";
import axios from "axios";

const Sitemap = ({listings}) => {

  const baseUrl = "https://votre-salle-v2.vercel.app";
  // Fetch listings data

  console.log("listings length :", listings?.length)
      console.log("listings :", listings)
      console.log("link :", baseUrl)
  
    const listingUrls = listings?.map((listing) => ({
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

  export default Sitemap;

  export async function getServerSideProps() {
    
  
    try {
      // Fetch listings data
      const response = await axios.get("https://votre-salle-api.onrender.com/api/listings");
      const listings = response?.data;
  
      return {
        props: {
          listings: listings || [],
        },
      };
    } catch (error) {
      console.error("Error fetching listings:", error);
      throw error; // Propagate the error
    }
  }