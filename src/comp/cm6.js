import React, { useState, useEffect } from 'react';
import { EditorView, basicSetup } from "codemirror"

import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';
import { duotoneLightInit, duotoneDarkInit } from '@uiw/codemirror-theme-duotone';

const themeOptions = {
  settings: {
    fontFamily: 'var(--ifm-font-family-monospace)',
  }
}

const theme = {
  light: duotoneLightInit(themeOptions),
  dark: duotoneDarkInit(themeOptions),
}
theme.use = theme.dark

export default function CodeMirror({doc, lang, className, self={}, ...props }) {
  const id = Math.random()
  useEffect(() => {
    if (document.querySelector('html[data-theme=light]')) {
      theme.use = theme.light
    }
    let editor = new EditorView({
      doc:doc,
      extensions: [
        basicSetup,
        EditorView.lineWrapping,
        theme.use,
        loadLanguage(lang) || loadLanguage('markdown')
      ],
      parent: document.getElementById(id),
    })
    self.editor = editor
  }, [])
  return (<>
    <div id={id} className={"CodeMirror "+className}></div>
  </>)
}
