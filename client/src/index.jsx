import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, min, max, scaleThreshold, scaleLog } from 'd3';
import { Grid, Button } from '@material-ui/core';
import { useData } from './helpers/useData';
import { ChartContainer } from './components/ChartContainer.jsx';
import { AxisTop } from './components/AxisTop.jsx';
import { AxisLeft } from './components/AxisLeft.jsx';
import { Planets } from './components/Planets.jsx';

const textLeft = {
  textAlign: 'left',
};

const width100 = {
  width: '100%',
};

const top30bottom60 = {
  textAlign: 'center',
  marginTop: '30px',
  marginBottom: '60px',
};

const width = 960;
const height = 2000;
const margin = { top: 50, right: 20, bottom: 20, left: 100};

const App = () => {
  const data = useData();
  const { top, right, bottom, left } = margin;
  const [ scale, setScale ] = useState('linear')
  let yScale;

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

  const rScale = scaleLog()
    .domain([.1, max(data, rValue)])
    .range([0, 20]);

  const colorScale = scaleThreshold()
    .domain([0, 2])
    .range(["#f0563f", "#a7c039", "#0a9c9d"]);

  return (
    <>
      <Grid justify="center" container>
        <Grid item md={10} xs>
          <h1>GOLDILOCKS WORLDS: JUST RIGHT FOR LIFE?</h1>
        </Grid>
        <Grid item md={4} xs style={textLeft}>
          <h3>Of the 1,780 confirmed planets beyond our solar system, as many as 16 are located in their star’s habitable zone, where conditions are neither too hot nor too cold to support life. Size also matters: A planet that’s too small can’t maintain an atmosphere; one that’s too large will have a crushing atmosphere. A recently detected planet 493 light-years from Earth, Kepler-186f, is close to Earth's size and is located in its solar system's habitable zone.</h3>
        </Grid>
        <Grid item md={2} xs>
          <img style={width100} src="https://i.imgur.com/P462pRe.png" alt="zones"></img>
        </Grid>
      </Grid>
      <Grid justify="center" container style={top30bottom60}>
        <Grid item md={2}>
          <Button variant="contained" color="primary" id="log" onClick={() => {setScale('log')}}>Logarithmic</Button>
        </Grid>
        <Grid item md={2}>
          <Button variant="contained" color="primary" id="linear" onClick={() => {setScale('linear')}}>Linear</Button>
        </Grid>
      </Grid>
      <Grid justify="center" container>
        <Grid item md={2}>
          Too cold
        </Grid>
        <Grid item md={2}>
          Just right
        </Grid>
        <Grid item md={2}>
          Too warm
        </Grid>
      </Grid>
      <Grid justify="center" container>
        <Grid item md={10}>
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
        </Grid>
      </Grid>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));