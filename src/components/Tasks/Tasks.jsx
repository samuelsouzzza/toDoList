import React from 'react';
import './Tasks.css';

const Tasks = ({ list }) => {
  return (
    <>
      {list.map((item) => {
        return <p key={item.id}>{item.name}</p>;
      })}
    </>
  );
};

export default Tasks;
