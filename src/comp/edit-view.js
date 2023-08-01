import React, { useState, useEffect } from 'react';
import ReactJson from 'react-json-view'

import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { html } from "@codemirror/lang-html"
import { css } from "@codemirror/lang-css"
import { markdown } from "@codemirror/lang-markdown"
import { python } from "@codemirror/lang-python"
import { json } from "@codemirror/lang-json"

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

export default function EditView({ doc, lang, ...props }) {
  const id = Math.random()
  useEffect(() => {
    if (document.querySelector('html[data-theme=light]')) {
      theme.use = theme.light

    }
    let editor = new EditorView({
      doc,
      extensions: [
        basicSetup,
        EditorView.lineWrapping,
        // rosePineDawn
        // javascript({jsx: true}),
        theme.use,
        loadLanguage(lang) || loadLanguage()
      ],
      parent: document.getElementById(id),
    })

  }, [])
  return (<>
    <div id={id}></div>
    {/* <ReactJson src={{rosePineDawn}} /> */}
  </>)
}
