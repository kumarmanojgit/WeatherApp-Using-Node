const http=require('http');
const fs=require('fs');
var requests = require('requests');

const homeFile=fs.readFileSync('index.html','utf-8');

const server=http.createServer((req,res)=>{
  if(req.url=="/")
  {
    requests('https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=8403771d994146c2cf39b3b4aca49ae7')
    .on('data',  (chunk)=> {
      console.log(chunk)
    })
    .on('end', (err)=> {
      if (err) return console.log('connection closed due to errors', err);
     
      console.log('end');
    });
  }
});

server.listen(8000,"127.0.0.1");
