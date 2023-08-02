import React, { useState, useEffect } from 'react';

import CodeMirror from '@site/src/comp/cm6';


export default function Blank() {
  const files = [
    {
      title: "File 1.js",
      doc: 'function greet() {\n  console.log("Hello, world!");\n}',
      lang: "javascript"
    },
    {
      title: "File 2.cpp",
      doc:
        '#include <iostream>\n\nint main() {\n  std::cout << "Hello, world!" << std::endl;\n  return 0;\n}',
      lang: "cpp"
    },
    {
      title: "File 3.java",
      doc:
        'public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, world!"); \n  }\n}',
      lang: "java"
    }
  ];


  const ref = {}
  function name(params) {
    ref.tabnew({ title, doc, lang })
    ref.get_editor().state.doc
    ref.state.tabs[ref.state.active].wait_save = true
    ref.setState([...ref.state])

  }
  useEffect(() => {
    for (let f of files) {
      ref.tabnew(f, { to: false })
    }
    ref.tabnew({ title: 'snippets/default.json', lang: 'json' }, { to: false })

  }, [])

  return (<>
    {/* <EditGroup self={ref} files={files} /> */}
    <EditTabs self={ref} />

    <button onClick={() => {

      // 读取编辑器的内容
      let doc = ref.get_editor().state.doc.toString()

      let tab_size = 2
      let text = doc.replace(new RegExp(`^ {${tab_size}}`, 'gm'), '\t')
      let out = JSON.stringify({
        body: text.split('\n'),
        description: 'description'
      }, ' ', 2)

      // 写入编辑器的内容
      const tab = 3
      ref.get_editor(tab).dispatch({
        changes: {
          from: 0,
          to: ref.get_editor(tab).state.doc.length,
          insert: out
        }
      })
      ref.tabnext(tab)

    }}>生成 vs code 代码片段</button>
  </>)
}

function EditTabs({ self }) {
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
      // className={self.state.active == at ? 'block':'hidden'} 
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

  self.flush = () =>  self.setState({ ...self.state })

  return (<>
    {/* 标签栏 */}
    <div className="flex flex-col overflow-hidden h-96">
      <div className="flex">
        {self.state.tabs.map((v, i) => (
          <button key={i}
            className={"border-none "
              + (self.state.active == i ? "bg-slate-200" : "bg-transparent")
            }
            onClick={() => {
              self.state.active = i
              self.setState({ ...self.state })
            }}
          >
            {v.title}
          </button>
        ))}
      </div>
      {/* 编辑视图 */}
      {self.state.tabs.map((v, i) => <div
        className={'grow overflow-y-auto ' + (self.state.active == i ? 'block' : 'hidden')}>
        {v._cm_component}
      </div>)}
    </div>


  </>)
}


function EditGroup({ self = {}, files }) {

  //const [tabTitles, setTabTitles] = useState(files.map((v, i) => v.title))


  const tabTitles = []
  const tabContents = []
  const editors = []

  for (const i in files) {

    let f = files[i];
    tabTitles.push(
      <div>f.title</div>
    )
    tabContents.push(
      <CodeMirror key={i}
        doc={v.doc}
        lang={v.lang}
        onChange={(value, viewUpdate) => {
          // 标记未保存
          v.value = value
          tabTitles[i] = '*' + v.title
          setTabTitles([...tabTitles])
        }}
      />
    )

  }


  // 保存事件
  // 重新加载事件
  // 生成3个表示源代码文件对象，数据结构是 [{title，value, lang}] 
  return (<>
    <Tabs titles={tabTitles} contents={tabContents} contentClass={'h-96'} />
  </>)
}



function Tabs({ self = {}, titles, contents, contentClass, contentStyle }) {
  [self.activeTab, self.setActiveTab] = useState(0)

  return (<>
    <div className="flex flex-col">
      <div className="flex">
        {titles.map((v, i) => (
          <button key={i}
            className={"border-none "
              + (self.activeTab == i ? "bg-slate-200" : "bg-transparent")
            }
            onClick={() => self.setActiveTab(i)}
          >

            {v}
          </button>
        ))}
      </div>
    </div>

    {contents.map((v, i) => (
      <div key={i} className={(contentClass) + " "
        + (self.activeTab == i ? 'block' : 'hidden')}
        style={contentStyle}
      >
        {contents[i]}
      </div>
    ))}
  </>)

}

