const http=require('http');
const fs=require('fs');
var requests = require('requests');

const homeFile=fs.readFileSync('index.html','utf-8');

const replaceVal=(tempVal,orgVal)=>{
  let temperature=tempVal.replace("{%tempval%}",orgVal.main.temp);
  temperature=temperature.replace("{%tempmin%}",orgVal.main.temp_min);
  temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max);
  temperature=temperature.replace("{%location%}",orgVal.name);
  temperature=temperature.replace("{%country%}",orgVal.sys.country);
  return temperature;
}

const server=http.createServer((req,res)=>{
  if(req.url=="/")
  {
    requests('https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=8403771d994146c2cf39b3b4aca49ae7')
    .on('data',  (chunk)=> {
      const objdata=JSON.parse( chunk);
      const arrData=[objdata];
      
      const realTimeData=arrData.map((val)=>replaceVal(homeFile,val)).join(""); 
      res.write(realTimeData);
      
      
    })
    .on('end', (err)=> {
      if (err) return console.log('connection closed due to errors', err);
     
      res.end();
    });
  }
});

server.listen(8000,"127.0.0.1");
