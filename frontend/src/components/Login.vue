<script lang="ts">
import axios, {AxiosError, AxiosResponse} from "axios";

export default {
  name: "Login",

  /* Komponenten-State | die Suffixe wie z.B. 'as Boolean' sind hier ein Beispiel für die Verwendung von Typescript */
  data() {
    return {
      loggedIn: false as Boolean,
      error: null as String,
      textareaValue: null as String,
      name: null as String,
      password: null as String,
      napplCookie: null as String,
      timer: 10 as Number, // in Sekunden
      logoutInterval: null as Function
    }
  },

  /* Komponenten-Methoden */
  methods: {

    /* Event-Handler-Funktion, welche beim Absenden des Formulars (<form>) aufgerufen wird  */
    handleFormSubmit: function () {

      if (this.name) { // Validierung - Die Angabe des Benutzernamens ist pflicht

        this.error = null // Zurücksetzen von vorher aufgetretenen Fehlern

        const passwordQueryParam = !this.password ? '' : '&password=' +
            this.password // Wenn kein Passwort angeben wurde, setze einen leeren String

        /* Setze den login-Request ab, welcher durch den Proxy auf 'http://localhost:2400/login...' umgelenkt wird */
        axios.post('http://localhost:3001/api/login?username=' + this.name + passwordQueryParam)
          .then((response: AxiosResponse) => {
            this.loggedIn = true
            this.textareaValue = JSON.stringify(response.data, null, 4)
            this.startLogoutTimer()
          }).catch((error: AxiosError) => {
            console.error('Error occurred while logging in', error)
            this.error = error.response.status === 401 ? 'Falscher Benutzername oder falsches Passwort' :
                error.response.statusText
          })

      } else {
        this.error = 'Du musst einen Benutzernamen angeben'
      }
    },

    /* Event-Handler-Funktion, welche beim Klick auf dem Abmelde-Button aufgerufen wird  */
    explicitLogout: function () {
      this.logout()
    },

    /* Hilfsfunktion, welche mit axios den tatsächlichen Logout-Request zu dem Backend-Server absetzt */
    logout: function () {
      /* Setze den logout-Request ab, welcher durch den Proxy auf 'http://localhost:2400/logout...' umgelenkt wird */
      axios.get('http://localhost:3001/api/logout').then((response: AxiosResponse) => {
        this.error = null
        this.loggedIn = false
        this.textareaValue = null
      }).catch((error: AxiosError) => {
        console.error('Error occurred while logging out', error)
        this.error = error.message
      }).finally(() => {
        clearInterval(this.logoutInterval)
        this.timer = 10
      })
    },

    /* Hilfsfunktion, welche ein interval startet, damit die App den Anwender nach 'this.timer'
      Sekunden automatisch abmeldet */
    startLogoutTimer: function () {
      let intervalFunction = () => {
        if (this.timer === 1) {
          this.logout()
        } else {
          this.timer--
        }
      };
      this.logoutInterval = setInterval(intervalFunction, 1000);
    },
  }
}
</script>

<template>
  <!-- Container - Volle Höhe und Breite -->
  <div class="flex justify-center items-center p-10 h-full">

    <!-- Formular - Box mit Rahmen -->
    <div class="flex flex-col w-1/2 h-full 2xl:h-2/3 border border-[#11a63c] p-4 gap-4 rounded shadow-xl">


      <!-- Bereich, welcher seinen Inhalt in der horizontalen mittig positioniert -->
      <header class="flex justify-between">
        <!-- Überschrift in grün-->
        <h1 class="text-2xl text-[#11a63c]">Application Layer Login</h1>
        <p v-if="loggedIn">Abmelden in {{ this.timer }} Sekunden</p>
      </header>

      <!-- Conditional Rendering - Inhalt, wenn der Benutzer sich nicht angemeldet hat -->
      <div v-if="!loggedIn" class="flex flex-col flex-grow">
        <form class="flex flex-col flex-grow" @submit.prevent="handleFormSubmit">

          <!-- Hauptinhalt, welcher (wenn nötig) eine Scrollbar anzeigt -->
          <div class="flex flex-grow flex-col gap-4 overflow-auto">

            <!-- Interner Container für das Login-Formular, welches auf großen Bildschirmen den Inhalt um 6 rem
              nach unten verschiebt dargestellt wird, wenn der Benutzer sich nicht bereits angemeldet hat
              (https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale) -->
            <div :class="'flex flex-col flex-grow items-center'+(!loggedIn ? ' 2xl:pt-24' : '')">

              <!-- Container, welcher die Breite des Inhalts begrenzt und einen Abstand
                zwischen den Form-Elementen schafft (gap-4) -->
              <div class="flex flex-col w-1/2 gap-4">
                <div>
                  <label for="name">Name</label>
                  <input id="name" class="nice-input" type="text" v-model="name" autocomplete="name"
                         placeholder="Name"/>
                </div>

                <div>
                  <label for="password">Passwort</label>
                  <input id="password" class="nice-input" type="password" v-model="password" autocomplete="password"
                         placeholder="Passwort"/>
                </div>
              </div>

              <!-- Conditional Rendering [wird angezeigt, wenn es einen Fehler zum Präsentieren gibt] -
                Fehlermeldung in rot und fett -->
              <p v-if="error" class="text-red-600 font-bold mt-4">{{ this.error }}</p>

            </div>
          </div>

          <!-- Footer-Bereich - Rechtsbündig mit border -->
          <div class="flex justify-end gap-4 border-t border-neutral-200 pt-4">
            <button v-if="!loggedIn"
                    class="border border-[#11a63c] border-2 rounded px-2 py-1 hover:text-white hover:bg-[#11a63c]"
                    type="submit">Anmelden
            </button>
          </div>
        </form>
      </div>

      <!-- Conditional Rendering [wird angezeigt, wenn der Anwender angemeldet ist] -
        Inhalt, wenn der Benutzer sich angemeldet hat -->
      <div v-if="loggedIn" class="flex flex-col flex-grow">

        <!-- Textarea mit voller Breite relativ zum Container ohne outline default -->
        <textarea class="flex flex-grow outline-0 resize-none w-full mb-4 rounded" readonly
                  v-model="textareaValue"></textarea>

        <!-- Conditional Rendering [wird angezeigt, wenn es einen Fehler zum Präsentieren gibt] -
          Positioniert den Inhalt mittig in der horizontalen -->
        <div v-if="error" class="flex justify-center py-4">
          <!-- Fehlermeldung in rot und fett -->
          <p class="text-red-600 font-bold mt-4">{{ this.error }}</p>
        </div>

        <!-- Footer-Bereich - Rechtsbündig mit border -->
        <div class="flex justify-end border-t border-neutral-200 pt-4">
          <button class="border border-red-600 border-2 rounded px-2 py-1 hover:text-white hover:bg-red-600"
                  @click="explicitLogout" type="button">Abmelden
          </button>
        </div>
      </div>

    </div>
  </div>

</template>