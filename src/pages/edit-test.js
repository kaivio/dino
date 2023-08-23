import React, { useState, useEffect, useRef } from 'react';

import Edit from '@site/src/comp/edit';
import * as router from '@docusaurus/router';
import Layout from '@site/src/comp/layout'

import axios from 'axios';


export default function EditorPage() {
  const location = router.useLocation();
  const history = router.useHistory();
  history.listen((e) => {
    console.log(e)
  })

  const ref = useRef({})

  useEffect(() => {
    const current = ref.current
    current.tabnew({name:'1.txt',doc:'doc 1 ...'})
    current.tabnew({name:'2.txt',doc:'doc 2 ...'})
    current.tabnew({name:'3.txt',doc:'doc 3 ...'})
    console.log(current);
    current.tabnext(0)
    current.tabnext(1)
    // current.tabclose(1)
    // console.log(current.tabs[1].editor.state.doc.toString())
  }, [])

  return (<Layout title="Edit ">
    <div className='h-[100vh]'>
      <Edit self={ref} />
    </div>
  </Layout>)
}
