import React, { useState, useEffect } from 'react';

import EditView from '@site/src/comp/edit-view';

const ref = {}
const ref2 = {}

export default function Blank() {
  let content =  'function greet() {\n  console.log("Hello, world!");\n}'
  let lang = 'javascript'
  const props = {content, lang}

  const files = [
    {content: '// file 2\n' + content, lang},
    {content: '// file 3\n' + content, lang},
    {content: '# file 4\n'+new Array(40).fill('text')+'\n```javascript\n' + content+'\n```\n', lang:'markdown'},
  ]

  //const [output,setOutpot] = useState('')

  return (<>
    <EditView {...props} self={ref}  className="h-48" />
    <div>
      <button onClick={()=>{

        let newContent = ref.state.doc.toString()
        //setOutpot(newContent)

        // ref2.state.update({doc:newContent})
        // ref2.state.update({doc:newContent})
        // ref2.editor.dispatch({changes: {
        //   from: 0,
        //   to: ref2.state.doc.length,
        //   insert: 'my new content'
        // }})
        ref2.state.doc = 
        console.log()

      }}>生成</button>
    </div>
    <EditView self={ref2} />
    <h3>h3</h3>
    {files.map((v,i)=>(<EditView {...v} key={i} />))}
  </>)
}


