import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, min, max, scaleThreshold, scaleLog } from 'd3';
import { useData } from './helpers/useData';
import { ChartContainer } from './components/ChartContainer.jsx'
import { AxisTop } from './components/AxisTop.jsx'
import { AxisLeft } from './components/AxisLeft.jsx'
import { Planets } from './components/Planets.jsx'

const width = 960;
const height = 2000;
const margin = { top: 50, right: 20, bottom: 20, left: 100};

const App = () => {
  const data = useData();
  const { top, right, bottom, left } = margin;
  const [ scale, setScale ] = useState('linear')
  let yScale;

  useEffect(() => {
    console.log('Scale is now', scale);
 }, [scale]);

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



    if (scale === 'linear') {
      yScale = scaleLinear()
        .domain([0, max(data, yValue)])
        .range([0, innerHeight]);
    } else if (scale === 'log') {
      yScale = scaleLog()
        .domain([.01, 10000])
        .range([0, innerHeight]);
    }

  const rScale = scaleLinear()
    .domain([0, max(data, rValue)])
    .range([0, 20]);

  const colorScale = scaleThreshold()
    .domain([0, 2])
    .range(["#f0563f", "#a7c039", "#0a9c9d"]);

  return (
    <>
      <button type="button" id="log" onClick={() => {setScale('log')}}>Logarithmic</button>
      <button type="button" id="linear" onClick={() => {setScale('linear')}}>Linear</button>
      <ChartContainer width={width} height={height} left={left} top={top} >
        <AxisTop innerWidth={innerWidth} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} innerWidth={innerWidth} />
        <Planets
          data={data}
          xScale={xScale}
          yScale={yScale}
          rScale={rScale}
          colorScale={colorScale}
          xValue={xValue}
          yValue={yValue}
          rValue={rValue}
          nameValue={nameValue}
        />
      </ChartContainer>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));