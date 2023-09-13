import React from 'react';
import Layout from '@theme/Layout';
import EditThisPage from '@theme/EditThisPage';
import crypt from '../lib/crypt'

export default function Hello() {
  let key, data, text
  key = crypt.kdf('123456')
  data = 'hello, world'
  text = crypt.enc(key, data)

  try{
  let data2 = 'jBoCiLBHlq77DuzOC4yopA=='
  // text = crypt.dec(key, data2)
  // text = crypt.dec(crypt.kdf('12345'), data2)
  }catch(e){
    text = e + ''
  }
  return (
    <Layout title="test" description="__description__" >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
        }}>
        <p>
       {text}

        </p>
      </div>

      <div style={{ display: 'none' }}>
        <EditThisPage editURL="/edit/page#/src/pages/test.js" />
      </div>
    </Layout>
  );
}
