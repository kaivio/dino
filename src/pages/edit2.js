import React, { useState, useEffect } from 'react';

import EditView from '@site/src/comp/edit-view';

export default function Blank() {
  let doc =  'function greet() {\n  console.log("Hello, world!");\n}'
  let lang = 'javascript'
  const props = {doc, lang}

  const files = [
    {doc: '// file 2\n' + doc, lang},
    {doc: '// file 3\n' + doc, lang},
    {doc: '# file 4\n'+new Array(40).fill('text')+'\n```javascript\n' + doc+'\n```\n', lang:'markdown'},
  ]

  return (<>
    <EditView {...props} />
    <h3>h3</h3>
    {files.map((v,i)=>(<EditView {...v} key={i} />))}
  </>)
}


