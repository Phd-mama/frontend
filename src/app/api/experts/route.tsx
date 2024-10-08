import { NextResponse } from "next/server";

export async function GET() {
	try {
		const res = await fetch("https://puanpakar.cs.ui.ac.id/api/experts/");
		const data = await res.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching experts data:", error);
		return NextResponse.json({ error: "Failed to fetch data" });
	}
}
	