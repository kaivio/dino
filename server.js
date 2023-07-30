
const express = require('express');
const httpProxy = require('http-proxy');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');


const app = express();
const proxy = httpProxy.createProxyServer();

app.use(morgan('dev'));

app.get('/api', (req, res) => {
  res.send('Hello World!')
})


// 读取文件内容
app.get('/api/file/read', (req, res) => {
    const filePath = req.query.path; // 文件路径

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('error: Failed to read file');
        }

        res.send(data);
    });
});

// 写入文件内容
app.post('/api/file/write', (req, res) => {
    const filePath = req.query.path; // 文件路径
    const content = req.body; // 要写入的内容

    fs.writeFile(filePath, content, 'utf-8', err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to write file' });
        }

        res.sendStatus(200);
    });
});

// 遍历文件夹并返回所有子项（包括子目录和文件）
app.get('/api/folder/traverse', (req, res) => {
    const folderPath = req.query.path; // 文件夹路径

    fs.readdir(folderPath, { withFileTypes: true }, (err, items) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to traverse folder' });
        }

        const result = items.map(item => {
            return {
                name: item.name,
                isDirectory: item.isDirectory(),
                fullPath: path.join(folderPath, item.name)
            };
        });

        res.json(result);
    });
});

// 获取文件信息
app.get('/api/file/info', (req, res) => {
    const filePath = req.query.path; // 文件路径

    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to get file info' });
        }

        const fileInfo = {
            sizeInBytes: stats.size,
            createdAt: stats.birthtime,
            modifiedAt: stats.mtime
        };

        res.json(fileInfo);
    });
});



// 中间件：捕获所有未匹配路由并转发至另一台主机
app.use((req, res) => {
  proxy.web(req, res, { target: 'http://localhost:3001' });
});

// 监听代理服务器的错误事件
proxy.on('error', (err, req, res) => {
  console.error('代理请求失败:', err);

  // 返回自定义的错误响应给客户端
  res.status(500).send('代理请求失败');
});




app.use((err, req, res, next) => {
  // 处理错误逻辑
  console.error(err); // 打印错误信息

  // 根据需要发送合适的响应给客户端
  res.status(500).json({ error: 'Internal Server Error' });
});

// 启动应用监听指定端口号
app.listen(3000, () => {
  console.log('App is running on port 3000');
});
