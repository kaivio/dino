
import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import axios  from 'axios';

function Edit() {
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value);
  }, []);

  const [fileContent, setFileContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('/api/file/read?path=package.json',{responseType: 'text'})
      .then(response => {
        //setFileContent(JSON.stringify(response.data, ' ', 2))
        setFileContent(response.data)
      })
      .catch(error => {
        setErrorMessage(error.message);
      });


  }, []);

  return (
    <CodeMirror
      value={fileContent ||errorMessage || 'loading...' }
      height="200px"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
}

export default Edit;


