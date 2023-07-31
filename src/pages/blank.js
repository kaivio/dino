import React from 'react';

export default function Blank() {
  return (<>
    <div className='bg-emerald-100'
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
    <div className="bg-blue-500 text-white p-4">
      <h1 className="text-2xl font-bold">Hello, Docusaurus!</h1>
      <p className="mt-2">This is an example of using Tailwind CSS in Docusaurus.</p>
      <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 mt-4 rounded">
        Click me!
      </button>
    </div>
  </>);
}
