import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import './Tasks.css';

const Tasks = ({ list }) => {
  return (
    <>
      {list.map((item) => {
        return (
          <section key={item.id} className='boxItemTask'>
            <p className='nameTask'>{item.name}</p>
            <div className='boxStats'>
              <p>{item.time}</p>
              <FontAwesomeIcon icon={faSquareMinus} className='faIcon' />
            </div>
          </section>
        );
      })}
    </>
  );
};

export default Tasks;
