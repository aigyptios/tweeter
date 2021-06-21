import { useState, useEffect } from 'react'
import { Tweet } from './components/Tweet';
import { isSuccessResponse, isErrorResponse, IAPIResponse } from './types/types';


function App() {

  const [data, setData] = useState<IAPIResponse>();

  useEffect(() => {
    const query = window.location.search || '?q=the&result_type=popular&count=23'
    console.log(query)
    fetch('tweets' + query )//&max_id=1405990040187113500')
      .then(data => data.json())
      .then(setData)
  }, [])

  return (
    <div className="App">
      Twitter Feed
      { data && isSuccessResponse(data) && 
        <ol>
          {
            data.statuses.map((s, i) => <Tweet tweet={s} key={i} />)
          }
        </ol>
      }
      { (!data || isErrorResponse(data)) && 
        <div>No data</div>
      }

    </div>
  );
}


export default App;
