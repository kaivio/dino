const express = require('express');
const cors = require('cors')
const httpProxy = require('http-proxy');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const fs = require('fs-extra')
const path = require('path');

const app = express();
const proxy = httpProxy.createProxyServer();

app.use(cors())
app.use(morgan('dev',));
app.use(express.raw({
  inflate: true,
  limit: '1gb',
  type: () => true
}));


app.get('/api', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/ping', (req, res) => {
  res.send(new Date().toISOString())
})

process.send = process.send || function () { }
app.get('/api/restart', (req, res) => {
  process.send('restart')
  res.send('restart...')
})

// 读取文件内容
app.get('/api/open', (req, res) => {
  const filePath = req.query.file; // 文件路径

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('error: Failed to read file');
    }

    res.send(data);
  });
});

// 写入文件内容
app.put('/api/open', (req, res) => {
  const filePath = req.query.file; // 文件路径
  const content = req.body; // 要写入的内容
  console.log(req.headers);
  console.log(filePath);
  console.log(content);

  fs.ensureFileSync(filePath)
  fs.writeFile(filePath, content, 'utf-8', err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to write file' });
    }

    res.sendStatus(200);
  });
});


// 中间件：捕获所有未匹配路由并转发至另一台主机
app.use((req, res) => {
  proxy.web(req, res, { target: 'http://localhost:3001' });
});

// 监听代理服务器的错误事件
proxy.on('error', (err, req, res) => {
  let info = fs.readFileSync('tmp/dev.log', { encoding: 'utf-8' })
  res.status(502).send(render502(info));
});


// http 500
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});



app.listen(3000, () => {
  console.log('App is running on port 3000');
});


function render502(info) {
  let code = 502
  let title = '代理请求失败'
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>${code} ${title}</title>
      <style>
        h1, p {text-align: center}
        pre{overflow: auto}
      </style>
    </head>
    <body>
    <h1>${code}</h1>
    <p>${title}</p>
    <pre id="info"></pre>

    <script>
      var info = ${JSON.stringify(info)}
      document.getElementById('info').innerText = info
    </script>
    </body>
  </html>  
`
}
