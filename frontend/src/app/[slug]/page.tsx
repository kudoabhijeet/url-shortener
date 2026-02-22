import { redirect, notFound } from "next/navigation";
import axios from "axios";

interface SlugPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;

  try {
    // Call the backend API without following redirects to extract the long URL
    const response = await axios.get(`https://app.ku2.me/${slug}`, {
      maxRedirects: 0, // Don't follow the 301 redirect — capture it instead
      validateStatus: (status) => status >= 200 && status < 400, // Treat 3xx as valid responses
    });

    // The backend responds with a 301 redirect containing the long URL in the Location header
    if (response.status === 301 || response.status === 302) {
      const longUrl = response.headers["location"];

      if (longUrl) {
        redirect(longUrl);
      }
    }

    // Fallback: if we got a 200 JSON response, try to extract the long URL
    if (response.status === 200 && response.data?.longURL) {
      redirect(response.data.longURL);
    }
  } catch (error: unknown) {
    // Next.js redirect() throws a special NEXT_REDIRECT error internally — rethrow it
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as { digest: unknown }).digest === "string" &&
      (error as { digest: string }).digest.includes("NEXT_REDIRECT")
    ) {
      throw error;
    }

    // Axios throws on non-2xx when validateStatus isn't set, handle 404 from the API
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }

    console.error("Error resolving short URL:", error);
  }

  notFound();
}
