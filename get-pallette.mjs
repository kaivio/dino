

export const darkSetting = {
  background: '#282828',
  foreground: '#ebdbb2',
  caret: '#ebdbb2',
  selection: '#bdae93',
  selectionMatch: '#bdae93',
  lineHighlight: '#3c3836',
  gutterBackground: '#282828',
  gutterForeground: '#7c6f64',
  fontFamily: 'var(--ifm-font-family-monospace)',

};

export const lightSetting = {
  background: '#fbf1c7',
  foreground: '#3c3836',
  caret: '#af3a03',
  selection: '#ebdbb2',
  selectionMatch: '#bdae93',
  lineHighlight: '#ebdbb2',
  gutterBackground: '#ebdbb2',
  gutterForeground: '#665c54',
  gutterBorder: 'transparent',
  fontFamily: 'var(--ifm-font-family-monospace)',

};

const darkStyle = [{ tag: "[t.keyword]", color: '#fb4934' },
{
  tag: "[t.name, t.deleted, t.character, t.propertyName, t.macroName]",
  color: '#8ec07c',
},
{ tag: "[t.variableName]", color: '#83a598' },
{ tag: "[t.function(t.variableName)]", color: '#b8bb26', fontStyle: 'bold' },
{ tag: "[t.labelName]", color: '#ebdbb2' },
{
  tag: "[t.color, t.constant(t.name), t.standard(t.name)]",
  color: '#d3869b',
},
{ tag: "[t.definition(t.name), t.separator]", color: '#ebdbb2' },
{ tag: "[t.brace]", color: '#ebdbb2' },
{
  tag: "[t.annotation]",
  color: '#fb4934d',
},
{
  tag: "[t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace]",
  color: '#d3869b',
},
{
  tag: "[t.typeName, t.className]",
  color: '#fabd2f',
},
{
  tag: "[t.operator, t.operatorKeyword]",
  color: '#fb4934',
},
{
  tag: "[t.tagName]",
  color: '#8ec07c',
  fontStyle: 'bold',
},
{
  tag: "[t.squareBracket]",
  color: '#fe8019',
},
{
  tag: "[t.angleBracket]",
  color: '#83a598',
},
{
  tag: "[t.attributeName]",
  color: '#8ec07c',
},
{
  tag: "[t.regexp]",
  color: '#8ec07c',
},
{
  tag: "[t.quote]",
  color: '#928374',
},
{ tag: "[t.string]", color: '#ebdbb2' },
{
  tag: "[t.link]",
  color: '#a89984',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
},
{
  tag: "[t.url, t.escape, t.special(t.string)]",
  color: '#d3869b',
},
{ tag: "[t.meta]", color: '#fabd2f' },
{ tag: "[t.comment]", color: '#928374', fontStyle: 'italic' },
{ tag: "[t.strong]", fontWeight: 'bold', color: '#fe8019' },
{ tag: "[t.emphasis]", fontStyle: 'italic', color: '#b8bb26' },
{ tag: "[t.strikethrough]", textDecoration: 'line-through' },
{ tag: "[t.heading]", fontWeight: 'bold', color: '#b8bb26' },
{ tag: "[t.heading1, t.heading2]", fontWeight: 'bold', color: '#b8bb26' },
{
  tag: "[t.heading3, t.heading4]",
  fontWeight: 'bold',
  color: '#fabd2f',
},
{
  tag: "[t.heading5, t.heading6]",
  color: '#fabd2f',
},
{ tag: "[t.atom, t.bool, t.special(t.variableName)]", color: '#d3869b' },
{
  tag: "[t.processingInstruction, t.inserted]",
  color: '#83a598',
},
{
  tag: "[t.contentSeparator]",
  color: '#fb4934',
},
{ tag: "[t.invalid]", color: '#fe8019', borderBottom: `1px dotted #fb4934d` },
]

