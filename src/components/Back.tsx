import React from 'react';

const BackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return <button onClick={goBack}>Go Back</button>;
};

export default BackButton;
