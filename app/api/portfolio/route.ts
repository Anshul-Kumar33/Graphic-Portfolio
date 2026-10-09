import { NextResponse } from "next/server";
import portfolioData from "../../data/portfolio-manifest.json";

export async function GET() {
  try {
    return NextResponse.json(portfolioData);
  } catch (error) {
    console.error("Portfolio API Error:", error);

    return NextResponse.json(
      { error: "Unable to load portfolio files" },
      { status: 500 },
    );
  }
}
