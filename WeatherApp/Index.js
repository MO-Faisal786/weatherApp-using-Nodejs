
// https://api.openweathermap.org/data/2.5/weather?q=Moradabad&appid=fa3684081c887ecaf37a75d99585cdd3


const http = require('http');
const fs = require('fs');
const requests = require('requests');
const port = 3000;


const homeFile = fs.readFileSync('home.html', 'utf-8');
const replaceVal = (tempVal, originalVal) => {
    let temparature = tempVal.replace('{%tempVal%}', originalVal.main.temp/10);
    temparature = temparature.replace('{%tempMin%}', originalVal.main.temp_min/10);
    temparature = temparature.replace('{%tempMax%}', originalVal.main.temp_max/10);
    temparature = temparature.replace('{%location%}', originalVal.name);
    temparature = temparature.replace('{%country%}', originalVal.sys.country);
    temparature = temparature.replace('{%condition%}', originalVal.weather[0].main);
    return temparature;
}
const server = http.createServer((req, res) => {
    if(req.url = '/'){
        requests('https://api.openweathermap.org/data/2.5/weather?q=Moradabad&appid=fa3684081c887ecaf37a75d99585cdd3')
.on('data', (chunk) => {
    const objData = [JSON.parse(chunk)];
//   console.log(objData[0].main.temp);
    const realTimeData = objData.map((val) => replaceVal(homeFile, val)).join("");
    res.write(realTimeData);
    // console.log(realTimeData);
})
.on('end', (err) => {
  if (err) return console.log('connection closed due to errors', err);
 
  console.log('end');
});
    }
})

server.listen(port, '127.0.0.1', () => {
    console.log(`The server run at ${port}`);
});

