import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { City, Marker, SearchClient } from '../../api/search';

const loader = new Loader({
    //apiKey: "AIzaSyCjFXtbsXjaKwGKyyMulawbyc0g9LCpw_k",
    apiKey: "",
    version: "weekly",
    libraries: ["places"]
});

const mapOptions: google.maps.MapOptions = {
    center: {
        lat: 0,
        lng: 0
    },
    zoom: 4
};

interface Location {
    lat: number
    lng: number
}

interface Props {
    setSelectedItinerary: React.Dispatch<Marker | undefined>
    city?: City
    marker?: Marker
}

const searchClient = new SearchClient();

export const Map: React.FC<Props> = ({ setSelectedItinerary, city }) => {
    const [myLocation, setMyLocation] = useState<Location | undefined>();
    const [map, setMap] = useState<google.maps.Map | undefined>()
    const [googleInstance, setGoogleInstance] = useState<typeof google | undefined>();

    const loadMap = useCallback(async () => {
        const google = await loader.load();

        setGoogleInstance(google);

        const map = new google.maps.Map(document.getElementById("map")!, mapOptions);

        setMap(map);

        map.addListener("center_changed", () => setSelectedItinerary(undefined))
    }, [])

    const geoSuccess: PositionCallback = ({ coords: { latitude, longitude } }) => setMyLocation({ lat: latitude, lng: longitude })

    useEffect(() => {
        if (!city) {
            return;
        }

        if (!googleInstance) {
            return;
        }

        const { data } = searchClient.getItinerariesForCity("");

        map?.setZoom(14);
        map?.panTo(city.position);

        data.forEach((itinerary) => {
            const { position } = itinerary;
            const pin = new googleInstance.maps.Marker({
                position,
                map,
            });

            pin.addListener("click", () => {
                setSelectedItinerary(itinerary);
            });
        })

    }, [city])

    useEffect(() => {
        loadMap();
        navigator.geolocation.getCurrentPosition(geoSuccess);
    }, [loadMap])

    useEffect(() => {
        if (!googleInstance) {
            return;
        }

        new googleInstance.maps.Marker({
            position: myLocation,
            map,
            icon: "./icons8-user-location-48.png"
        });

    }, [myLocation, googleInstance, map])

    return (
        <div id="map" className="h-full"></div>
    );
}