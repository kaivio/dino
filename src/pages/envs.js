import React from 'react';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import EditThisPage from '@theme/EditThisPage';

import useGlobalData, { usePluginData } from '@docusaurus/useGlobalData';
// import ReactJson from 'react-json-view';


export default function GlobalDatas() {
  // const data = useGlobalData()
  

  const data = usePluginData('my-plugin')
  return (
    <Layout title="Envs" description="">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // height: '50vh',
          overflow: 'auto',
          fontSize: '20px',
          maxWidth: '100vw'
        }}>
        {/* <ReactJson src={data} /> */}

        <CodeBlock>
          {Object.keys(data).map((v, i) => <>
            <b>{v}</b>: {data[v]}<br />
          </>)}
        </CodeBlock>


      </div>
    
      <div style={{ display: 'none' }}>
        <EditThisPage editUrl="/edit/page#/src/pages/envs.js" />
      </div>
    </Layout>
  );
}
