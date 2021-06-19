import { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState();

  useEffect(() => {
    fetch('lol?q=Boston')
      .then(data => data.json())
      .then(setData)
  }, [])

  return (
    <div className="App">
      Tweeter
      {
        data ? JSON.stringify(data) : ''
      }
    </div>
  );
}

export default App;
