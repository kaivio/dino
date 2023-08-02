import React, { useState, useEffect } from 'react';

import CodeMirror from '@site/src/comp/cm6';


export default function Blank() {
  let doc = 'function greet() {\n  console.log("Hello, world!");\n}'
  let lang = 'javascript'
  const props = { doc, lang }

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


  //const [output,setOutpot] = useState('')
  const buf1 = {}
  const buf2 = {}
  return (<>
    <CodeMirror {...props} self={buf1} className="h-48" />
    <div className='flex p-4'>
      <div className='grow'>读写测试</div>
      <button onClick={() => {
        // 读取编辑器的内容
        let doc = buf1.editor.state.doc.toString()

        let tab_size = 2
        let text = doc.replace(new RegExp(`^ {${tab_size}}`, 'gm'), '\t')
        let out = JSON.stringify({
          body: text.split('\n'),
          description: 'description'
        }, ' ', 2)

        //buf2.doc.setValue()
        console.log(buf2.editor);
        buf2.editor.dispatch({
          changes: {
            from: 0,
            to: buf2.editor.state.doc.length,
            insert: out
          }
        })
      }}>生成 vs code 代码片段</button>
    </div>
    <CodeMirror doc='{}' lang='json' self={buf2} />

    <h3 className='m-6'>标签页 demo </h3>
    <EditGroup files={files} />
    <hr className='m-12' />
  </>)
}




function EditGroup({ files }) {

  const [tabTitles, setTabTitles] = useState(files.map((v, i) => v.title))


  const tabContents = files.map((v, i) => (
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
  ))
  // 保存事件
  // 重新加载事件
  // 生成3个表示源代码文件对象，数据结构是 [{title，value, lang}] 
  return (<>
    <Tabs titles={tabTitles} contents={tabContents} contentClass={'h-96'} />
  </>)
}



function Tabs({ titles, contents , contentClass , contentStyle}) {
  const [activeTab, setActiveTab] = useState(0)

  return (<>
    <div className="flex flex-col">
      <div className="flex">
        {titles.map((v, i) => (
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

    {contents.map((v, i) => (
      <div key={i} className={(contentClass) +" "
        + (activeTab == i ? 'block' : 'hidden')}
        style={contentStyle}
      >
        {contents[i]}
      </div>
    ))}
  </>)

}

