"use client"

import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps"

// Mock Data - in real app fetch from DB
const GYMS = [
    { id: "1", name: "Crux Climbing", lat: 40.7128, lng: -74.0060, type: "GYM" },
    { id: "2", name: "Vertical Limits", lat: 40.7589, lng: -73.9851, type: "GYM" },
    { id: "3", name: "Gunks (Outdoor)", lat: 41.7456, lng: -74.0862, type: "OUTDOOR" },
]

export function ClimbingMap() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""

    if (!apiKey) {
        return (
            <div className="flex items-center justify-center h-full bg-slate-100 p-4 text-center">
                <div className="max-w-md">
                    <h3 className="text-lg font-bold text-red-600">Missing API Key</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env file to view the map.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full min-h-[500px]">
            <APIProvider apiKey={apiKey}>
                <Map
                    defaultCenter={{ lat: 40.7128, lng: -74.0060 }}
                    defaultZoom={9}
                    mapId="DEMO_MAP_ID" // Required for AdvancedMarker
                    className="w-full h-full"
                    disableDefaultUI={false}
                >
                    {GYMS.map((gym) => (
                        <AdvancedMarker key={gym.id} position={{ lat: gym.lat, lng: gym.lng }}>
                            <Pin background={gym.type === "GYM" ? "#172554" : "#2563eb"} borderColor={"#white"} glyphColor={"white"} />
                        </AdvancedMarker>
                    ))}
                </Map>
            </APIProvider>
        </div>
    )
}
