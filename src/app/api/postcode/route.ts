export const autocompletLocation = (formData: FormData) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}6&lon=${lon}`
}

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    return Response.json({ success: true, items: [] });
}