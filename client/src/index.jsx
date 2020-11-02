import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv } from 'd3';

const csvPath = 'https://gist.githubusercontent.com/mmeigooni/4437b0b223c9812fbab5880f18444093/raw/planets-short.csv';

const width = 960;
const height = 2000;

const App = () => {
  const [data, setData] = useState(null);

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

  return (
    <h1>Got data!</h1>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));


// load data once using useEffect
  // create new columns converting strings to numbers

// Create xScale and yScale

// plot the points