import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';

import CodeBlock from '@theme/CodeBlock';
import * as router from '@docusaurus/router';

 function MyReactPage() {
  return (
    <div>
      <CodeBlock
        language="jsx"
        title="/src/components/HelloCodeTitle.js"
        showLineNumbers>
        {`function HelloCodeTitle(props) {
  return <h1>Hello, {props.name}</h1>;
}`}
      </CodeBlock>
    </div>
  );
}

export default function Blank() {
  const location = router.useLocation();
  const history = router.useHistory();
  history.listen((e)=>{
    console.log(e)
  })
  return (<Layout noNavbar noFooter>
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
        这是一个没有包装的页面 <br />
        {location.pathname} <br />

        {location.search}<br />
        {location.hash}<br />
        <button onClick={()=>{
          history.push('/edit-root#f=README.md&f=static/test.sh&f=static/test.java')
        }}>router test</button>
      </p>
    </div>
    <div className="bg-blue-500 text-white p-4">
      <h1 className="text-2xl font-bold">Hello, Docusaurus!</h1>
      <p className="mt-2">This is an example of using Tailwind CSS in Docusaurus.</p>
      <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 mt-4 rounded">
        Click me!
      </button>
    </div>
    <MyReactPage />
    <div clclassNameass="flex">
  <div className="w-1/4">
    <div className="flex flex-col space-y-2">
      <div>
        <a href="#" className="bg-gray-200 px-4 py-2 rounded-md">Tab 1</a>
      </div>
      <div>
        <a href="#" className="bg-gray-200 px-4 py-2 rounded-md">Tab 2</a>
      </div>
    </div>
  </div>

  <div className="w-3/4">
    <div className="bg-white p-4 rounded-md">
    tailwind 实现一个标签页react组件，标签栏位于顶部，只使用div和button元素
    </div>
  </div>
</div>
<Tabs />
  </Layout>);
}

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col">
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 rounded-tl-md rounded-tr-md ${
            activeTab === 0 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab(0)}
        >
          Tab 1
        </button>
        <button
          className={`px-4 py-2 ml-1 rounded-tl-md rounded-tr-md ${
            activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Tab 2
        </button>
      </div>

      <div className="p-4 bg-white rounded-bl-md rounded-br-md">
        {activeTab === 0 && (
           // 第一个标签页内容 
           <div>Content for Tab 1</div>
        )}

        {activeTab === 1 && (
           // 第二个标签页内容 
           <div>Content for Tab 2</div>
        )}
      </div>
    </div>
  );
};
