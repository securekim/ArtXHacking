var express     = require('express'),
    app         = express();
    bodyParser = require ("body-parser")
    const server    = require('http').createServer(app);
const io        = require('socket.io')(server);

const exec = require('child_process').exec;

const isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
	console.log("isRunning : "+platform);
	cmd = `pgrep ${query}`;
    /*switch (platform) {
        case 'win32' : cmd = `tasklist`; break;
        case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
        case 'linux' : cmd = `pgrep ${query}`; break;
        default: break;
    }*/
    exec(cmd, (err, stdout, stderr) => {
		console.log(stdout);
        cb(stdout);
    });
}


//web 폴더 밑에 있는 파일들을 요청이 있을때 접근 가능하도록 합니다.
app.use(express.static(__dirname + '/web')); 
//app.use(bodyParser.json());
 
// 유저가 root 를 요청 했을 때, index.html 파일을 전송합니다.
app.get('/hack', function(req, res) {
    res.sendfile('web/4444_signed.apk');
});

app.get('/', function(req,res){
    res.sendfile('web/index.html');
});
 
app.get('/isOn', function(req,res){
	isRunning('ruby', (status) => {
		res.send(status);
	})
});
 
app.get('/powerOn', function(req,res){
	exec(`killall ruby`, (err, stdout, stderr) => {
		console.log(stdout);
		if(stdout ="") log = "Shutdown Process is stopped."
		else log = stdout;
		io.emit('log',log);
    });
	res.send(200);
});
 
app.get('/powerOff', function(req,res){
	var child = require('child_process').execFile('shell/remote_shutdown.sh'); 
	// use event hooks to provide a callback to execute when data are available: 
	child.stdout.on('data', function(data) {
		console.log(data.toString()); 
		io.emit('log',data.toString());
	});
	res.send(200);
});
 
//다른 경로를 요청했을때, 실제 그 경로에 있는 파일을 전달합니다.
/*app.get('/*', function(req, res) { 
 
 res.sendfile(req.url,function(err){
  console.log(err);
  res.send(403, '잘못된 접근입니다.');
 });
});
 */


io.on('connection', (socket) => {
	console.log();
	
});


server.listen(80); //1024 이하의 포트는 특정 cap 권한이 필요합니다.


///////////////////////////////////////////////////////////////////
//
//
//
//
//
