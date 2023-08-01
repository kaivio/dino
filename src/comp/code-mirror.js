import React, { useState, useEffect } from 'react';

const cm_options = {
  tabSize: 2,
  lineWrapping: true,
  lineNumbers: true,
  styleActiveLine: true,
  theme:'solarized light' ,
  // theme:'gruvbox-dark',
}

export default function CodeMirrorcomponents({value='', mode, className, self={}, ...props }) {
  const id = Math.random()
  useEffect(() => {
    if (document.querySelector('html[data-theme=light]')) {
      // 
    }
    
    try{
      self.cm = CodeMirror(document.getElementById(id),{value, mode, ...cm_options} );
      self.doc = self.cm.doc
      // cm.on("cursorActivity", function() {
      //   editor.removeLineClass(hlLine);
      //   hlLine = editor.addLineClass(editor.getCursor().line, "background", "activeline");
      // });
    }catch(e){
      console.log(e);
    }
  }, [])
  return (<>
    <div id={id} className={className}></div>
  </>)
}
