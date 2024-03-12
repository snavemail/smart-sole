import React from 'react';
import GraphComponent from '../components/GraphSVG';
import '../css/graph.css';

export default function Graph() {
  return (
    <div className='graph-wrapper'>
      <div className='graph-header-div'>
        <h1 className='graph-header-text'>
          <span>Your Results</span>
        </h1>
      </div>
      <GraphComponent />
      <div className='next-div'>
        <a href='/loading'>Next</a>
      </div>
    </div>
  );
}
