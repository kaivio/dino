const { spawn, fork } = require('child_process');
const fs = require('fs');

const logs = fs.createWriteStream('tmp/dev.log',{flags:'a'})
/**
 * 
 * @returns {childProcess}
 */
function my_spawn({ title = '', run = 'echo', args = [] }) {
  title = title || run
  let cp = spawn(run, args)
  let pid = cp.pid

  cp.stdout.on('data', (data) => {
    logs.write(data)
    console.log(`# ${title} - [${pid}] \n${data}`);
  });
  cp.stderr.on('data', (data) => {
    logs.write(data)
    console.log(`# ${title} - [${pid}] \n${data}`);
  });

  return cp
}


function start(run_cp1 = true) {
  let cp1, cp2

  if (run_cp1)
    cp1 = my_spawn({
      title: 'DEV SERVER',
      run: /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
      args: [
        'run', 'start', '--',
        '--host', '0.0.0.0',
        '--port', '3001',
        '--no-open'
      ]
    })

  cp2 = fork('server.js')
  // cp2 = my_spawn({
  //   title: 'EXPRESS APP',
  //   run: 'node',
  //   args: [
  //     'server.js'
  //   ]
  // })


  function close() {
    run_cp1 && cp1.kill()
    cp2.kill()
    //process.kill(cp.pid, 'SIGINT');
    //process.kill(cp.pid, 'SIGINT');
  }
  function restart(run_cp1) {
    close()
    start(run_cp1)
  }

  cp2.on('message', (msg) => {
    console.log(msg);
    if (msg == 'restart') {
      restart(run_cp1)
    }
  })

  return { close, restart }
}

cp = start()
console.log('startd');

process.on('SIGINT', () => {
  cp.close()
  process.exit();
});


