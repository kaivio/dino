import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import feather from 'feather-icons';

import { EditorView, basicSetup } from "codemirror"
import { EditorSelection } from "@codemirror/state"

import * as commands from "@codemirror/commands"
import cm_theme from "@site/src/codemirror-colors"

import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';


export default function CodeMirror({ doc, lang, className, self = {}, ...props }) {
  const id = Math.random()
  useEffect(() => {
    let editor = new EditorView({
      doc: doc,
      extensions: [
        basicSetup,
        EditorView.lineWrapping,
        commands.history(),
        cm_theme(),

        loadLanguage(lang) || loadLanguage('markdown')
      ],
      parent: document.getElementById(id),
    })
    self.editor = editor
    return () => {
      editor = undefined
      delete self.editor
    }
  }, [])
  return (<>
    <div id={id} className={"CodeMirror " + className}></div>
  </>)
}



export function EditTabs({ onRun, onSave, noTool, self }) {
  [self.state, self.setState] = useState({
    tabs: [],
    active: 0
  })

  self.tabnew = (
    { title = '', doc = '', lang = 'markdown' } = {},
    options = { to: true, at: self.state.tabs.length } //  是否立即切换到新的标签页，标签插入位置
  ) => {
    let { to, at } = { to: true, at: self.state.tabs.length, ...options }

    self.state.tabs.splice(at, 0, {
      title,
      wait_save: false,
      _cm: {},
    })
    self.state.tabs[at]._cm_component =
      <CodeMirror
        self={self.state.tabs[at]._cm}
        doc={doc}
        lang={lang}
      />

    if (to) {
      self.state.active = at
    }

    self.flush()
    setTimeout(()=>{
try{
      self.state.tabs[at]._cm.editor.focus()
}catch(e){}
    },300)

  }

  self.get_editor = (n = self.state.active) =>
    self.state.tabs[n]._cm.editor

  self.tabnext = (n) => {
    if (typeof n != 'number') {
      n = self.state.active + 1
    }
    n = n < self.state.tabs.length ? n : 0
    self.state.active = n
    self.flush()
  }

  self.tabclose = (n = self.state.active) => {
    console.log('close: ' + n);
    console.log(self.state.tabs);
    self.state.tabs.splice(n, 1)
    self.tabnext()
    console.log(self.state.tabs);
    self.flush()
  }

  self.flush = () => flushSync(() => {
    self.setState({ ...self.state },()=>{
      console.log('callback');
    })
  });

  return (<>
    <div id='editor-ui' className="editor-ui flex flex-col h-full " >
      {true && <Tool onRun={onRun} onSave={onSave} self={self} />}
      {/* 标签栏 ( 多套层div防止overflow混乱 )*/}
      <div>
        <div className="editor-tabs flex overflow-auto  border-current" >
          {self.state.tabs.map((v, i) => (
            // 标签项目
            <div key={i} className={'flex px-4 btn '
              + (self.state.active == i ? 'active ' : '')
            }
              onClick={() => {
                self.state.active = i
                self.setState({ ...self.state })
              }}
            >
              <div className='grow inline-size-max'>{v.title || '[No Name]'}</div>
              <div className='w-4 text-right'>
                {self.state.tabs[i].wait_save && '*'}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 编辑视图 */}
      {self.state.tabs.map((v, i) => <div
        className={'grow overflow-y-hidden ' + (self.state.active == i ? 'block' : 'hidden')}>
        {v._cm_component}
      </div>)}
    </div>


  </>)
}


function Tool({ title = 'Edit', onSave, onRun, self }) {
  const [message, setMessage] = useState('')
  self.setMessage = setMessage

  let [timeid, setTimeid] = useState(null)
  useEffect(() => {
    clearTimeout(timeid)
    timeid = setTimeout(() => setMessage(''), 4000)
    setTimeid(timeid)
  }, [message])

  return (<div className='flex p-2 items-center'>

    <div tabindex='0' className='relative [&>.editor-popup]:hidden [&:focus>.editor-popup]:block'>
      <Icon alt='Menu' >
        {feather.icons['more-vertical'].toSvg({ width: 18, height: 18 })}
      </Icon>
      <div className='editor-popup absolute mt-2 z-50 min-w-[100px]'>
        {[
          {
            text: 'Tab new', click: () => {
              self.tabnew()
            }
          },

        ].map(({ text, click }, i) => (
          <div key={i}
            className='btn px-4 py-2 w-full text-left'
            onClick={click}>
            {text}
          </div>
        ))}
      </div>
    </div>
    <h5 className='grow m-0'>{message || title}</h5>

    <div className='space-x-2 flex'>
      <Icon alt='Redo'
        onClick={() => {
          commands.redo(self.get_editor())
        }}
      >{feather.icons['corner-up-right'].toSvg({ width: 18, height: 18 })}</Icon>
      <Icon alt='Undo'
        onClick={() => {
          commands.undo(self.get_editor())
        }}
      >
        {feather.icons['corner-up-left'].toSvg({ width: 18, height: 18 })}
      </Icon>
      <Icon alt='Save' onClick={onSave} >
        {feather.icons['save'].toSvg({ width: 18, height: 18 })}
      </Icon>
      <Icon alt='Run' onClick={onRun}>
        {feather.icons['play'].toSvg({ width: 18, height: 18 })}
      </Icon>
    </div>

  </div>)
}

function Icon({ className, children, ...props }) {
  return (<div
    className={'ibtn ' + className}
    dangerouslySetInnerHTML={{ __html: children }}
    {...props}
  ></div>)

}