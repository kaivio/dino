import React, { useState, useEffect } from 'react';

import CodeMirror from '@site/src/comp/code-mirror';


export default function Blank() {
  let value =  'function greet() {\n  console.log("Hello, world!");\n}'
  let mode = 'javascript'
  const props = {value, mode}

  const files = [
    {value: '// file 2\n' + value, mode},
    {value: '// file 3\n' + value, mode},
    {value: '# file 4\n'+new Array(40).fill('text')+'\n```javascript\n' + value+'\n```\n', mode:'markdown'},
  ]

  //const [output,setOutpot] = useState('')
  const buf1 = {}
  const buf2 = {}
  return (<>
    <CodeMirror {...props} self={buf1} className="h-48" />
    <div className='flex p-4'>
      <div className='grow'>读写测试</div>
      <button onClick={()=>{
        let val = buf1.doc.getValue()
        let lines = val.split('\n')
        for(let i in lines){
          //lines[i] = JSON.stringify(lines[i])
        }
        buf2.doc.setValue(JSON.stringify({lines:lines},' ',2))
      }}>生成</button>
    </div>
    <CodeMirror value='' mode='javascript' self={buf2} />
    <h3>h3 </h3>
    {files.map((v,i)=>(<CodeMirror {...v} key={i} />))}
  </>)
}


