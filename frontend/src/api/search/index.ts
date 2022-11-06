interface SearchResponse {
    data: Marker[]
}

export interface Marker {
    description: string
    title: string
    position: { lat: number, lng: number }
    photo: string
    type: "audio" | "trail"
    by: string
    tags: string[]
    rating: {
        avg: string
        numberOfValuations: number
    }
    price: string
}

export interface City {
    name: string
    position: { lat: number, lng: number }
}

interface CitiesResponse {
    data: City[]
}

export class SearchClient {
    getCities(): CitiesResponse {
        return {
            data: [
                { name: "Lisbon", position: { lat: 38.736946, lng: -9.142685 } },
                {
                    name: "Leiria", position: {
                        lat: 39.74362,
                        lng: -8.80705
                    }
                },
                { name: "Porto", position: { lat: 41.14961, lng: -8.61099 } },
                { name: "Madrid", position: { lat: 40.416775, lng: -3.703790 } },
                { name: "Munich", position: { lat: 48.137154, lng: 11.576124 } }
            ]
        }
    }

    getItinerariesForCity(city: string): SearchResponse {
        return {
            data: [
                {
                    description: "Learn the history Leiria castle, from its origin to defend Arab invasion attempts, to its intricate and unique architecture",
                    title: "Leiria Castle History",
                    position: { lat: 39.7472454, lng: -8.8093888 },
                    photo: "./castelo-leiria.png",
                    type: "audio",
                    by: "Prof. Luis Soares",
                    tags: ["Audio tour", "60 mins", "0.6km"],
                    rating: {
                        avg: "5.0",
                        numberOfValuations: 143
                    },
                    price: "5€"
                }
            ]
        }
    }
}
