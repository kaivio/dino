import axios from 'axios';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as router from '@docusaurus/router';
// import Layout from '@site/src/comp/layout'
import Layout from '@theme/Layout';

import Edit from '@site/src/comp/editor';


export default function EditorPage() {
  const location = router.useLocation();
  const history = router.useHistory();
  history.listen((e) => {
    console.log(e)
  })

  const ref = useRef({})

  useEffect(async () => {
    const current = ref.current
    let hash = location.hash
    let params = new URLSearchParams(hash.substring(1))

    let doc = 'loading...\n'
    doc += hash.substring(1) + '\n'
    let files = []
    params.forEach((v, k) => {
      doc += `${k} - ${v}\n`
      if (k == 'f') {
        files.push({
          name: v,
          lang: v.split('.').pop(),
          doc: ''
        })
      }
    })

    // !(async function(){
    // current.tabnew({ name: 'LOADING', doc })
    // current.tabnext(0)
    // })()

    Promise.all(files.map((f, i) =>
      axios.get('/api/open?file=' + f.name)
        .then((res) => {
          f.doc = res.data
        })
        .catch((err) => {
          current.setMessage(err + '')
        })
    )).then(() => {
      files.map((f, i) => current.tabnew(f))
      current.tabnext(0)
    })


  }, [])

  const handleSave = useCallback(() => {
    console.log('save');
    
    // let editor = ref.current.get_editor()
    // let doc = editor.state.doc.toString()
    let tab = ref.current.get_tab()
    let doc = tab.editor.state.doc.toString()
    console.log(doc);
    console.log(tab.name);

    axios.put('/api/open?file=' + tab.name, doc, {
      headers:{'Content-Type':'text/plain'}
    })
    .then((res) => {
      ref.current.setMessage('Saved')
    })
    .catch((err) => {
      ref.current.setMessage(err + '')
    })
  })
  const handleRun = useCallback(() => {
    console.log('run');
  })

  return (<Layout title="Edit " noNavbar noFooter>
    <div className='h-[100vh]'>
      <Edit self={ref} tools={{
        actions: {
          save: handleSave,
          run: handleRun,
        },
        onClickExit:(e)=>{
          history.goBack()
        }
      }}

      />
    </div>
  </Layout>)
}
