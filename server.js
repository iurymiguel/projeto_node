var restify = require('restify');
var server = restify.createServer();
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

var toddyList = [{ id: 1, lote: '1A', conteudo: 200, validade: '25/09/2018' }, { id: 2, lote: '1B', conteudo: 100, validade: '30/09/2018' }];

function getToddys(req, res, next) {
    const id = req.params.id;
    let toddy;
    if (id) {
        toddy = toddyList.find((toddy) => toddy.id == id);
        if (!toddy) {
            toddy = 'Não encontrado, fera!';
        }
    } else {
        toddy = toddyList;
    }

    res.send(toddy)
    next();
}

function insertToddy(req, res, next) {
    toddyList.push(req.body);
    res.send(toddyList);
    next();
}

function updateToddy(req, res, next) {
    const body = req.body;
    toddyList.forEach((toddy) => {
        if(toddy.id == body.id){
            toddyList[toddyList.indexOf(toddy)] = body;
        }
    });
    res.send(toddyList);
    next();
}

function deleteToddy(req, res, next) {
    const id = req.body.id;
    toddyList.splice(toddyList.indexOf(toddyList.find((toddy) => toddy.id == id)), 1);
    res.send(toddyList);
    next();
}

server.get('/toddy/getToddy/:id', getToddys);
server.post('/toddy/insertToddy', insertToddy);
server.post('/toddy/updateToddy', updateToddy);
server.post('/toddy/deleteToddy', deleteToddy);

var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('%s listening at %s', server.name, server.url);
});