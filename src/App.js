import React, { useState, useRef } from 'react';
import useSWR, { SWRConfig } from 'swr';
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl';
import useSupercluster from 'use-supercluster';
import { token } from './config';

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

  // get map bounds

  // get clusters

  // return map
  return (
    <ReactMapGL {...viewport} maxZoom={20} mapboxApiAccessToken={token}>
      {/*markers */}
    </ReactMapGL>
  );
}

export default function App() {
  return <CrimeMap />;
}
