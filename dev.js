const { spawn } = require('child_process');

// 启动第一个子进程
const childProcess1 = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', [
  'run', 'start', '--',
  '--host', '0.0.0.0',
  '--port', '3001',
  '--no-open'
]);

// 绑定标准输出流和错误流
childProcess1.stdout.on('data', (data) => {
  console.log(`---  npm run start ---\n${data}`);
});

childProcess1.stderr.on('data', (data) => {
  console.error(`---  npm run start ---\n${data}`);
});

// 启动第二个子进程
const childProcess2 = spawn('node', ['server.js']);

// 绑定标准输出流和错误流
childProcess2.stdout.on('data', (data) => {
  console.log(`---  node server.js ---\n${data}`);
});

childProcess2.stderr.on('data', (data) => {
  console.error(`---  node server.js ---\n${data}`);
});

childProcess1.on('error', (err) => {
  console.error(`--- ERROR npm run start  ---\n${err.message}`);
  console.log(err)
});
childProcess2.on('error', (err) => {
  console.error(`--- ERROR node server.js  ---\n${err.message}`);
  console.log(err)

});


// 监听中断信号（如 Ctrl+C）
process.on('SIGINT', () => {
    // 结束所有子进程
    childProcess1.kill();
    childProcess2.kill();

    //process.kill(childProcess1.pid, 'SIGINT');
    // process.kill(childProcess2.pid, 'SIGINT');

    process.exit();
});
