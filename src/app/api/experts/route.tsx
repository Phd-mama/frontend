import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiUrl = 'https://puanpakar.cs.ui.ac.id/api/experts'; 
    const res = await fetch(apiUrl, { cache: 'no-store' }); 
    if (!res.ok) {
      throw new Error(`API returned status ${res.status}`);
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching experts data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
