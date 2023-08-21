import { tags as t } from '@lezer/highlight';
import { createTheme, CreateThemeOptions } from '@uiw/codemirror-themes';


const setting = {
  background: 'var(--gruvbox-mode-bg-0)',
  foreground: 'var(--gruvbox-mode-fg-1)',
  caret: 'var(--gruvbox-mode-fg-0)',
  selection: 'var(--gruvbox-mode-bg-2)',
  selectionMatch: 'var(--gruvbox-mode-2)',
  lineHighlight: 'var(--gruvbox-mode-lh)',
  gutterBackground: 'var(--gruvbox-mode-bg-0)',
  gutterForeground: 'var(--gruvbox-mode-bg-3)',
  fontFamily: 'var(--gruvbox-mode-fontFamily)',
}
const style = [
  {
    tag: [t.keyword],
    color: 'var(--gruvbox-mode-red)',
    fontWeight: 'bold',
  },

  {
    tag: [t.regexp,t.name, t.character, t.macroName,t.atom, t.bool, t.special(t.variableName)],
    color: 'var(--gruvbox-mode-orange)',
  },
  {
    tag: [t.typeName, t.className],
    color: 'var(--gruvbox-mode-yellow)',
    fontWeight: 'bold',

  },
  {
    tag: [t.character, t.propertyName, t.macroName],
    color: 'var(--gruvbox-mode-blue)',
  },
  {
    tag: [t.string],
    color: 'var(--gruvbox-mode-green)',
  },
  {
    tag: [t.number],
    color: 'var(--gruvbox-mode-purple)',
    fontStyle: 'italic',

  },
  {
    tag: [t.variableName],
    color: 'var(--gruvbox-mode-fg-0)',
  },
  {
    tag: [t.function(t.variableName)],
    color: 'var(--gruvbox-mode-aqua)',
    fontWeight: 'bold',
  },
  {
    tag: [t.labelName],
    color: 'var(--gruvbox-mode-blue)',
  },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: 'var(--gruvbox-mode-green)',
  },
  {
    tag: [t.definition(t.name), t.separator, t.contentSeparator],
    color: 'var(--gruvbox-mode-gray)',
  },
  {
    tag: [t.operator, t.operatorKeyword,t.brace, t.squareBracket, t.angleBracket],
    color: 'var(--gruvbox-mode-gray)',
  },
  {
    tag: [t.annotation],
    color: 'var(--gruvbox-mode-blue)',
  },

  {
    tag: [t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: 'var(--gruvbox-mode-purple)',
    fontStyle: 'italic',
  },

  {
    tag: [t.tagName, t.attributeName],
    color: 'var(--gruvbox-mode-aqua)',
  },

  // ------------------------------------
  {
    tag: [t.quote],
    color: 'var(--gruvbox-mode-green)',
  },

  {
    tag: [t.link],
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
  },
  {
    tag: [t.url, t.escape, t.special(t.string)],
    color: 'var(--gruvbox-mode-orange)',
  },
  {
    tag: [t.meta],
    color: 'var(--gruvbox-mode-fg-2)',
  },
  {
    tag: [t.comment],
    color: 'var(--gruvbox-mode-fg-4)',
    fontStyle: 'italic',
  },
  {
    tag: [t.strong],
    fontWeight: 'bold',
  },
  {
    tag: [t.emphasis],
    fontStyle: 'italic',
  },
  {
    tag: [t.deleted],
    color: 'var(--gruvbox-mode-gray)'
  },
  {
    tag: [t.strikethrough],
    textDecoration: 'line-through',
  },
  {
    tag: [t.heading],
    fontWeight: 'bold',
    color: 'var(--gruvbox-mode-yellow)',
  },
  {
    tag: [t.heading1, t.heading2],
    fontWeight: 'bold',
    color: 'var(--gruvbox-mode-yellow)',
  },
  {
    tag: [t.heading3, t.heading4],
    color: 'var(--gruvbox-mode-yellow)',
  },
  {
    tag: [t.heading5, t.heading6],
    color: 'var(--gruvbox-mode-yellow)',
  },

  {
    tag: [t.processingInstruction, t.inserted],
    color: 'var(--inserted)',
  },
  {
    tag: [t.invalid],
    borderBottom: '1px dotted var(--gruvbox-mode-6)',
  },
]


export default (options) => {
  const { theme = 'light', settings = {}, styles = [] } = options || {};
  return createTheme({
    theme: theme,
    settings: {
      ...setting,
      ...settings,
    },
    styles: [
      ...style,
      ...styles,
    ],
  });
};
