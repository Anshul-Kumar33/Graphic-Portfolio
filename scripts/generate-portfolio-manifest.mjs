import fs from "node:fs";
import path from "node:path";

const portfolioFolders = [
  "corporate-brand-identity",
  "social-media",
  "banners",
  "infographics",
  "print-design",
  "reels",
];

const allowedExtensions = [
  ".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg",
  ".mp4", ".webm", ".mov",
];

const portfolioPath = path.join(process.cwd(), "public", "portfolio");
const outputDirectory = path.join(process.cwd(), "app", "data");
const outputFile = path.join(outputDirectory, "portfolio-manifest.json");

const result = {};

for (const folder of portfolioFolders) {
  const folderPath = path.join(portfolioPath, folder);

  if (!fs.existsSync(folderPath)) {
    result[folder] = [];
    continue;
  }

  const files = fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => {
      return (
        entry.isFile() &&
        allowedExtensions.includes(path.extname(entry.name).toLowerCase())
      );
    })
    .map((entry) => entry.name)
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

fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));

console.log("Portfolio manifest generated successfully.");
