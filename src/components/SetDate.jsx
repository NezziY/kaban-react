import { useState, useEffect } from 'react';


const SetDate = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);
  

  const formattedDate = date.toLocaleString('es', {
    day: 'numeric',
    weekday: 'long',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className='mx-auto'>
      <p className='text-2xl text-zinc-900 font-bold'>Planeador</p>
        <div className='capitalize'>{formattedDate}</div>
    </div>
  );
};

export default SetDate;