
import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from "@codemirror/view";
import axios from 'axios';
import ReactJson from 'react-json-view'
import { solarizedLight, solarizedLightInit, solarizedDark, solarizedDarkInit } from '@uiw/codemirror-theme-solarized';


export default function Edit({ open = 'README.md', self = {}, ...props }) {
  const [file, setFile] = useState(open);
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('loading...');
  const [viewStat, SetViewStat] = useState('init');

  self.file = file
  self.setFile = setFile
  self.message = message
  self.setMessage = setMessage

  self.load = () => {
    axios.get('/api/open', {
      params: { file },
      responseType: 'text'
    })
      .then(response => {
        setValue(response.data)
        setMessage('')
        SetViewStat('running')
      })
      .catch(error => {
        setMessage(error.message)
        SetViewStat('suspend')
      });
  }

  self.save = () => {
    axios.put('/api/open', value, {
      params: { file },
      headers: { 'content-type': 'text/plain' },
      responseType: 'text'
    })

      .then(response => {
        setMessage(response.data)
      })
      .catch(error => {
        setMessage(error.message)
      });
  }

  const onChange = React.useCallback((value, viewUpdate) => {
    // console.log('value:', value);
    // extensions=[javascript({ jsx: true })]
    setMessage('')
    setValue(value)
  }, []);

  useEffect(() => {
    self.load()
  }, [file]);



  return (<>
    <Tool self={self} message={message} />
    <CodeMirror
      value={value}
      extensions={[EditorView.lineWrapping]}
      onChange={onChange}
      theme={solarizedLightInit({
        settings: {
          caret: '#c6c6c6',
          fontFamily: 'var(--ifm-font-family-monospace)',
        }
      })}
    />
  </>);
}

function Tool({ self, message, ...props }) {
  return (<div>
    <div className='flex space-x-4 px-4'>
      <div>{self.file}</div>
      <div className='grow text-center'>{message}</div>
      <button onClick={self.load}>Load</button>
      <button onClick={self.save}>Save</button>
    </div>
  </div>)
}


