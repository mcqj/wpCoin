// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";
import React from 'react';
import ReactDOM from 'react-dom';

function Balances(props) {
  return (
    <div>
      <h3>You have <span className="black">${props.balOrg}</span> META</h3>
      <h3>Dest has <span className="black">${props.balDest}></span> META</h3>
    </div>
  );
}

const element = (
  <Balances balOrg='10' balDest='900' />
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
