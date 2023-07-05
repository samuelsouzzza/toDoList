import React from 'react';
import './Tasks.css';

const Tasks = ({ list }) => {
  return (
    <>
      {list.map((item) => {
        return (
          <section key={item.id} className='boxItemTask'>
            <p className='nameTask' key={item.id}>
              {item.name}
            </p>
            <div className='boxDataTask'>
              <p>14:12</p>
              <p>22/09</p>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default Tasks;
