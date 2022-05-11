const koa = require('koa')
const koaRouter = require('koa-router')

const app = new koa()
const router = new koaRouter()

router.get('home', '/', (context) => {
    context.body = "Hallo Welt vom koa server"
})

app.use(router.routes()).use(router.allowedMethods())// registering routes to the application

app.listen(2400, () => console.log('Server running at PORT 2400'))