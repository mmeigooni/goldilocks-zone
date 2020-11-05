import React, { useState, useEffect } from 'react';
import { csv } from 'd3';


const csvPath = 'https://gist.githubusercontent.com/mmeigooni/0b968d836c4a3b7b0d0834a765481b10/raw/planets.csv';


export const useData = () => {
  const [ data, setData ] = useState(null);

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
  return data;
}