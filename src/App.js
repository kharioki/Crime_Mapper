import React from 'react';
import useSWR, { SWRConfig } from 'swr';

// create an async function
const fetcher = (...args) => fetch(...args).then(res => res.json());

function App() {
  const url =
    'https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10';
  const { data, error } = useSWR(url, fetcher);

  console.log({ data });
  console.log({ error });

  return <div>Hello</div>;
}

export default App;
