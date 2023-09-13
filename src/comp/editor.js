import React, { useState, useEffect, useRef, useCallback } from 'react';
import { flushSync } from 'react-dom';
import feather from 'feather-icons';

import { EditorView, basicSetup } from "codemirror"
import { EditorSelection } from "@codemirror/state"

import * as commands from "@codemirror/commands"

import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';

import theme from "../lib/codemirror-theme"
import { recognizeLang } from '../lib/langs-extname'
import Button from './button'


export default function Editor({ className, tools, self = {}, ...props }) {
  const [active, setActive] = useState(0)
  const [tabLabels, setTabLabels] = useState([])

  const ref = useRef({})
  const editor_views_ref = useRef()
  useEffect(() => {
    self.current = ref.current
    const current = self.current

    current.tabs = []


    current.tabnew = ({ name = '', lang = 'textile', doc = '' } = {}, at = -1) => {
      // 添加一个 TabLabel
      console.log('tabnew');
      const id = makeid()

      flushSync(() => {
        setTabLabels((labels) => {
          return [...labels, {
            name,
            id,
          }]
        })
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

      editor_views_ref.current.appendChild(dom_tab)

      current.tabs.push({
        dom: dom_tab,
        editor: editor,
        id,
        name,
      })
    }

    current.tabnext = (n) => {
      console.log('tab next');
      current.tabs.map((t) => {
        t.dom.style.display = 'none'
      })

      let target_tab = current.tabs[0]
      let post_flushd = []
      flushSync(() => {
        setTabLabels((labels) => {
          try {
            let id = labels[n].id
            current.tabs.map((t) => {
              if (t.id == id) {
                target_tab = t
              }
            })

            setActive(n)

          } catch (e) {
            console.log(e);
          }
          return labels
        })

      });

      if (target_tab)
        target_tab.dom.style.display = 'block'
    }

    current.tabclose = (n = current.state.active, other = false) => {
      console.log('tab close');

      let ready_delete_tabs = []
      flushSync(() => {

        setTabLabels((labels) => {
          // 删除一个 TabLabel
          let deleted = labels.splice(n, 1)

          if (other) {
            // 删除的是其他 TabLabel
            let tmp = deleted
            deleted = labels
            labels = tmp
          }

          // 删除 tab editor dom
          deleted.map((label) => {
            let id = label.id
            let i = 0
            for (; i < current.tabs.length; i++) {
              if (current.tabs[i].id == id)
                // 将删除操作缓存，待退出react更新期间后执行
                ready_delete_tabs.push(current.tabs[i])
              break
            }

            // 将删除操作缓存，待退出react更新期间后执行
            //   ready_delete_tabs.push(current.tabs[i])
            //   post_flushd.push(function () {
            //       let tab = current.tabs.splice(i, 1)[0]
            //       console.log('正在关闭标签');
            //       console.log(tab);
            //       if (tab) {
            //         tab.editor = undefined
            //         tab.dom.parentNode.removeChild(tab.dom)
            //       }
            //     })


          })


          console.log(labels);
          return [...labels]
        })

      });

      ready_delete_tabs.map((tab) => {
        tab.editor = undefined
        tab.dom.parentNode.removeChild(tab.dom)
      })

      for (let i in current.tabs) {
        if (current.tabs[i] in ready_delete_tabs) {
          delete current.tabs[i]
        }
      }


      n = other ? 0 : n
      current.tabnext(n == current.state.tabLabels.length ? n - 1 : n)

    }

    current.get_tab = (n = current.state.active) => {
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
    <div id='editor-ui' className="editor-ui flex flex-col h-full overflow-hidden" >
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
      <div ref={editor_views_ref} id='editor_views' className='grow overflow-auto [&>.editor-tab-content]:h-full'>
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




function Tool({ title = 'Edit', actions = {}, menu = [], self, ...props }) {
  const [message, setMessage] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [saving, setSaving] = useState('wait')
  const handleMenuClick = (e) => {
    setMenuOpen(true)
    e.stopPropagation()
  }
  const handleWindowClick = (e) => {
    setMenuOpen(false)
  }

  useEffect(() => {
    self.current.setMessage = setMessage
    window.addEventListener('click', handleWindowClick)
    return () => {
      window.removeEventListener('click', handleWindowClick)
    }
  }, [])

  let timeid = useRef(null)
  useEffect(() => {

    clearTimeout(timeid.current)
    timeid.current = setTimeout(() => setMessage(''), 4000)
  }, [message])

  let menu_content = menu
  if (!props.hiddenTabControl) {
    menu_content = [
      ...menu_content,
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
          self.current.tabclose(self.current.state.active, true)
        }
      },

    ]
  }


  if (!props.hiddenSetting) {
    menu_content = [
      ...menu_content,
      {
        text: '-----',
      },
      {
        text: 'INFO', click: () => {
          // TODO: 
        }
      },
      {
        text: 'SETTING...', click: () => {
          // TODO: 
        }
      },
    ]
  }

  if (props.onClickExit) {
    menu_content.push({
      text: '---'
    })
    menu_content.push({
      text: 'EXIT', click: props.onClickExit
    })
  }


  return (<div>
    <div className={'editor-popup absolute z-50 min-w-[100px] ' + (menuOpen ? '' : 'hidden')}>
      {/* 菜单栏及项目 */}
      {menu_content.map(({ text, click }, i) => text.startsWith('--') ?
        <div key={i} style={{ borderTop: '0.5px solid', opacity: 0.5 }} /> : (
          <Button key={i}
            className='block px-4 py-2 !w-full text-left whitespace-nowrap rounded-none'
            onClick={click}>
            {text}
          </Button>
        ))}
    </div>


    <div className='flex p-2 items-center'>
      {/* 菜单开关 */}
      <Button alt='Menu' className='p-2' size='18' icon='edit'
        onClick={handleMenuClick}
      />


      <div className='grow m-0 truncate	'>{message || title}</div>

      <div className='space-x-2 flex'>
        <Button className='p-2' size='18' icon='corner-up-right'
          alt='Redo'
          onClick={() => {
            commands.redo(self.current.get_editor())
          }}
        />
        <Button className='p-2' size='18' icon='corner-up-left'
          alt='Undo'
          onClick={() => {
            commands.undo(self.current.get_editor())
          }}
        />

        {actions.save &&
          <Button className={'p-2 ' + (saving == 'saving' ?
            'animate-spin' : saving == 'wait' ? 'opacity-100 ' : 'opacity-50')}

            size='18' icon={{ saving: 'loader', wait: 'save', disabled: 'save', ok: 'check-circle', fail: 'alert-circle' }[saving]}
            alt='Save' onClick={async (e) => {
              if (saving == 'wait') {
                setSaving('saving')
                e.stopPropagation()

                let reset = () => {
                  // if setSaving in ['ok', 'fail']
                  setSaving('wait')
                  window.removeEventListener('click', reset)
                }

                try {
                  await actions.save(e)
                  setSaving('ok')
                } catch (error) {
                  setSaving('fail')
                } finally {
                  // 套个延时器防抖 ?
                  setTimeout(() => {
                    window.addEventListener('click', reset)
                  }, 500)
                }
              }


            }}
          />}
        {actions.run &&
          <Button className='p-2' size='18' icon={'play'}
            alt='Run' onClick={e => {
              console.log('// click play');
              actions.run(e)
            }}
          />}

      </div>

    </div></div>)
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

