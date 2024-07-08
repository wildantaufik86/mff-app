// resources/js/Components/SeatImage.jsx
import React from 'react';
import { seatImageMap } from '@/utils/seatImages';

const SeatImage = ({ section, row }) => {
  const imageName = seatImageMap[`${section}-${row}`];

  if (!imageName) {
    return null;
  }

  return (
    <img
      src={`/images/${imageName}`}
      alt={`Seat view for Section ${section} Row ${row}`}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};

export default SeatImage;
