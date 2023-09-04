import React from 'react';


export default function Button({ className, children, ...props }) {
  return (
    // <div className='inline-block'>  overflow-hidden
    // <div className="inline-block [&>div]:inline-block">

    <div className={className + ' relative inline-block w-max'} {...props}>
      <div className='absolute left-0 right-0 top-[-50%]
      bg-current opacity-[0.5] rounded-full
      aspect-square scale-0 active:scale-100
      transform-[scale(0)]
      '></div>
      <div className="inline">{children}</div>
    </div>
    // </div>
    // </div>
  )
}