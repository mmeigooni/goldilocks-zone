import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, min, max } from 'd3';
import { useData } from './helpers/useData';
import { ChartContainer } from './components/ChartContainer.jsx'
import { AxisTop } from './components/AxisTop.jsx'
import { AxisLeft } from './components/AxisLeft.jsx'
import { Planets } from './components/Planets.jsx'

const width = 960;
const height = 2000;
const margin = { top: 20, right: 20, bottom: 20, left: 20};

const App = () => {
  const data = useData();
  const { top, right, bottom, left } = margin;


  if (!data) {
    return <h1>Loading data...</h1>
  }

  const innerHeight = height - top - bottom;
  const innerWidth = width - left - right;

  const xScale = scaleLinear()
    .domain([min(data, d => d.Hzd), max(data, d => d.Hzd)])
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain([0, max(data, d => d.Mass)])
    .range([0, innerHeight]);

  const rScale = scaleLinear()
    .domain([0, max(data, d => d.Radius)])
    .range([1, 15]);

  return (
    <ChartContainer width={width} height={height} left={left} top={top} >
      <AxisTop xScale={xScale} innerHeight={innerHeight} />
      <AxisLeft yScale={yScale} innerWidth={innerWidth} />
      <Planets data={data} xScale={xScale} yScale={yScale} rScale={rScale} />
    </ChartContainer>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));