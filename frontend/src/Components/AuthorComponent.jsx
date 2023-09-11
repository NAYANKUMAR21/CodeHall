import React from 'react';

const AuthorComponent = (props) => {
  console.log(props.data);
  return (
    <div>
      {props.data.map((item, index) => {
        return (
          <div key={index}>
            <p>name : {item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AuthorComponent;
