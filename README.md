# Willkommen zum nodejs-koa-webpack-vue2 Workshop

### Was werde ich hier machen?
* Wir legen ein lokales nodejs-Projekt an
* Wir ...

### Was brauche ich?
* Eine aktuelle nodejs-Installation
* Intellij, Webstorm oder VS Code
* Eine Internetverbindung

## Los gehts mit unserem kleinen Backend
1. Erzeuge ein neues Verzeichnis `nodejs-koa-webpack-vue--workshop` an deinem Lieblingsplatz für neue Projekte.
```
mkdir nodejs-koa-webpack-vue--workshop
```

2. Geh in das zuvor angelegte Verzeichnis und lege darin ein weiteres Verzeichnis `nodejs-koa-webpack-vue--workshop\backend` an.
```
cd nodejs-koa-webpack-vue--workshop
mkdir backend
```

3. In dem Verzeichnis `nodejs-koa-webpack-vue--workshop\backend` führst du den nodejs-befehl `npm init` aus, um dein Backend-Projekt zu initialisieren. 
Für diesen Workshop reicht es die darauf folgenden Fragen per Enter-Taste zu bestätigen.
```
npm init
```

4. Das Resultat sollten zwei Dateien sein:
* `nodejs-koa-webpack-vue--workshop\backend\package.json`
* `nodejs-koa-webpack-vue--workshop\backend\package-lock.json`

5. Jetzt installierst du die Pakete `nodemon`, `typescript`, `ts-node`, `koa` und `koa-router` wie folgt:
```
npm i nodemon typescript ts-node koa koa-router
```

6. Jetzt hinterlegst du in der package.json -> start script
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

8. Nun starte den Server in der Konsole (Verzeichnis: `nodejs-koa-webpack-vue--workshop\backend\`)
```
npm run start
```
### Sieh dir das Ergebnis an: http://localhost:2400

# Weiter gehts mit unserem Frontend - webpack, typescript, und vuejs

1. Lege im root-Verzeichnis einen neuen Ordner `frontend` an.

2. Mit folgenden Befehlen initialisierst du auch im neu angelegten Verzeichnis `frontend` ein neues nodejs-Projekt
``` 
npm init
```


