const { request } = require("http");

function bodyParser (request, callback){
    let body = "";

    // QUANDO CHEGAR UMA INFORMAÇÃO 'data' AMARZENE DENTRO DE chunk
    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      
      // QUANDO RECEBER O ULTIMO PEDAÇO DA MENSAGEM TRANSFORME ESSA STRING EM OBJETO
      body = JSON.parse(body);
      request.body = body;
    
      callback();
    });
}

module.exports = bodyParser;