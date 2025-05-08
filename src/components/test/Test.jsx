import React from 'react';

function Test() {
  return (
    <div onClick={() => console.log('Div clicked')}>
      <button onClick={(e) => {
        console.log('Button clicked');
      }}>
        Click Me
      </button>
    </div>
  );
}

export default Test;
