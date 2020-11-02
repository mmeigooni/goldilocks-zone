import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, min, max } from 'd3';

const csvPath = 'https://gist.githubusercontent.com/mmeigooni/0b968d836c4a3b7b0d0834a765481b10/raw/planets.csv';

const width = 960;
const height = 2000;
const margin = { top: 20, right: 20, bottom: 20, left: 20};

const App = () => {
  const [ data, setData ] = useState(null);
  const { top, right, bottom, left } = margin;

  useEffect(() => {
    const row = d => {
      d.Mass = +d.mass;
      d.Radius = +d.radius;
      d.Hzd = +d.hzd;
      return d;
    };

    csv(csvPath, row)
      .then(data => {
        setData(data);
      })
      .catch(err => {
        console.log('Error in parsing CSV');
        console.log(err);
      });
  }, []);

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

  console.log(xScale.ticks(2));
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${left + 20}, ${top})`}>
        {xScale.ticks(2).map(tick => (
          <g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
            <line y2={innerHeight} stroke="black"/>
            <text style={{textAnchor: 'middle'}}>{tick}</text>
          </g>
        ))}
        {yScale.ticks(6).map(tick => (
          <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
            <line
              x2={innerWidth}
              stroke="black"
            />
            <text
              style={{textAnchor: 'end'}}
              dx="-5"
              dy="5"
            >
              {tick}
            </text>
          </g>
        ))}
        {data.map(d => (
          <circle
            key={d.name}
            cx={xScale(d.Hzd)}
            cy={yScale(d.Mass)}
            r={rScale(d.Radius)}
          />
        ))}
      </g>
    </svg>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));