const lightStyle = [{ tag: "[t.keyword]", color: '#9d0006' },
{
  tag: "[t.name, t.deleted, t.character, t.propertyName, t.macroName]",
  color: '#427b58',
},
{ tag: "[t.variableName]", color: '#076678' },
{ tag: "[t.function(t.variableName)]", color: '#79740e', fontStyle: 'bold' },
{ tag: "[t.labelName]", color: '#3c3836' },
{
  tag: "[t.color, t.constant(t.name), t.standard(t.name)]",
  color: '#8f3f71',
},
{ tag: "[t.definition(t.name), t.separator]", color: '#3c3836' },
{ tag: "[t.brace]", color: '#3c3836' },
{
  tag: "[t.annotation]",
  color: '#9d0006',
},
{
  tag: "[t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace]",
  color: '#8f3f71',
},
{
  tag: "[t.typeName, t.className]",
  color: '#b57614',
},
{
  tag: "[t.operator, t.operatorKeyword]",
  color: '#9d0006',
},
{
  tag: "[t.tagName]",
  color: '#427b58',
  fontStyle: 'bold',
},
{
  tag: "[t.squareBracket]",
  color: '#af3a03',
},
{
  tag: "[t.angleBracket]",
  color: '#076678',
},
{
  tag: "[t.attributeName]",
  color: '#427b58',
},
{
  tag: "[t.regexp]",
  color: '#427b58',
},
{
  tag: "[t.quote]",
  color: '#928374',
},
{ tag: "[t.string]", color: '#3c3836' },
{
  tag: "[t.link]",
  color: '#7c6f64',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
},
{
  tag: "[t.url, t.escape, t.special(t.string)]",
  color: '#8f3f71',
},
{ tag: "[t.meta]", color: '#b57614' },
{ tag: "[t.comment]", color: '#928374', fontStyle: 'italic' },
{ tag: "[t.strong]", fontWeight: 'bold', color: '#af3a03' },
{ tag: "[t.emphasis]", fontStyle: 'italic', color: '#79740e' },
{ tag: "[t.strikethrough]", textDecoration: 'line-through' },
{ tag: "[t.heading]", fontWeight: 'bold', color: '#79740e' },
{ tag: "[t.heading1, t.heading2]", fontWeight: 'bold', color: '#79740e' },
{
  tag: "[t.heading3, t.heading4]",
  fontWeight: 'bold',
  color: '#b57614',
},
{
  tag: "[t.heading5, t.heading6]",
  color: '#b57614',
},
{ tag: "[t.atom, t.bool, t.special(t.variableName)]", color: '#8f3f71' },
{
  tag: "[t.processingInstruction, t.inserted]",
  color: '#076678',
},
{
  tag: "[t.contentSeparator]",
  color: '#9d0006',
},
{ tag: "[t.invalid]", color: '#af3a03', borderBottom: `1px dotted #9d0006` },
]

/****************************************************** */

let dark = {}
let light = {}


function get_pallette(style, pallette) {
  for (let i in style) {
    let tag = style[i].tag
    let color = ''
    for (let k in style[i]) {
      if (k == 'tag') {
        continue
      }

      let s = style[i][k]
      let m = s.match(/#[\S]*/g)
      for (let mi in m || []) {
        let c = m[mi]

        if (pallette[c]) {
          pallette[c].tag.push(tag)
        } else {
          pallette[c] = {
            'var': '--cm-pallette-' + Object.keys(pallette).length,
            'tag': [tag]
          }
        }

        style[i][k] = style[i][k].replace(c, 'var(' + pallette[c].var+ ')') 
      }
    }
  }
}

function get_pallette_setting(setting, pallette) {
  for (let i in setting) {
    pallette[setting[i]] = {
      var: '--cm-pallette-' + i,
      tag: [i]
    }
    setting[i] = 'var(' + pallette[setting[i]].var + ')'
  }
}

function print_css(pallette) {
  let code = ':root {\n'
  for (let i in pallette) {
    code += `/**\n   * ${pallette[i].tag.join('\n   * ')} */\n  ${pallette[i].var}: ${i};\n\n`
  }
  code += '}'
  console.log(code);
}

function print_js(setting, style) {
  let code = ''

  code += 'const setting = {\n'
  for (let i in setting) {
    code += `  ${i}: '${setting[i]}',\n`
  }
  code += '}\n'

  code += 'const style = [\n'
  for (let s of style) {
    code += '  {\n'
    for (let i in s) {
      if (i == 'tag')
        code += `    ${i}: ${s[i]},\n`
      else
        code += `    ${i}: '${s[i]}',\n`

    }
    code += '  },\n'
    
  }
  code += ']\n'


  console.log(code);

}

function print_code() {
  let pallette = {}
  let pallette_setting = {}
  let style = darkStyle
  let setting = darkSetting
  get_pallette(style, pallette)
  get_pallette_setting(setting, pallette_setting)
  print_css(pallette);
  print_css(pallette_setting);
  // print_js(setting, style)
  // console.log(pallette);
}

print_code()
