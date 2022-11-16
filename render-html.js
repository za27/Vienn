var http = require("http")
var url = require("url")
var fs = require("fs")
var qs = require("querystring")
const port =process.env.PORT || 3000

var renderinpo = fs.readFileSync("./pages/info.html");
var renderdaftar = fs.readFileSync("./pages/daftar.html");
var renderProfil = fs.readFileSync("./pages/profil.html");

function css(request, response) {
    if (request.url === "/style.css") {
        response.writeHead(200, { "Content-type": "text/css" });
        var fileContents = fs.readFileSync("./style.css", { encoding: "utf8" });
        response.write(fileContents);
        response.end();
    } 
}

var server = http.createServer(function(request,response){
    css(request, response);
    response.writeHead(200, { "Content-Type": "text/html" });
    var q = url.parse(request.url,true)
    if (q.pathname == "/" && request.method == "GET"){
        var keyword = q.query.keyword;
        if (keyword){
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("<h2 style='text-align: center;'>Pencarian</h2>");
            response.write("<p style='text-align: center;'>Anda Mencari : <b>" + keyword + "</b> </p>");
            response.write("<h3 style='text-align: center;'><b></b>Tidak ada Hasil ! Maaf Website ini masih dalam tahap pengembangan</b></h3>");
            response.end("<button><a href='/' align: 'center';>Kembali</a></button>");
            
            }
        else{
            fs.readFile("./pages/index.html",function(error,data){
                if (error){
                    response.writeHead(404,{"Conten-Type": "text/html"});
                    response.end("404 Not Found");
                }
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write(data)
            response.end();    
            });
        }
    }
    else if (request.url == '/info'){
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(renderinpo);
        response.end();
    }
    else if (request.url === '/daftar' && request.method ==="GET"){
            fs.readFile("./pages/daftar.html",(error,data)=>{
                if (error){
                    response.writeHead(404,{"Content-Type":"text/html"});
                    return response.end("404 Server Not Found");                
                }
                else{
                    response.writeHead(200, {"Content-Type":"text/html"});
                    response.write(data)
                    return response.end()
                }
            });
           
    }
    else if(q.pathname === "/daftar" && request.method==="GET"){
        var requesnama = q.query.nama;
        var requesttl = q.query.ttl;
        var requesjk = q.query.jk;
        var requesalamat = q.query.alamat;
        var requesemail = q.query.email;
        var requeshp = q.query.hp;
        if(requesnama){
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write("<h2>Hasil Pendaftaran</h2>");
            response.write("<p>Nama Lengkap  : "+requesnama+ "</p>");
            response.write("<p>Tanggal Lahir : "+requesttl+ "</p>");
            response.write("<p>Jenis Kelamin : "+requesjk+ "</p>");
            response.write("<p>Alamat        : "+requesalamat+ "</p>");
            response.write("<p>Email         : "+requesemail+ "</p>");
            response.write("<p>No Hp         : "+requeshp+ "</p>");
            response.write("<a href='/login'>Login Kah</a>")
            response.end();
        }
        else{
            fs.readFile("./pages/daftar.html",function(error,data){
                if (error){
                    response.writeHead(404,{"Conten-Type": "text/html"});
                    response.end("404 Not Found");
                }
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write("<h2>Gagal</h2>")
            response.write("<a href='/daftar'>Kembali?</a>")
            response.end();    
            });
        }
    }
    else if (request.url==="/login" && request.method === "GET"){
        fs.readFile("./pages/login.html",(error,data)=>{
            if (error){
                response.writeHead(404,{"Content-Type":"text/html"});
                return response.end("404 Server Not Found");                
            }
            else{
                response.writeHead(200, {"Content-Type":"text/html"});
                response.write(data)
                return response.end()
            }
        });
    }
    else if (request.url==="/login" && request.method === "POST"){
        var requestBody = "";
        request.on("data",function(data){
            requestBody += data;
        });
        request.on("end",function(){
            var formData = qs.parse(requestBody);
            if (formData.username === "ihza" && formData.password === "111"){
                response.writeHead(200,{"Content-Type":"text/html"});
                response.end(renderProfil);
                }
            else{
                response.writeHead(200,{"Content-Type":"text/html"});
                response.write("<h2>Login Gagal</h2>");
                response.write("<a href='/login'>Coba Kembali</a>");
                response.end();
            }
        });

    }
});


server.listen(port);
console.log("server Berjalan")
