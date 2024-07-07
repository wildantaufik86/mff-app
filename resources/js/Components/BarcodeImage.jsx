import React from 'react';

const BarcodeImage = ({ imageUrl }) => {
  return (
    <div>
      <img src={imageUrl} alt="Barcode Image" />
    </div>
  );
};

export default BarcodeImage;
