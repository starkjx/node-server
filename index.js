var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')


function staticRoot(staticPath, req, res){
  console.log(staticPath)
  
  console.log(req.url)
  var pathObj = url.parse(req.url, true)
  console.log(pathObj)
  
  
  if(pathObj.pathname === '/'){
    pathObj.pathname += 'test.html'
  }
  
  switch (pathObj.pathname) {
    case '/getWeather':
      res.end(JSON.stringify({city:'wuhan', weather:'sun'}))
      break;
    case '/user/123':
      res.end( fs.readFileSync(staticPath + '/user.html' ))
      break;
    default:
      res.end( fs.readFileSync(staticPath + pathObj.pathname))
  }
  

  // var filePath = path.join(staticPath, pathObj.pathname)
  
  // // var fileContent = fs.readFileSync(filePath,'binary')
  // // res.write(fileContent, 'binary')
  // // res.end()
  
  
  // fs.readFile(filePath, 'binary', function(err, fileContent){
  //   if(err){
  //     console.log('404')
  //     res.writeHead(404, 'not found')
  //     res.end('<h1>404 Not Found</h1>')
  //   }else{
  //     console.log('ok')
  //     res.writeHead(200, 'OK')
  //     res.write(fileContent, 'binary')
  //     res.end()      
  //   }
  // })
  

}

console.log(path.join(__dirname, 'sample'))
var server = http.createServer(function(req, res){
  staticRoot(path.join(__dirname, 'sample'), req, res)
})

server.listen(8080)
console.log('visit http://localhost:8080' )




// var http = require('http')
// var fs = require('fs')
// http.createServer(function(req, res){
//   switch (req.url){
//     case '/getWeather':
//       res.end(JSON.stringify({a:1, b:2}))
//       break;
//     case '/user/123':
//       res.end(fs.readFileSync(__dirname + '/sample/user.html'))
//       break;
//     default:
//       res.end(fs.readFileSync(__dirname + '/sample' + req.url))
//   }
// }).listen(8080)