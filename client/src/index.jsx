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

  const xValue = d => d.Hzd;
  const yValue = d => d.Mass;
  const rValue = d => d.Radius;
  const nameValue = d => d.name;

  const xScale = scaleLinear()
    .domain([min(data, xValue), max(data, xValue)])
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([0, innerHeight]);

  const rScale = scaleLinear()
    .domain([0, max(data, rValue)])
    .range([1, 15]);

  return (
    <ChartContainer width={width} height={height} left={left} top={top} >
      <AxisTop xScale={xScale} innerHeight={innerHeight} />
      <AxisLeft yScale={yScale} innerWidth={innerWidth} />
      <Planets
        data={data}
        xScale={xScale}
        yScale={yScale}
        rScale={rScale}
        xValue={xValue}
        yValue={yValue}
        rValue={rValue}
        nameValue={nameValue}
      />
    </ChartContainer>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));