import React from 'react';
import { Circles } from 'react-loader-spinner';

export default function Loader({heigth='100', width='100'}) {
  return (
    <div>
      <Circles
        height = {heigth}
        width = {width}
        color="#ffffff"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}