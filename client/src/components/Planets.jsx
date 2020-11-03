import React from 'react';
import { select } from 'd3';
import { generateId } from '../helpers/generateId.js';

// var tooltip = d3.select("#my_dataviz")
//   .append("div")
//     .style("position", "absolute")
//     .style("visibility", "hidden")
//     .text("I'm a circle!");

// //
// d3.select("#circleBasicTooltip")
//   .on("mouseover", function(){return tooltip.style("visibility", "visible");})
//   .on("mousemove", function(){return tooltip.style("top", (event.pageY-800)+"px").style("left",(event.pageX-800)+"px");})
//   .on("mouseout", function(){return tooltip.style("visibility", "hidden");});


export const Planets = ({data, xScale, yScale, rScale, xValue, yValue, rValue, nameValue, colorScale}) => {

  const handleMouseEnter = (d) => {
    select(`#${generateId(nameValue(d))}`)
      .attr('stroke', '#000')
      .attr('stroke-width', '5');

    console.log(nameValue(d));
  }

  const handleMouseLeave = (d) => {
    select(`#${generateId(nameValue(d))}`)
      .attr('stroke', '#fff')
      .attr('stroke-width', '1');
  }

  return (
    data.map(d => (
      <circle
        onMouseEnter={() => handleMouseEnter(d)}
        onMouseLeave={() => handleMouseLeave(d)}
        id={generateId(nameValue(d))}
        key={nameValue(d)}
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={rScale(rValue(d))}
        fill={colorScale(Math.ceil(xValue(d)))}
        stroke='#fff'
        opacity='.6'
      />
    ))
  )
}