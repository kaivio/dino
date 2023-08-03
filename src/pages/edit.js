import React, { useState, useEffect } from 'react';

import CodeMirror, {EditTabs} from '@site/src/comp/cm6';


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
