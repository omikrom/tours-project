import './App.css'
import Loading from './components/Loading';
import Tours from './components/Tours'
import { useState, useEffect } from 'react';

const url = 'https://course-api.com/react-tours-project'

function App() {
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    // if the tour id doesnt match the id passed in, keep it
    const newTours = tours.filter((tour) => tour.id !== id);
    // set the tours to the new tours array
    setTours(newTours);
  }

  const fetchTours = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const tours = await res.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (<main>
      <Loading />
    </main>
    )
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>No Tours Left</h2>
          <button className='btn' onClick={fetchTours}>Refresh</button>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
}

export default App
