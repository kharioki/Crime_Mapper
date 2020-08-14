import React, { useState, useRef } from 'react';
import useSWR, { SWRConfig } from 'swr';
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl';
import useSupercluster from 'use-supercluster';
import { token } from './config';
import './App.css';

// create an async function
const fetcher = (...args) => fetch(...args).then(res => res.json());

function CrimeMap() {
  // setup map
  const [viewport, setViewport] = useState({
    latitude: 52.6376,
    longitude: -1.135171,
    width: '100vw',
    height: '100vh',
    zoom: 12
  });

  const mapRef = useRef();

  // load and prepare data
  const url =
    'https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10';
  const { data, error } = useSWR(url, fetcher);
  const crimes = data && !error ? data.slice(0, 200) : [];

  // superclustering
  // first make a point
  const points = crimes.map(crime => ({
    type: 'Feature',
    properties: {
      cluster: false,
      crimeId: crime.id,
      category: crime.category
    },
    geometry: {
      type: 'Point',
      coordinates: [crime.location.longitude, crime.location.latitude]
    }
  }));

  // get map bounds
  const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;

  // get clusters
  const { clusters } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds,
    options: {
      radius: 75,
      maxZoom: 20
    }
  });

  console.log({ clusters });

  // return map
  return (
    <ReactMapGL
      {...viewport}
      maxZoom={20}
      mapboxApiAccessToken={token}
      onViewportChange={newViewport => {
        setViewport({ ...newViewport });
      }}
      ref={mapRef}
    >
      {/*markers */}
      {crimes.map(crime => (
        <Marker
          key={crime.id}
          latitude={parseFloat(crime.location.latitude)}
          longitude={parseFloat(crime.location.longitude)}
        >
          <button className="crime-marker">
            <img src="/custody.svg" alt="custody" />
          </button>
        </Marker>
      ))}
    </ReactMapGL>
  );
}

export default function App() {
  return <CrimeMap />;
}
