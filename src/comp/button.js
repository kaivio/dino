import React from 'react';

export default function Button({ className, children, ...props }) {
  // left-0 right-0 top-[-50%] aspect-square rounded-full  
  props.tabIndex = props.tabIndex || 0
  return (
    <div className={className +
      ' rounded-sm cursor-pointer select-none whitespace-nowrap' +
      ' overflow-hidden relative inline-block w-max'}
      {...props}>
      <div className='bg-current absolute left-0 right-0 top-0 bottom-0
       opacity-0  pointer:hover:opacity-10 active:!opacity-50 
       transition-opacity duration-500 ease-out' 
       style={{backgroundColor: 'currentColor'}}
       ></div>
      <div className="inline">{children}</div>
    </div>
  )
}