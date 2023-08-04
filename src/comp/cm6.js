import React, { useState, useEffect } from 'react';
import feather from 'feather-icons';

import { EditorView, basicSetup } from "codemirror"
import { EditorSelection } from "@codemirror/state"

import * as commands from "@codemirror/commands"

import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';
import { duotoneLightInit, duotoneDarkInit, defaultSettingsDuotoneLight, defaultSettingsDuotoneDark } from '@uiw/codemirror-theme-duotone';

export const theme = {}
theme.lightOption = {
  settings: {
    ...defaultSettingsDuotoneLight,
    fontFamily: 'var(--ifm-font-family-monospace)',
    lineHighlight: '#e3dcce50', // active line 的背景位于 selection 上层
  }
}
theme.darkOption = {
  settings: {
    ...defaultSettingsDuotoneDark,
    fontFamily: 'var(--ifm-font-family-monospace)',
    foreground: '#b5ace1',
    selection: '#3c335b',
    lineHighlight: '#ffffff0f', // active line 的背景位于 selection 上层
    
  }
}

theme.light = duotoneLightInit(theme.lightOption)
theme.dark = duotoneDarkInit(theme.darkOption)

theme.use = theme.dark
theme.useSetting = theme.darkOption.settings

export default function CodeMirror({ doc, lang, className, self = {}, style_back_id, ...props }) {
  const id = Math.random()
  useEffect(() => {
    if (document.querySelector('html[data-theme=light]')) {
      theme.use = theme.light
      theme.useSetting = theme.lightOption.settings
    }
    const ui = document.getElementById(style_back_id || 'editor-ui')
    if (ui) ui.style = `
      --editor-ui-bg:${theme.useSetting.background};
      --editor-ui-fg:${theme.useSetting.foreground};
      --editor-ui-lh:${theme.useSetting.lineHighlight};
      --editor-ui-se:${theme.useSetting.selection};
      --editor-ui-cr:${theme.useSetting.caret};
    `

    let editor = new EditorView({
      doc: doc,
      extensions: [
        basicSetup,
        EditorView.lineWrapping,
        commands.history(),
        theme.use,
        loadLanguage(lang) || loadLanguage('markdown')
      ],
      parent: document.getElementById(id),
    })
    self.editor = editor
  }, [])
  return (<>
    <div id={id} className={"CodeMirror " + className}></div>
  </>)
}



export function EditTabs({ self }) {
  [self.state, self.setState] = useState({
    tabs: [],
    active: 0
  })

  self.tabnew = (
    { title = '[No Name]', doc = '', lang = 'markdown' },
    { to = true, at = self.state.tabs.length } //  是否立即切换到新的标签页，标签插入位置
  ) => {
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

  self.flush = () => self.setState({ ...self.state })

  return (<>
    <div id='editor-ui' className="flex flex-col  h-96 " >
      {true && <Tool self={self} />}
      {/* 标签栏 ( 多套层div防止overflow混乱 )*/}
      <div>
        <div className="flex overflow-auto  border-current" style={{
          background: 'var(--editor-ui-se)',
          color: 'var(--editor-ui-fg)'
        }}>
          {self.state.tabs.map((v, i) => (
            // 标签项目
            <div key={i} className='flex px-4 bottom'
              style={self.state.active == i ?
                { background: 'var(--editor-ui-bg)' } :
                {}
              }
              onClick={() => {
                self.state.active = i
                self.setState({ ...self.state })
              }}
            >
              <div className='grow inline-size-max'>{v.title}</div>
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

function Tool({ title = 'Edit', self }) {
  return (<div className='flex p-2 items-center' style={{
    background: 'var(--editor-ui-se)',
    color: 'var(--editor-ui-fg)'
  }}>
    <div>
      <Icon alt='Save'>{feather.icons['more-vertical'].toSvg({ width: 18, height: 18 })}</Icon>
      {/* <Icon alt='Save'>{feather.icons['edit-3'].toSvg({ width: 18, height: 18 })}</Icon> */}
    </div>
    <h5 className='grow m-0'>{title}</h5>
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
      <Icon alt='Save'>{feather.icons['save'].toSvg({ width: 18, height: 18 })}</Icon>
      <Icon alt='Run'>{feather.icons['play'].toSvg({ width: 18, height: 18 })}</Icon>
    </div>

  </div>)
}

function Icon({ alt, onClick, children, ...props }) {
  return (<div
    alt={alt}
    onClick={onClick}
    className='icon-button'
    dangerouslySetInnerHTML={{ __html: children }}
    {...props}
  ></div>)

}