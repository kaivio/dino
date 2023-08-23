import React, { useState, useEffect } from 'react';
import CodeMirror, { EditTabs } from '@site/src/comp/cm6';
import * as router from '@docusaurus/router';
import Layout from '@site/src/comp/layout'

import axios from 'axios';


export default function EditorPage() {
  const location = router.useLocation();
  const history = router.useHistory();
  history.listen((e) => {
    console.log(e)
  })

  const ref = {}

  useEffect(() => {
    let hash = location.hash
    let params = new URLSearchParams(hash.substring(1))

    let doc = 'loading...\n'
    doc += hash.substring(1) + '\n'
    let files = []
    params.forEach((v, k) => {
      doc += `${k} - ${v}\n`
      if (k == 'f') {
        files.push({
          title: v,
          lang: v.split('.').pop(),
          doc: ''
        })
      }
    })
    Promise.all(files.map((f, i) =>
      axios.get('/api/open?file=' + f.title)
        .then((res) => {
          f.doc = res.data
        })
        .catch((err) => {
          ref.setMessage(err + '')
        })
    )).then(()=>{
      files.map((f, i) => ref.tabnew(f))
      ref.tabclose(0)
    })

    ref.tabnew({ title: 'LOADING', doc })
  }, [])

  return (<Layout title="Edit ">
    <div className='h-[100vh]'>
      <EditTabs self={ref}
        onSave={() => {
          console.log('save');
        }}
        onRun={() => {
          console.log('run');
        }}

      />
    </div>
  </Layout>)
}
