import React, { useEffect, useReducer } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import * as router from '@docusaurus/router';
import axios from 'axios';
import { useRef } from 'react';
import mime from 'mime/lite';


function reducer(state, action) {
  switch (action.type) {
    case 'mix': {
      return {
        ...state,
        ...action.state
      };
    }
    case 'push': {
      let new_state = {}
      delete action.type
      for (let k in action) {
        new_state[k] = [...state[k], ...action[k]]
      }
      return {
        ...state,
        ...new_state
      };
    }
    case 'replace': {
      let i = state[action.target].indexOf(action.query)
      if (i > -1) {
        state[action.target][i] = action.value
      }

      return { ...state }
    }
  }
  throw Error('Unknown action: ' + action.type);
}

export default function Paste() {
  const location = router.useLocation();
  const history = router.useHistory();
  let id = location.hash.substring(1)

  // useReducer()

  const [state, dispatch] = useReducer(reducer, {
    id,
    text: '',
    media: []
  });

  function save() {
    axios.put(`/api/open?file=tmp/paste/${state.id}.json`,
      JSON.stringify(state),
      {
        headers: { 'Content-Type': 'text/plain' }
      })
      .then((res) => {
        console.log('ok');
      })
      .catch((err) => {
        console.log(err);

      })
  }

  function load() {
    if (state.id != document.location.hash.substring(1)) {
      document.location.hash = '#' + state.id
    }

    axios.get(`/api/open?file=tmp/paste/${state.id}.json`)
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: 'mix',
          state: res.data
        })
      })
      .catch((e) => {
        dispatch({
          type: 'mix',
          state: {
            text: '',
            media: [],
          }
        })
      })
  }

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    console.log(state);
  })


  return (
    <Layout title={"Paste"}>

      <div className='flex flex-col p-8'>

        <div className='flex space-x-4'>
          <label> id </label>
          {/* <input defaultValue={state.id}  ref={idRef}/> */}
          <input value={state.id}
            onChange={(e) => { dispatch({ type: 'mix', state: { id: e.target.value } }) }} />
          <div className='btn' onClick={load}>load</div>
          <div className='btn' onClick={save}>save</div>
        </div>

        <textarea rows={10}
          className='mt-5'
          value={state.text}
          onChange={(e) => {
            dispatch({ type: 'mix', state: { text: e.target.value } })
          }} />

        <div className='flex flex-wrap mt-5 select-none'>
          {state.media.map((v, i) => <MediaView
            key={i}
            src={v}
            dispatch={dispatch}
            uploadAfter={save}
          />)}
          <label htmlFor="media_uploads" className='btn hover:bg-slate-700 bg-slate-500 text-slate-300 text-[50px] w-[100px] h-[100px] text-center leading-[100px] '>+</label>
        </div>
        <input type='file' multiple
          id="media_uploads"
          onChange={(e => {
            let res = processSelectFile(e, dispatch)

          })}
        />
      </div>

    </Layout>
  );
}



function MediaView({ src, dispatch, uploadAfter, ...props }) {
  let url, type, name, size, status
  if (src instanceof Blob) {
    type = src.type
    name = src.name
    size = src.size
    url = URL.createObjectURL(src)
    status = 'local'
  } else {
    // console.log(mime);
    url = src
    console.log(url);
    name = new URL(url, document.location).searchParams.get('file')
      .split('/').pop()
    type = mime.getType(url)
    status = 'remote'
  }

  useEffect(() => {
    if (src instanceof Blob) {
      URL.revokeObjectURL(url)

      let new_url = `/api/open?file=tmp/paste/media/${name}`

      const reader = new FileReader();
      reader.onload = function (e) {
        axios.put(new_url, e.target.result,
          {
            headers: { 'Content-Type': type }
          })
          .then((res) => {
            console.log('ok');
            dispatch({
              type: 'replace',
              target: 'media',
              query: src,
              value: new_url
            })
            URL.revokeObjectURL(src)
            uploadAfter || uploadAfter()
          })
          .catch((err) => {
            console.log(err);

          })
      };

      reader.readAsArrayBuffer(src);



      return () => {
        // free blob
        URL.revokeObjectURL(src)
      }
    }

  }, [])

  return (<>
    <div className='w-[100px] h-[100px] relative'>
      {type.startsWith('image') &&
        <img src={src} className='w-full h-full object-cover' /> ||
        <div data-src={src} className='w-full h-full'>{type}</div>
      }
      <div className='absolute text-xs w-[100px] bottom-0 text-gray-300 bg-[#0000007f] truncate '
        // dir='rtl'
         style={{ direction: 'rtl' }}
      >
        {name}
      </div>
    </div>
  </>)
}


function processSelectFile(e, dispatch) {
  const files = e.target.files;

  for (let file of files) {
    console.log(file);
    console.log(file instanceof Blob);
    dispatch({
      type: 'push',
      media: [file]
    })



    // const reader = new FileReader();
    // reader.onload = function (re) {
    //   console.log(re.target.result);
    // };


    // // 开始读取指定的Blob或File对象中包含数据。
    // reader.readAsArrayBuffer(file);
  }
}
