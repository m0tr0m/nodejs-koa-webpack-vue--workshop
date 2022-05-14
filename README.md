# Willkommen zum nodejs-koa-webpack-vue2 Workshop

### Was werde ich hier machen?
* Wir legen ein lokales nodejs-Projekt an
* Wir ...

### Was brauche ich?
* Eine aktuelle nodejs-Installation
* Intellij, Webstorm oder VS Code
* Eine Internetverbindung

## Los gehts
Erzeuge ein neues Verzeichnis `nodejs-koa-webpack-vue--workshop` an deinem Lieblingsplatz für neue Projekte.
```
mkdir nodejs-koa-webpack-vue--workshop
```

Lauf in das zuvor angelegte Verzeichnis und lege darin ein weiteres Verzeichnis `nodejs-koa-webpack-vue--workshop\backend` an.
```
cd nodejs-koa-webpack-vue--workshop
mkdir backend
```

In dem Verzeichnis `nodejs-koa-webpack-vue--workshop\backend` führst du den nodejs-befehl `npm init` aus, um dein Backend-Projekt zu initialisieren. 
Für diesen Workshop reicht es die darauf folgenden Fragen per Enter-Taste zu bestätigen.
```
npm init
```
Das Resultat sollten zwei Dateien sein:
* `nodejs-koa-webpack-vue--workshop\backend\package.json`
* `nodejs-koa-webpack-vue--workshop\backend\package-lock.json`

Jetzt installierst du die Pakete `typescript`, `tslint` und `koa` wie folgt:
```
npm i nodemon typescript ts-node koa koa-router
```

package.json -> start script
```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node --loader ts-node/esm index.ts"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "koa": "^2.13.4",
    "koa-router": "^10.1.1",
    "ts-node": "^10.7.0",
    "tslint": "^6.1.3",
    "typescript": "^4.6.4"
  }
}
```

index.ts
```typescript
const koa = require('koa')
const koaRouter = require('koa-router')

const app = new koa()
const router = new koaRouter()

router.get('home', '/', (context) => {
    context.body = "Hallo Welt vom koa server"
})

app.use(router.routes()).use(router.allowedMethods())// registering routes to the application

app.listen(2400, () => console.log('Server running at PORT 2400'))
```

Nun starte den Server in der Konsole (Verzeichnis: `nodejs-koa-webpack-vue--workshop\backend\`)
```
npm run start
```
### Sieh dir das Ergebnis an: http://localhost:2400



