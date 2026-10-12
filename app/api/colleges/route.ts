import { NextResponse } from "next/server"
import collegesData from "@/app/register/lib/data/colleges.json"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")?.trim().toLowerCase() ?? ""

    try {
        const list = (collegesData as string[]) || []
        const filtered = query
            ? list
                  .filter((name) => name.toLowerCase().includes(query))
                  .slice(0, 20)
            : list.slice(0, 20)

        return NextResponse.json(filtered)
    } catch (error) {
        console.error("Colleges route error:", error)
        return NextResponse.json([], { status: 500 })
    }
}
