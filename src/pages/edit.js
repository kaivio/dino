
import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from "@codemirror/view";
import axios from 'axios';
import ReactJson from 'react-json-view'
//import { solarizedLight, solarizedLightInit, solarizedDark, solarizedDarkInit } from '@uiw/codemirror-theme-solarized';
import { duotoneLight, duotoneLightInit, duotoneDark, duotoneDarkInit } from '@uiw/codemirror-theme-duotone';

const themes = {
  light: duotoneLightInit,
  dark: duotoneDarkInit
}

export default function Edit({ open = 'README.md', self = {}, ...props }) {
  const [file, setFile] = useState(open);
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('loading...');
  const [viewStat, setViewStat] = useState('init');
  const [theme, setTheme] = useState('dark');
  
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
        setViewStat('running')
      })
      .catch(error => {
        setMessage(error.message)
        setViewStat('suspend')
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

  useEffect(()=>{
    if (document.querySelector('html[data-theme=light]')){
      setTheme('light')
    }
  },[])


  return (<>
    <Tool self={self} message={message} />
    <CodeMirror
      value={value}
      extensions={[EditorView.lineWrapping]}
      onChange={onChange}
      theme={themes[theme]({
        settings: {
          // caret: '#c6c6c6',
          fontFamily: 'var(--ifm-font-family-monospace)',
        }
      })}
    />
  </>);
}

function Tool({ self, message, ...props }) {
  return (<div>
    <div className='flex space-x-4 px-4 py-2'>
      <div>{self.file}</div>
      <div className='grow text-center'>{message}</div>
      <Button onClick={self.load}>Load</Button>
      <Button onClick={self.save}>Save</Button>
    </div>
  </div>)
}

function Button({onClick, children}){
  return (<>
    <button className='bg-transparent text-inherit border border-inherit  border-solid rounded' onClick={onClick}>{children}</button>
  </>)
}

