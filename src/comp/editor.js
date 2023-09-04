import React, { useState, useEffect, useRef, useCallback } from 'react';
import { flushSync } from 'react-dom';
import feather from 'feather-icons';

import { EditorView, basicSetup } from "codemirror"
import { EditorSelection } from "@codemirror/state"

import * as commands from "@codemirror/commands"

import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';

import theme from "../lib/codemirror-theme"
import { recognizeLang } from '../lib/langs-extname'

export default function Edit({ className, tools, self = {}, ...props }) {
  const [active, setActive] = useState(0)
  const [tabLabels, setTabLabels] = useState([])

  const ref = useRef({})
  useEffect(() => {
    self.current = ref.current
    const current = self.current

    current.tabs = []

    // current.flush = (newState = {}) => {
    //   flushSync(() =>
    //     setState((state) => { return { ...state, ...newState } })
    //   )
    // }

    current.tabnew = ({ name = '', lang = 'textile', doc = '' } = {}, at = -1) => {
      // 添加一个 TabLabel
      // console.log(lang);
      // console.log(loadLanguage(lang));

      const id = makeid()
      setTabLabels((labels) => {
        return [...labels, {
          name,
          id,
        }]
      })

      // 生成编辑器视图
      const dom_tab = document.createElement('div')
      dom_tab.className = 'editor-tab-content'
      dom_tab.style.display = 'none'
      let editor = new EditorView({
        doc: doc,
        extensions: [
          basicSetup,
          EditorView.lineWrapping,
          theme(),
          loadLanguage(recognizeLang(lang)) || loadLanguage('textile')
        ],
        parent: dom_tab,
      })

      document.getElementById('editor_views').appendChild(dom_tab)

      current.tabs.push({
        dom: dom_tab,
        editor: editor,
        id,
        name,
      })
    }

    current.tabnext = (n) => {
      setTabLabels((labels) => {
        try {
          let id = labels[n].id
          current.tabs.map
          current.tabs.map((t) => {
            t.dom.style.display = 'none'
          })
          current.tabs.map((t) => {
            if (t.id == id) {
              t.dom.style.display = 'block'
              t.editor.focus()
            }
          })

          setActive(n)

        } catch (e) {
          console.log(e);
        }
        return labels
      })
    }

    current.tabclose = (n = current.state.active) => {
      // 删除一个 TabLabel
      setTabLabels((labels) => {
        labels.splice(n, 1).map((label) => {
          // 删除 dom
          let id = label.id
          let i = 0
          for (; i < current.tabs.length; i++) {
            if (current.tabs[i].id == id)
              break
          }
          let tab = current.tabs.splice(i, 1)[0]
          tab.editor = undefined
          tab.dom.parentNode.removeChild(tab.dom)

          current.tabnext(n == labels.length ? n - 1 : n)

        })

        return [...labels]
      })

    }

    current.get_tab =  (n = current.state.active) => {
      let id = ref.current.state.tabLabels[n].id
      for (let i in current.tabs) {
        if (ref.current.tabs[i].id == id)
          return ref.current.tabs[i]
      }
      return ref.current.tabs[0]
    }

    current.get_editor = (n = current.state.active) => {
      return current.get_tab(n).editor
    }

  }, [])

  useEffect(() => {
    ref.current.state = { active, tabLabels }
    // console.log(active, tabLabels);

  })

  return (<>
    <div id='editor-ui' className="editor-ui flex flex-col h-full " >
      <Tool self={ref} {...tools} />
      {/* 标签栏 ( 多套层div防止overflow混乱 )*/}
      <div>
        <div className="editor-tabs flex overflow-auto  border-current" >
          {tabLabels.map((v, i) => (
            // 标签项目
            <TabLable key={i}
              name={v.name}
              active={active}
              index={i}
              tabnext={ref.current.tabnext}
            />
          ))}
        </div>
      </div>

      {/* 编辑视图 */}
      <div id='editor_views' className='grow [&>.editor-tab-content]:h-full'>
      </div>
    </div>
  </>)
}

function TabLable({ name, active, index, tabnext, ...props }) {
  let cls = 'flex px-4 btn whitespace-nowrap '
  if (active == index)
    cls += ' active'
  return (<>
    <Btn className={cls}
      onClick={() => {
        tabnext(index)
      }}
    >{name || '[No Name]'}</Btn>
  </>)
}




function Tool({ title = 'Edit', actions={}, self }) {
  const [message, setMessage] = useState('')

  useEffect(() => {
    self.current.setMessage = setMessage
  }, [])

  let timeid = useRef(null)
  useEffect(() => {

    clearTimeout(timeid.current)
    timeid.current = setTimeout(() => setMessage(''), 4000)
  }, [message])

  const menu_content = [
    {
      text: 'NEW', click: () => {
        self.current.tabnew({
        })
        self.current.tabnext(self.current.state.tabLabels.length)
      }
    },
    {
      text: 'CLOSE', click: () => {
        self.current.tabclose()
      }
    },
    {
      text: 'CLOSE OTHER', click: () => {
        self.current.tabclose()
      }
    },
    {
      text: '--',
    },
    {
      text: 'HELP', click: () => {
        //
      }
    },
  ]

  return (<div className='flex p-2 items-center'>

    <button id="menu-label" className='no-btn relative [&>.editor-popup]:hidden [&:focus>.editor-popup]:block'>
      <Icon alt='Menu' >
        {feather.icons['more-vertical'].toSvg({ width: 18, height: 18 })}
      </Icon>
      <div className='editor-popup absolute z-50 min-w-[100px]'>
        {menu_content.map(({ text, click }, i) => text == '--' ?
          <div key={i} style={{ borderTop: '0.5px solid', opacity: 0.5 }} /> : (
            <div key={i}
              className='btn px-4 py-2 w-full text-left whitespace-nowrap '
              onClick={click}>
              {text}
            </div>
          ))}
      </div>
    </button>
    <label htmlFor='menu-label' className='grow m-0 truncate	'>{message || title}</label>

    <div className='space-x-2 flex'>
      <Icon alt='Redo'
        onClick={() => {
          commands.redo(self.current.get_editor())
        }}
      >{feather.icons['corner-up-right'].toSvg({ width: 18, height: 18 })}</Icon>
      <Icon alt='Undo'
        onClick={() => {
          commands.undo(self.current.get_editor())
        }}
      >
        {feather.icons['corner-up-left'].toSvg({ width: 18, height: 18 })}
      </Icon>
      <Icon alt='Save' onClick={actions.save} >
        {feather.icons['save'].toSvg({ width: 18, height: 18 })}
      </Icon>
      <Icon alt='Run' onClick={actions.run}>
        {feather.icons['play'].toSvg({ width: 18, height: 18 })}
      </Icon>
    </div>

  </div>)
}


function Btn({ className, ...props }) {
  return (<div
    className={'btn ' + className}
    {...props}
  ></div>)
}

function Icon({ className, children, ...props }) {
  return (<div
    className={'ibtn ' + className}
    dangerouslySetInnerHTML={{ __html: children }}
    {...props}
  ></div>)

}


const makeid = function () { let i = 0; return () => 'SEQ_ID_' + i++ }()

