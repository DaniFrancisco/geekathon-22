import React, { useState } from 'react';
import { City, Marker } from './api/search';
import './App.css';
import { Header } from './components/Header';
import { Map } from "./components/Map"
import { Navigation } from "./components/Navigation"

export type FilterType = "cuisine" | "hidden-gems" | "museums" | "art" | "main-attractions" | "landscape";

export interface Filter {
  slug: FilterType
  label: string
  component: React.ReactNode
}

function App() {
  const [selectedItinerary, setSelectedItinerary] = useState<Marker | undefined>();
  const [city, setCity] = useState<City | undefined>();
  const [filter, setFilter] = useState<FilterType | undefined>();

  return (
    <div className="h-full">
      <Header setCity={setCity} filter={filter} setFilter={setFilter} />
      <Map setSelectedItinerary={setSelectedItinerary} city={city} filter={filter} />
      <Navigation selectedItinerary={selectedItinerary} />
      {/* <audio controls>
        <source src="https://c30c-62-28-43-3.eu.ngrok.io/sound" type="audio/wav" />
      </audio> */}
    </div>
  );
}

export default App;
