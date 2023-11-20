import React from 'react';
import Layout from '@theme/Layout';
import EditThisPage from '@theme/EditThisPage';

import CodeBlock from '@theme/CodeBlock';
import BrowserOnly from '@docusaurus/BrowserOnly';


export default function Hello() {

  return (
    <Layout title="test" description="__description__" >

     
          <BrowserOnly fallback={<div>Loading...</div>}>
            {() => {
              let keys = []
              for(let i=0; i <= localStorage.length; i++){
                keys.push(localStorage.key(i))
              }
              return <>
              {keys.map((k)=>(<CodeBlock title={k} key={k}>
                {localStorage.getItem(k)}
              </CodeBlock>))}
              </>;
            }}
          </BrowserOnly>
        

      <div style={{ display: 'none' }}>
        <EditThisPage editURL="/edit/page#/src/pages/test.js" />
      </div>
    </Layout>
  );
}
