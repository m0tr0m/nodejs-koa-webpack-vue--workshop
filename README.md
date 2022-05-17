# Willkommen
In diesem Turorial implementierst du ein nodejs-Backend "from Scratch". Du verwendest das Framework koajs um REST-Schnittstellen zu implementieren, welche per GraphQL-Schnittstelle des nscale Application Layer die An- und Abmeldung ermöglichen.

Außerdem setzt du mit Hilfe von nodejs und webpack ein Frontend-Projekt auf (ebenfalls "from Scratch"), welches das Javascript-Framework vuejs nutzt, um dem Anwender ein Userinterface bereitzustellen. Um das Ganze abzurunden, wirst du sowohl für das Backend, als auch für das Frontend, ein kleinwenig Typescript verwenden. Vor allem aber wirst du Javascript, HTML und CSS verwenden.

### Optionale Hausaufgaben bevor es los geht
Schaue dir dieses Video an, wenn du vorab die Javascript-Basics auffrischen/kennenlernen möchtest.
https://www.youtube.com/watch?v=W6NZfCO5SIk

Für einen Einstieg in nodejs empfehle ich dieses Video
https://www.youtube.com/watch?v=TlB_eWDSMt4

Um das koajs-Framwork besser einordnen zu können, empfehle ich, sich im ersten Schritt ein paar Kenntnisse für das nodejs-Framework [expressjs](https://expressjs.com/) auf zu bauen. Dazu habe ich natürlich auch wieder eine Empfehlung.
https://www.youtube.com/watch?v=pKd0Rpw7O48

Nun gibt das folgende Video einen guten Eindruck vom kosjs-Framework
https://www.youtube.com/watch?v=z84uTk5zmak

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

2. Mit folgendem Befehlen initialisierst du auch im neu angelegten Verzeichnis `frontend` ein neues nodejs-Projekt.
``` 
npm init
```

3. Installier die folgenden npm-Pakete.
```
npm i typescript webpack webpack-cli webpack-dev-server html-webpack-plugin vue@2.6.14 vue-loader@15.9.8 vue-style-loader vue-template-compiler css-loader ts-loader
```

4. Leg die Datei `\frontend\webpack.config.ts` an. 


https://levelup.gitconnected.com/setup-tailwind-css-with-webpack-3458be3eb547 
https://tailwindcss.com/docs/guides/vite
npm i style-loader postcss postcss-loader postcss-preset-env tailwindcss 
npx tailwindcss init -p


