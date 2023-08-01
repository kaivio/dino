
import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";
import axios from 'axios';
import ReactJson from 'react-json-view'
import { duotoneLightInit, duotoneDarkInit } from '@uiw/codemirror-theme-duotone';


import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';

const themes = {
  light: duotoneLightInit,
  dark: duotoneDarkInit
}

function Edit({ open = 'README.md', self = {}, ...props }) {
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
      extensions={[
        EditorView.lineWrapping,
        loadLanguage('markdown'),
       // langs.markdown(),
      ]}
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

function EditPage(props){
  const files = [
    {
      title: "File 1.js",
      value: 'function greet() {\n  console.log("Hello, world!");\n}',
      lang: "javascript"
    },
    {
      title: "File 2.cpp",
      value:
        '#include <iostream>\n\nint main() {\n  std::cout << "Hello, world!" << std::endl;\n  return 0;\n}',
      lang: "cpp"
    },
     {
       title: "File 3.java",
       value:
         'public class HelloWorld {\n public static void main(String[] args) {\n System.out.println("Hello, world!"); \n}\t }',
       lang: "java"
     }
  ];

  return (<>
    <EditGroup files={files} />
    <Edit />

  </>)
}

function EditGroup({files}){
  
  const [tabTitles, setTabTitles] = useState(files.map((v, i)=> v.title))


  const tabContents = files.map((v, i)=>(
    <EditView key={i} 
      value={v.value}  
      lang={v.lang}  
      onChange={(value, viewUpdate)=>{
        v.value=value
        tabTitles[i] = '*'+v.title
        setTabTitles([...tabTitles])
      }}
    />
  ))
  // 保存事件
  // 重新加载事件
  // 生成3个表示源代码文件对象，数据结构是 [{title，value, lang}] 
  return (<>
    <Tool self={self} />
    <Tabs  titles={tabTitles} contents={tabContents} />
  </>)
}



// TODO: 参数支持：高度
function EditView({value, lang, onChange, theme, ...props}){
  return (
    <CodeMirror
      value={value}
      extensions={[
        EditorView.lineWrapping, // 自动换行
        loadLanguage(lang)||loadLanguage('markdown'),
      ]}
      onChange={onChange}
      theme={themes[theme || 'light']({
        settings: {
          fontFamily: 'var(--ifm-font-family-monospace)',
        }
      })}
      {...props}
    />
  )
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

function Tabs({titles, contents}){
  const [activeTab, setActiveTab] = useState(0)

  return (<>
    <div className="flex flex-col">
      <div className="flex">
        {titles.map((v,i)=>(
          <button key={i}
            className={"border-none "
            + (activeTab == i ? "bg-slate-200" : "bg-transparent")
            }
            onClick={() => setActiveTab(i)}
          >
            
            {v}
          </button>
        ))}
      </div>
    </div>
    
    <div className='flex'>
      {contents.map((v, i) => (
      <div className={"bg-white rounded-bl-md rounded-br-md "
        + (activeTab == i ? 'w-full':'w-0')}  
      >
        {contents[i]}
      </div>
      ))}
    </div>
  </>)
  
}


export default EditPage