import React, { useState } from 'react';
import { City, Marker } from './api/search';
import './App.css';
import { Header } from './components/Header';
import { Map } from "./components/Map"
import { Navigation } from "./components/Navigation"

function App() {
  const [selectedItinerary, setSelectedItinerary] = useState<Marker | undefined>();
  const [city, setCity] = useState<City | undefined>();

  return (
    <div className="h-full">
      <Header setCity={setCity} />
      <Map setSelectedItinerary={setSelectedItinerary} city={city} />
      <Navigation selectedItinerary={selectedItinerary} />
      {/* <audio controls>
        <source src="https://c30c-62-28-43-3.eu.ngrok.io/sound" type="audio/wav" />
      </audio> */}
    </div>
  );
}

export default App;
