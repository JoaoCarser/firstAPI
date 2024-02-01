// IMPORTANDO MÓDULOS
const http = require("http");
const {URL} = require('url');

const routes = require("./routes");

// CRIANDO SERVIDOR
const server = http.createServer((request, response) => {
  
  // VISUALIZAR URL DE FORMA DESESTRUTURADA
  // 'TRUE' CONVERTE QUERY DE STRING PARA OBJETO
  const parsedUrl = new URL(`http://localhost:3000/${request.url}`);

  console.log("--------------------------------------------------");
  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);
  console.log("--------------------------------------------------");
  
  // VERIFICA SE HÁ ROTA
  const route = routes.find(
    (routeObj) =>
      routeObj.endpoint === parsedUrl.pathname && routeObj.method === request.method
  );

  // SE HOUVER ROTA EXECUTE O HANDLER QUE EQUIVALE AO REQUEST, RESPONSE
  if (route) {

    // ESSE REQUEST ESTÁ VINDO DE USERCONTROLLER
    // Object.fromEntries CONVERTE O ITERABLE EM OBJETO VÁLIDO JAVASCRIPT 
    request.query = Object.fromEntries(parsedUrl.searchParams);
    route.handler(request, response);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end(`Cannot ${request.method}  ${parsedUrl.pathname}`);
  }
});

// INDICA A PORTA QUE O SERVIDOR SERÁ INICIALIZADO
server.listen(3000, () => {
  console.log("🔥 Server started at http://localhost:3000");
});
