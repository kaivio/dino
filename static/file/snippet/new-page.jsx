import React from 'react';
import Layout from '@theme/Layout';
import EditThisPage from '@theme/EditThisPage';


export default function Hello() {
  return (
    <Layout title="__title__" description="__description__" >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
        }}>
        <p>
        __title__

        </p>
      </div>

      <div style={{ display: 'none' }}>
        <EditThisPage editURL="/edit/page#__filename__" />
      </div>
    </Layout>
  );
}
