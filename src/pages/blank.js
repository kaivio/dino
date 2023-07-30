import React from 'react';

export default function Blank() {
  return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
          padding: '15px',
        }}>
        <p>
          这是一个没有包装的页面
        </p>
      </div>
  );
}
