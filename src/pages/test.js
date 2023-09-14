import React from 'react';
import Layout from '@theme/Layout';
import EditThisPage from '@theme/EditThisPage';
import CodeBlock from '@theme/CodeBlock';
import crypt from '../lib/crypt'

export default function Hello() {
  let pass, data, text
  pass = "114514"
  data = 'hello, world'
  text = crypt.enc(pass, data)

  try{
  let data2 = 'U2FsdGVkX1+zD9ZBO2QJ7MYT8WqbGPEelJSxXG/wA10='
   //text = crypt.dec(pass, data2)
  // text = crypt.dec(crypt.kdf('12345'), data2)
  }catch(e){
    text = e + ''
  }
  return (
    <Layout title="test" description="__description__" >
      <div className="flex-col"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
          maxWidth: "100vw",
          width: "100%",
          padding:"15px"
        }}>
          <h1>test</h1>

        <div className="w-[300px] h-max">
      <CodeBlock>
        {text}
      </CodeBlock>
        </div>
      </div>

      <div style={{ display: 'none' }}>
        <EditThisPage editURL="/edit/page#/src/pages/test.js" />
      </div>
    </Layout>
  );
}
