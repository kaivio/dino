import React from 'react';
import Layout from '@theme/Layout';
import { useDocsContext } from '@docusaurus/useGlobalData';

import Page from '@site/src/pages/helloReact'
import Page2 from '@site/docs/intro.md'

function MyCustomPage() {
   return (
     <Layout>
       <h1>一个普通页面</h1>
       <Page />
       <Page2 />
     </Layout>
   );
}

export default MyCustomPage;
