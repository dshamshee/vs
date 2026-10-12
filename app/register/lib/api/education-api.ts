/**
 * Fetches Indian universities via our server-side API.
 */
export async function fetchUniversities(query: string): Promise<string[]> {
    try {
        const response = await fetch(
            `/api/universities?q=${encodeURIComponent(query)}`
        )
        if (!response.ok) return []
        return await response.json()
    } catch {
        return []
    }
}

/**
 * Fetches Indian colleges via our server-side API.
 */
export async function fetchColleges(query: string): Promise<string[]> {
    try {
        const response = await fetch(
            `/api/colleges?q=${encodeURIComponent(query)}`
        )
        if (!response.ok) return []
        return await response.json()
    } catch {
        return []
    }
}
