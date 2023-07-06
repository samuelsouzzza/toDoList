import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import './Tasks.css';

const Tasks = ({ list }) => {
  const [minutesElapsed, setMinutesElapsed] = React.useState({});

  React.useEffect(() => {
    const interval = setInterval(() => {
      const updatedElapsed = {};

      list.forEach((item) => {
        const timeNow = Date.now();
        const timeDifference = Math.floor((timeNow - item.time) / (1000 * 60));
        updatedElapsed[item.id] = timeDifference;
      });

      setMinutesElapsed(updatedElapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [list]);

  return (
    <>
      {list.map((item) => (
        <section key={item.id} className='boxItemTask'>
          <p className='nameTask'>{item.name}</p>
          <div className='boxStats'>
            <p>
              {minutesElapsed[item.id] === 0
                ? 'Agora'
                : minutesElapsed[item.id] + 'min'}
            </p>
            <FontAwesomeIcon icon={faSquareMinus} className='faIcon' />
          </div>
        </section>
      ))}
    </>
  );
};

export default Tasks;
