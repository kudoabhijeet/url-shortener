"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://projects.kudoabhijeet.com/url/api/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: longUrl }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await response.json();
      const shortcode = data.data.shortcode;

      const shortenedUrl = `ku2.dev/${shortcode}`;
      console.log(shortenedUrl);

      setShortUrl(shortenedUrl);
      console.log(shortUrl);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  }

  async function handleCopy(url: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#1D3461] dark:bg-gray-950">
      <div className="mx-4 grid w-full max-w-md gap-6 rounded-3xl bg-white p-6 shadow-lg dark:bg-gray-900 sm:p-8">
        <div className="space-y-2 text-center">
          <h1 className="text-xl font-bold">URL Shortener by KudoAbhijeet</h1>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            Shorten your long URLs with ease.
          </p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div>
            <Label className="text-sm font-medium" htmlFor="url">
              Long URL
            </Label>
            <Input
              className="mt-1"
              id="url"
              placeholder="https://example.com/very-long-url"
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
          </div>
          <Button type="submit">Shorten URL</Button>
        </form>
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Shortened URL</h2>
          <div className="flex items-center space-x-2">
            <Input
              className="flex-1 bg-gray-100 dark:bg-gray-800"
              readOnly
              value={shortUrl}
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleCopy(shortUrl)}
            >
              {isCopied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
