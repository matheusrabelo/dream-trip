const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const cors = require('@koa/cors');

const STATIC_PORT = process.env.STATIC_PORT || 3000;

const app = new Koa();

app.use(cors());
app.use(serve(path.join(__dirname, 'static')));

app.listen(STATIC_PORT, () => console.log(`listening on ${STATIC_PORT}`));
