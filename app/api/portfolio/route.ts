import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const portfolioFolders = [
  "corporate-brand-identity",
  "social-media",
  "banners",
  "infographics",
  "print-design",
  "reels",
];

const allowedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".mp4",
  ".webm",
  ".mov",
];

export async function GET() {
  try {
    const portfolioPath = path.join(process.cwd(), "public", "portfolio");

    const result: Record<
      string,
      {
        name: string;
        url: string;
        type: "image" | "video";
      }[]
    > = {};

    for (const folder of portfolioFolders) {
      const folderPath = path.join(portfolioPath, folder);

      if (!fs.existsSync(folderPath)) {
        result[folder] = [];
        continue;
      }

      const files = fs
        .readdirSync(folderPath)
        .filter((file) => {
          const extension = path.extname(file).toLowerCase();
          return allowedExtensions.includes(extension);
        })
        .sort((a, b) =>
          a.localeCompare(b, undefined, {
            numeric: true,
            sensitivity: "base",
          }),
        );

      result[folder] = files.map((file) => {
        const extension = path.extname(file).toLowerCase();

        const isVideo = [".mp4", ".webm", ".mov"].includes(extension);

        return {
          name: file,
          url: `/portfolio/${folder}/${encodeURIComponent(file)}`,
          type: isVideo ? "video" : "image",
        };
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Portfolio API Error:", error);

    return NextResponse.json(
      { error: "Unable to load portfolio files" },
      { status: 500 },
    );
  }
}
