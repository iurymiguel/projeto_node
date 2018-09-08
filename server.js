var restify = require('restify');
var server = restify.createServer();
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

var toddyList = [{ name: 'toddy 1999', val: 'R$ 500,00' }, { name: 'toddy 2000', val: 'R$ 400,00' }];

function getToddys(req, res, next) {
    const pos = req.params.pos;
    const toddy = (pos && pos >= 0 && pos < toddyList.length) ? toddyList[pos] : toddyList;
    res.send(toddy)
    next();
}

function insertToddy(req, res, next) {
    next();

}

function updateToddy(req, res, next) {
    next();
}

function deleteToddy(req, res, next) {
    next();
}

server.get('/toddy/getToddy/:pos', getToddys);
server.post('/toddy/insertToddy', insertToddy);

var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('%s listening at %s', server.name, server.url);
});