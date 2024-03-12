import React, { useEffect } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  time: number;
  leftFootForce: number;
  rightFootForce: number;
}

const data: DataPoint[] = [
  { time: 0, leftFootForce: 0, rightFootForce: 0 },
  { time: 100, leftFootForce: 59, rightFootForce: 17 },
  { time: 200, leftFootForce: 12, rightFootForce: 56 },
  { time: 300, leftFootForce: 61, rightFootForce: 13 },
  { time: 400, leftFootForce: 11, rightFootForce: 49 },
  { time: 500, leftFootForce: 61, rightFootForce: 9 },
  { time: 600, leftFootForce: 15, rightFootForce: 55 },
  { time: 700, leftFootForce: 55, rightFootForce: 25 },
  { time: 800, leftFootForce: 17, rightFootForce: 70 },
  { time: 900, leftFootForce: 53, rightFootForce: 11 },
  { time: 1000, leftFootForce: 20, rightFootForce: 69 },
  // Add more data points as needed
];

const GraphComponent = () => {
  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select('#graph-container')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.time)!])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.leftFootForce, d.rightFootForce))!])
      .range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .append('text')
      .attr('x', width)
      .attr('y', -6)
      .attr('fill', '#000')
      .attr('text-anchor', 'end')
      .text('Time (ms)');

    svg
      .append('g')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('fill', '#000')
      .attr('text-anchor', 'end')
      .text('Force (Newtons)');

    const line = d3
      .line<DataPoint>()
      .x(d => x(d.time)!)
      .y(d => y(d.leftFootForce)!);

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    const line2 = d3
      .line<DataPoint>()
      .x(d => x(d.time)!)
      .y(d => y(d.rightFootForce)!);

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', 1.5)
      .attr('d', line2);

    svg
      .append('circle')
      .attr('cx', width - 90)
      .attr('cy', height - 320)
      .attr('r', 6)
      .style('fill', 'steelblue');
    svg
      .append('circle')
      .attr('cx', width - 90)
      .attr('cy', height - 300)
      .attr('r', 6)
      .style('fill', 'green');
    svg
      .append('text')
      .attr('x', width - 70)
      .attr('y', height - 320)
      .text('Left Foot')
      .style('font-size', '15px')
      .attr('alignment-baseline', 'middle');
    svg
      .append('text')
      .attr('x', width - 70)
      .attr('y', height - 300)
      .text('Right Foot')
      .style('font-size', '15px')
      .attr('alignment-baseline', 'middle');
  }, []);

  return <svg id='graph-container'></svg>;
};

export default GraphComponent;
