import React, { useState, useEffect } from 'react';

const cm_options = {
  tabSize: 2,
  dragDrop: false,
  lineWrapping: true,
  lineNumbers: true,
  styleActiveLine: true,
  theme:'solarized light' ,
   // theme:'3024-day' ,
  // theme:'3024-night' ,
  // theme:'gruvbox-dark',
  readOnly:true 
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
