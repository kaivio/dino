
import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import axios  from 'axios';
import ReactJson from 'react-json-view'

export default function Edit({open='README.md',self={}, ...props}){
  const [file, setFile] = useState(open);
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('loading...');
  const [viewStat, SetViewStat] = useState('init');
  
  self.file = file
  self.setFile = setFile
  self.message = message
  self.setMessage = setMessage

  self.load = () => {
    axios.get('/api/open',{
      params:{file}, 
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
    // axios.put('/api/open?'+new URLSearchParams({file}),value, {
    //   headers: { 'content-type': 'text/plain' },
    //   responseType: 'text',
    // })

    // axios.put('/api/open?'+new URLSearchParams({file}),value, {
    //   headers: { 'content-type': 'text/plain' },
    //   responseType: 'text',
    // })

    axios.put('/api/open',value,{
      params:{file}, 
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
    setValue(value)
  }, []);

  useEffect(() => {
    self.load()
  }, [file]);

  return (<>
    <Tool self={self} />
    <CodeMirror
      value={value}
      extensions={[]}
      onChange={onChange}
    />
  </>);
}

function Tool({self, ...props}){
  return (<div>
    <div>
      Edit <span style={{width: '50px'}}></span>
      {self.message}
    </div>
    <div>
      <span>{self.file}</span>
      <button onClick={self.load}>Load</button>
      <button onClick={self.save}>Save</button>
    </div>
  </div>)
}


