import React, { useEffect, useReducer } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import * as router from '@docusaurus/router';

function reducer(state, action) {
  return action
}


export default function Paste() {
  const location = router.useLocation();
  const history = router.useHistory();
  let id = location.hash.substring(1)

  // useReducer()
  const [state, dispatch] = useReducer(reducer, {
    id,
    text: `
    import React, { useReducer } from 'react';
    import clsx from 'clsx';
    import Link from '@docusaurus/Link';
    import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
    import Layout from '@theme/Layout';
    import * as router from '@docusaurus/router';
    
    `,
    media: []
  });

  useEffect(() => {
    let imgs = ['img/undraw_docusaurus_mountain.svg']
    imgs.push(imgs[0])
    imgs.push(imgs[0])
    imgs.push(imgs[0])
    imgs.push(imgs[0])

    dispatch({
      media: imgs,
    })
  }, [])



  return (
    <Layout title={"Paste"}>

      <div className='flex flex-col p-8'>

        <div className='flex space-x-4'>
          <label> id </label>
          <input value={state.id} />
          <div className='btn'>load</div>
          <div className='btn'>save</div>
        </div>
        <textarea rows={10} className='mt-5'>
          {state.text}
        </textarea>
        <div className='flex flex-wrap mt-5'>
          {state.media.map((v, i) => <img
            key={i}
            className='w-[100px] h-[100px] object-cover'
            src={v}
          />)}
          <div className='btn hover:bg-slate-700 bg-slate-500 text-slate-300 text-[50px] w-[100px] h-[100px] text-center leading-[100px] '>+</div>
        </div>
      </div>

    </Layout>
  );
}
