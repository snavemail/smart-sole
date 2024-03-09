import React, { useEffect, useState } from 'react';

export default function Graph() {
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    const generateGraph = async () => {
      const res = await fetch('https://localhost:8080/getGraph');
      const data = await res.json();
      setGraph(data);
    };
    generateGraph();
  }, []);

  return <div>{graph}</div>;
}
