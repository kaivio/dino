import React from 'react';
import Layout from '@theme/Layout';
// import Layout from '@site/src/comp/layout'
import Button from '@site/src/comp/button'

import { useDocsContext } from '@docusaurus/useGlobalData';


function MyCustomPage() {
   return (<Layout title='Test'>
    <h1>Test</h1>
    <Button className="bg-blue-500 px-4 py-2" onClick={()=>{
      console.log('hello');
    }}>button</Button>
     
     
     <div className='mb-96'></div>
   </Layout>);
}

export default MyCustomPage;
