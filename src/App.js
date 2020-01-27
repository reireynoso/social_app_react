import React, {useEffect, useState} from 'react';


const App = () => {
  console.log(process.env["REACT_APP_URL"])

  useEffect(() => {
    // fetch(`${process.env["REACT_APP_URL"]}/messages`)   
  }, [])
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
