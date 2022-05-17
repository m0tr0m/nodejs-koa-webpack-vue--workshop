import Koa from "koa"
import KoaRouter from "koa-router"
import axios from "axios";
import {Base64} from "js-base64";

const app = new Koa()
const router = new KoaRouter()
const username = 'romeo@nscale'
const password = 'romeo'
let cookie = null

router.get('home', '/', (context: Koa.Context) => {
    context.body = "Hallo Welt vom koa server"
})

let napplLogin = async (ctx: Koa.Context, next: () => Promise<any>) => {

    ctx.state.username = username
    ctx.state.password = password

    try {
        const response = await axios({
            url: 'http://localhost:8080/nscalealinst1/graphql',
            method: 'post',
            data: {
                query: `
                    query sessionInfo {
                        authenticationService {
                            login {
                                sessionPrincipalId
                                sessionPrincipal {
                                    userName
                                    domainName
                                }
                                sessionGroupIds
                                sessionDefaultPositionId
                                sessionPositionIds
                                serverVersion
                            }
                      }
                    }
                `,
            },
            headers: {
                Authorization: `Basic ${Base64.toBase64(`${username}:${password}`)}`,
            }
        })
        ctx.state.napplCookie = response.headers["set-cookie"][0]
        cookie = ctx.state.napplCookie
    } catch (e) {
        ctx.status = 501
        ctx.body = JSON.stringify(e, null, 4)
    }

    await next()
};

router.get('login', '/login', napplLogin, (ctx: Koa.Context) => {
    const {username, password, napplCookie} = ctx.state
    ctx.body = JSON.stringify({username, password, napplCookie}, null, 4)
})

router.get('logout', '/logout', async (ctx: Koa.Context, next: () => Promise<any>) => {

    ctx.state.username = null
    ctx.state.password = null

    try {
        if(!cookie) {
            ctx.body = 'Not logged in'
        } else {
            console.log(cookie)
            const response = await axios({
                url: 'http://localhost:8080/nscalealinst1/graphql',
                method: 'post',
                data: {
                    operationName: null,
                    query: `
                        mutation sessionLogout {
                            AuthenticationService_logout
                        }
                    `,
                },
                headers: {
                    Cookie: cookie,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            cookie = null
            ctx.body = JSON.stringify(response.data.data, null, 4)
        }
    } catch (e) {
        console.error('Error', e)
        ctx.status = e.response && e.response.status ? e.response.status : 501
        if(e.response) {
            ctx.body = JSON.stringify(e.response, null, 4)
        } else {
            ctx.body = e
        }
    }
})

app.use(router.routes()).use(router.allowedMethods())// registering routes to the application

app.listen(2400, () => console.log('Server running at PORT 2400'))