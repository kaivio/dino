import axios from 'axios';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as router from '@docusaurus/router';
// import Layout from '@site/src/comp/layout'
import Layout from '@theme/Layout';

import Edit from '@site/src/comp/editor';

// return {MAIN, JSX, METADATA, ERROR}
async function load(path) {
  path = `src/pages/${path}.js`
  let doc_data = {
    main: '',
    jsx: '',
    metadata: '',
    error: '',
  }
  let res
  try {
    res = await axios.get('/api/open?file=' + path, { responseType: 'text' })
    doc_data.main = res.data
  }
  catch (err) {
    // console.log(err);
    doc_data.error = err.toString()
    return doc_data
  }

  return doc_data
}


async function save(path, { main, jsx, metadata }) {
  path = `src/pages/${path}.js`
  console.log(path);
  let s = main
  await axios.put('/api/open?file=' + path, s, {
    headers: { 'Content-Type': 'text/plain' }
  })
}



export default function EditorDoc() {
  const location = router.useLocation();
  const history = router.useHistory();
  history.listen((e) => {
    console.log(e)
  })

  const ref = useRef({})

  let path = location.hash.substring(2)
  console.log(path);
  useEffect(async () => {
    const current = ref.current

    const data = await load(path)

    let files = [{
      name: 'MAIN',
      doc: data.main,
      lang: 'jsx'
    },
    // {
    //   name: 'JSX',
    //   doc: data.jsx,
    //   lang: 'jsx'
    // },
    {
      name: 'METADATA',
      doc: data.metadata,
      lang: 'yaml'
    },
    ]


    if (data.error) {
      files.unshift({
        name: 'ERROR',
        doc: data.error,
      })
    }

    files.map((f, i) => current.tabnew(f))
    current.tabnext(0)

  }, [])

  const handleSave = useCallback(() => {
    console.log('save');

    let main = ref.current.get_editor(0).state.doc.toString()

    save(path, { main})
      .then((res) => {
        //ref.current.setMessage('Saved')
      })
      .catch((err) => {
        ref.current.setMessage(err + '')
      })
  })
  const handleRun = useCallback(() => {
    console.log('run');
  })


  return (<Layout title={"Edit " + path} noNavbar noFooter>
    <div className='h-[100vh]'>
      <Edit self={ref} tools={{
        title: path,
        actions: {
          save: handleSave,
          // run: handleRun,
        },
        hiddenTabControl: true,
        menu: [
          {
            text: 'RELOAD', click: () => { }
          },
          {
            text: 'LOCAL CACHE ', click: () => { }
          },
          {
            text: 'LOCAL RECOVER ', click: () => { }
          },
        ],
        onClickExit: (e) => {
          history.goBack()
        }
      }}

      />
    </div>
  </Layout>)
}
