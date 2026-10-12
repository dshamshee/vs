import { NextResponse } from "next/server"
import universitiesData from "@/app/register/lib/data/universities.json"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")?.trim().toLowerCase() ?? ""

    try {
        const list = (universitiesData as string[]) || []
        const filtered = query
            ? list
                  .filter((name) => name.toLowerCase().includes(query))
                  .slice(0, 20)
            : list.slice(0, 20)

        return NextResponse.json(filtered)
    } catch (error) {
        console.error("Universities route error:", error)
        return NextResponse.json([], { status: 500 })
    }
}
