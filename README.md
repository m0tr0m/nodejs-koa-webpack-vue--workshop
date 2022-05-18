# Willkommen
In diesem Turorial implementierst du ein nodejs-Backend "from Scratch". Du verwendest das Framework koajs um REST-Schnittstellen zu implementieren, welche per GraphQL-Schnittstelle des nscale Application Layer die An- und Abmeldung ermöglichen.

Außerdem setzt du mit Hilfe von nodejs und webpack ein Frontend-Projekt auf (ebenfalls "from Scratch"), welches das Javascript-Framework vuejs nutzt, um dem Anwender ein Userinterface bereitzustellen. Um das Ganze abzurunden, wirst du sowohl für das Backend, als auch für das Frontend, ein kleinwenig Typescript verwenden. Vor allem aber wirst du Javascript, HTML und CSS verwenden.

---

## Optionale Hausaufgaben bevor es los geht
Schaue dir dieses Video an, wenn du vorab die Javascript-Basics auffrischen/kennenlernen möchtest.<br>
[![Javascript](https://img.youtube.com/vi/W6NZfCO5SIk/0.jpg)](https://www.youtube.com/watch?v=W6NZfCO5SIk)

#### Für einen Einstieg in nodejs empfehle ich dieses Video.<br>
[![nodejs](https://img.youtube.com/vi/TlB_eWDSMt4/0.jpg)](https://www.youtube.com/watch?v=TlB_eWDSMt4)

#### Um das koajs-Framwork besser einordnen zu können, empfehle ich im ersten Schritt ein bisschen ins Thema nodejs-Framework [express-js](https://expressjs.com/) einzusteigen. Dazu habe ich natürlich auch wieder eine Empfehlung.<br>
[![express](https://img.youtube.com/vi/pKd0Rpw7O48/0.jpg)](https://www.youtube.com/watch?v=pKd0Rpw7O48)

#### Nun gibt das folgende Video, um etwas über das kosjs-Framework zu erfahren.<br>
[![koajs](https://img.youtube.com/vi/z84uTk5zmak/0.jpg)](https://www.youtube.com/watch?v=z84uTk5zmak)

#### Und zu guter Letzt noch ein Video zum Thema Typescript.<br>
[![Typescript](https://img.youtube.com/vi/BCg4U1FzODs/0.jpg)](https://www.youtube.com/watch?v=BCg4U1FzODs)

---

## Was brauche ich?
* Eine aktuelle nodejs-Installation
* Intellij, Webstorm oder VS Code
* Eine Internetverbindung

## Los gehts
1. Erzeuge ein neues Verzeichnis `myapp` an deinem Lieblingsplatz für neue Projekte.
```
mkdir myapp
```

2. Geh in das zuvor angelegte Verzeichnis und lege darin ein weiteres Verzeichnis `myapp\backend` an.
```
cd myapp
mkdir backend
```

3. In dem Verzeichnis `myapp\backend` führst du den nodejs-befehl `npm init -y` aus, um dein Backend-Projekt zu initialisieren. 
Das `-y` sorgt dafür, dass automatisch Standardwerte für die erzeugte `package.json` übernommen werden.
```
npm init -y
```

4. Das Resultat sollten zwei Dateien sein:
* `myapp\backend\package.json`
* `myapp\backend\package-lock.json`

5. Jetzt installierst du die Pakete `nodemon`, `typescript`, `ts-node`, `koa` und `koa-router` wie folgt. `nodemon` ist ein Tool, 
was uns "out-of-the-box" hot reloading beschert, wenn wir Projekt-Dateien verändern. Das heißt, man muss den Server nicht 
neustarten damit Änderungen sich auswirken.
```
npm i nodemon typescript ts-node koa koa-router
```

6. Jetzt hinterlegst du in der erzeugten `package.json` ein script, mit welchem du den Backend-Server später starten kannst.

```json
{
  ...
  "scripts": {
      "start": "nodemon index.ts"
  },
  ...
}
```
Das resultierende `package.json` sollte dann so aussehen:
```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.ts"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "koa": "^2.13.4",
    "koa-router": "^10.1.1",
    "nodemon": "^2.0.16",
    "ts-node": "^10.7.0",
    "typescript": "^4.6.4"
  }
}
```

7. index.ts
```typescript
import Koa from "koa"
import KoaRouter from "koa-router"

const app = new koa()
const router = new koaRouter()

router.get('home', '/', (context) => {
    context.body = "Hallo Welt vom koa server"
})

app.use(router.routes()).use(router.allowedMethods())// registering routes to the application

app.listen(2400, () => console.log('Server running at PORT 2400'))
```

8. Nun starte den Server in der Konsole (Verzeichnis: `myapp\backend\`)
```
npm run start
```
### Sieh dir das Ergebnis an: http://localhost:2400. Im Browser sollte `Hallo Welt vom koa server` zu sehen sein.

Nun erzeugen wir jeweils eine REST-Schnittstelle für die An- und Abmeldung am nscale Application Layer, welche zum Schluss 
von dem vuejs-Frontend verwendet werden wird.

1. Dazu ergänzt du den Inhalt der Datei `myapp\backend\index.ts` um eine Variable `cookie` und zwei Routen (`/login` und `/logout`).
```typescript
// ...
let cookie = null

router.post('login', '/login', (ctx: Koa.Context) => {
    context.body = 'Du bist angemeldet'
})

router.get('logout', '/logout', (ctx: Koa.Context) => {
    context.body = 'Du bist abgemeldet'
})
// ...
```
Wenn diese Routen jetzt von einem Client aufgerufen werden, würde unser Server immer den Text `Du bist angemeldet` bzw. `Du bist abgemeldet` zurück liefern.

2. Das Ziel ist, per GraphQL-Schnittstelle des nscale Application Layer, einen Session-Cookie zu erhalten. Dazu muss unser Server auch einen Request absetzen. 
Dazu verwende ich gerne das beliebte npm-Paket `axios`, da es sehr einfach verwendet werden kann. D. e. installieren wir das kurzerhand wie gewohnt. 

Achte darauf, dass du dich im richtigen Verzeichnis `myapp\backend` befindest! 
```
npm i axios 
```

3. Nun änderst du die `login`-Route wie folgt
```typescript
router.post('login', '/login', async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
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
                Authorization: `Basic ${Base64.toBase64(`${ctx.query.username}:${ctx.query.password}`)}`,
            }
        })

        cookie = response.headers["set-cookie"][0]

        let loginResponseData = {
            username: ctx.query.username,
            password: ctx.query.password,
            napplCookie: cookie,
            'nscale Application Layer response data': response.data.data
        };

        ctx.body = JSON.stringify(loginResponseData, null, 4)
    } catch (e) {
        ctx.status = 501
        ctx.body = JSON.stringify(e, null, 4)
    }
})
```

Jetzt macht die `login`-Route bereits was sie verspricht. Sie setzt einen Request an den nscale Application Layer ab, welcher lokal auf dem Port 
8080 läuft. Dabei wird GraphQL übertragen und über den request header `Authentication` mit den User-Credentials im nscale Application Layer authentifiziert. 
Die Credentials werden (in diesem Beispiel) im Request als sogenannte Query-Parameter übertragen. <br>Als Antwort vom nscale Application Layer erhalten wir 
den Session-Cookie, welcher über `response.headers["set-cookie"][0]` abgefragt werden kann. Dieser wird in der zuvor angelegten Variable `cookie` gespeichert.

Eine entsprechende Url ist z.B.:
```
http://localhost:2400/login?username=admin@nscale&password=nscale
```

Natürlich muss auch ein Logout ermöglicht werden. Dazu passen wir auch die `logout`-Route an.
```typescript
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
        ctx.status = e.response && e.response.status ? e.response.status : 501
        if(e.response) {
            ctx.body = JSON.stringify(e.response, null, 4)
        } else {
            ctx.body = e
        }
    }
})
```


---

# Weiter gehts mit unserem Frontend - webpack, typescript, und vuejs

1. Lege im root-Verzeichnis einen neuen Ordner `frontend` an.

2. Mit folgendem Befehlen initialisierst du auch im neu angelegten Verzeichnis `frontend` ein neues nodejs-Projekt.
``` 
npm init
```

3. Installier die folgenden npm-Pakete.
```
npm i typescript webpack webpack-cli webpack-dev-server html-webpack-plugin vue@2.6.14 vue-loader@15.9.8 vue-style-loader vue-template-compiler css-loader ts-loader axios
```

4. Leg die Datei `\frontend\webpack.config.ts` an. 


https://levelup.gitconnected.com/setup-tailwind-css-with-webpack-3458be3eb547 
https://tailwindcss.com/docs/guides/vite
npm i style-loader postcss postcss-loader postcss-preset-env tailwindcss 
npx tailwindcss init -p


