import Koa from "koa"
import KoaRouter from "koa-router"
import axios, {AxiosError} from "axios";
import {Base64} from "js-base64";

const app = new Koa()
const router = new KoaRouter()
let cookie = null

router.post('login', '/login', async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
        const password = !ctx.query.password ? '' : ctx.query.password
        // Try to request login cookie with graphql
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
                Authorization: `Basic ${Base64.toBase64(`${ctx.query.username}:${password}`)}`,
            }
        })

        cookie = response.headers["set-cookie"][0]

        const loginResponseData = {
            username: ctx.query.username,
            password: ctx.query.password,
            napplCookie: cookie,
            'nscale Application Layer response data': response.data.data
        };

        ctx.body = JSON.stringify(loginResponseData, null, 4)
    } catch (e) {
        const status = e.response && e.response.status ? e.response.status : 500
        const message = e.response ? e.response.message : 'Unknown error occurred'
        ctx.throw(status, message)
    }
})

router.get('logout', '/logout', async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
        if(!cookie) {
            ctx.body = 'Not logged in'
        } else {
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
        const status = e.response && e.response.status ? e.response.status : 500
        const message = e.response ? e.response.message : 'Unknown error occurred'
        ctx.throw(status, message)
    }
})

app.use(router.routes()).use(router.allowedMethods())// registering routes to the application

app.listen(2400, () => console.log('Server running at PORT 2400'))