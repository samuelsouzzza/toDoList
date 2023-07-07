import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus, faCheck } from '@fortawesome/free-solid-svg-icons';
import './Tasks.css';

const Tasks = ({ list, erase, onOffCheck }) => {
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

  function timeFormatter(id) {
    const minutes = minutesElapsed[id];

    if (minutes === undefined) {
      return '•••';
    } else if (minutes === 0) {
      return 'Agora';
    } else if (minutes >= 60) {
      return Math.floor(minutes / 60) + 'h';
    } else if (minutes >= 1440) {
      return Math.floor(minutes / 24) + 'd';
    } else if (minutes >= 10080) {
      return 'Mais de uma semana';
    } else {
      return minutes + 'min';
    }
  }

  return (
    <>
      {list.map((item, index) => (
        <section
          key={item.id}
          className={`boxItemTask ${item.checked && 'checked'}`}
        >
          <p className='nameTask' onClick={() => onOffCheck(index)}>
            {item.checked && (
              <FontAwesomeIcon icon={faCheck} className='iconCheck' />
            )}
            {item.name}
          </p>
          <div className='boxStats'>
            <p>{timeFormatter(item.id)}</p>
            <FontAwesomeIcon
              icon={faSquareMinus}
              className='iconDel'
              onClick={() => erase(index)}
            />
          </div>
        </section>
      ))}
    </>
  );
};

export default Tasks;
