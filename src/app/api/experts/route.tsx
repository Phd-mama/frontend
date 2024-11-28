import { NextResponse } from "next/server";
export async function GET() {
	try {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://puanpakar.cs.ui.ac.id/api/experts/';
		const res = await fetch(`${apiUrl}/experts`, { cache: 'no-store' });
		const data = await res.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching experts data:", error);
		return NextResponse.json({ error: "Failed to fetch data" });
	}
}
	