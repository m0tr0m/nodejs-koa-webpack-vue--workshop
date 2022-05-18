<!--
    tailwindcss ist m. E. ein CSS-Framework, welches sehr gut für Einsteiger geeignet ist, die sich auch im CSS Umfeld noch
    nicht besonders gut auskennen. Der Grund dafür ist, bei der Verwendung von tailwindcss-Klassen, die sehr hohe Entsprechung
    der CSS-Begrifflichkeiten. Das hilft dabei im Internet Hilfestellungen zu finden. Abgesehen davon ist die Dokumentation
    von tailwindcss absolute Oberklasse. Suche im Web z.B. nach einer bestimmten CSS-Klasse,
    welche unten verwendet wird mit dem Zusatz ( z.B. "tailwind justify-center"), und du wirst sofort fündig. Umgekehrt
    klappt das natürlich auch ( z.B. "tailwind transform-origin" liefert bei Google -> https://tailwindcss.com/docs/transform-origin)

    Durch die Möglichkeit am Element selbst das Design dessen zu definieren verringert sich der Wartungsaufwand und die
    Implementationszeit erhöht sich deutlich.

    Redundanzen können dennoch sehr charmant vermieden werden -> https://tailwindcss.com/docs/reusing-styles#extracting-classes-with-apply

    Und das alles mit Autovervollständigung!

    Tolle Sache...
-->

<script lang="ts">
import axios, {AxiosError, AxiosResponse} from "axios";

export default {
  name: "Login",

  data() {
    return {
      loggedIn: false as Boolean,
      error: null as String,
      textareaValue: null as String,
      name: null as String,
      password: null as String,
      napplCookie: null as String,
      timer: 10, // seconds
      logoutInterval: null as Function
    }
  },
  methods: {
    handleFormSubmit: function () {
      this.error = null
      axios.post('http://localhost:3000/api/login?username='+this.name+'&password='+this.password).then((response: AxiosResponse) => {
        this.loggedIn = true
        this.textareaValue = JSON.stringify(response.data, null, 4)
        this.startLogoutTimer()
      }).catch((error: AxiosError) => {
        console.error('Error occurred while logging in', error)
        this.error = error.message
      })
    },
    logout: function () {
      return axios.get('http://localhost:3000/api/logout')
    },
    startLogoutTimer: function () {
      let logout = () => {
        if(this.timer === 1) {
          this.logout().then(() => {
            this.loggedIn = false
            this.textareaValue = null
          }).catch((error: AxiosError) => {
            console.error('Error occurred while logging out', error)
            this.error = error.message
          }).finally(() => {
            clearInterval(this.logoutInterval)
            this.timer = 10
          })
        } else {
          this.timer--
        }
      };
      this.logoutInterval = setInterval(logout, 1000);
    },
    explicitLogout: function () {
      this.logout().then((response: AxiosResponse) => {
        console.log('Logout response', response)
        this.loggedIn = false
        this.textareaValue = null
      }).catch((error: AxiosError) => {
        console.error('Error occurred while logging out', error)
        this.error = error.message
      }).finally(() => {
        clearInterval(this.logoutInterval)
        this.timer = 10
      })
    }
  }
}
</script>

<template>
  <!-- Container - Volle Höhe und Breite -->
  <div class="flex justify-center items-center p-10 h-full bg-neutral-900">

    <!-- Formular - Box mit Rahmen -->
    <div class="flex flex-col w-1/2 h-full 2xl:h-2/3 border border-[#11a63c] p-4 gap-4 rounded shadow-xl bg-neutral-800">


      <!-- Bereich, welcher seinen Inhalt in der horizontalen mittig positioniert -->
      <header class="flex justify-between">
        <!-- Überschrift in grün-->
        <h1 class="text-2xl text-[#11a63c]">Application Layer Login</h1>
        <p v-if="loggedIn" class="text-white">Abmelden in {{this.timer}} Sekunden</p>
      </header>

      <!-- Conditional Rendering - Inhalt, wenn der Benutzer sich nicht angemeldet hat -->
      <div v-if="!loggedIn" class="flex flex-col flex-grow">
        <form class="flex flex-col flex-grow" @submit.prevent="handleFormSubmit">

          <!-- Hauptinhalt, welcher (wenn nötig) eine Scrollbar anzeigt -->
          <div class="flex flex-grow flex-col gap-4 overflow-auto">

            <!-- Interner Container für das Login-Formular, welches auf großen Bildschirmen den Inhalt um 6 rem nach unten verschiebt
              dargestellt wird, wenn der Benutzer sich nicht bereits angemeldet hat
              (https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale) -->
            <div :class="'flex flex-col flex-grow items-center'+(!loggedIn ? ' 2xl:pt-24' : '')">

              <!-- Container, welcher die Breite des Inhalts begrenzt und einen Abstand zwischen den Form-Elementen schafft (gap-4) -->
              <div class="flex flex-col w-1/2 gap-4">
                <div>
                  <label class="text-white" for="name">Name</label>
                  <input id="name" class="nice-input" type="text" v-model="name" autocomplete="name" placeholder="Name"/>
                </div>

                <div>
                  <label class="text-white" for="password">Passwort</label>
                  <input id="password" class="nice-input" type="password" v-model="password" autocomplete="password" placeholder="Passwort"/>
                </div>
              </div>

              <p v-if="error" class="text-red-600 font-bold mt-4">{{this.error}}</p>

            </div>
          </div>

          <!-- Footer-Bereich - Rechtsbündig mit border -->
          <div class="flex justify-end gap-4 border-t border-neutral-200 pt-4">
            <button v-if="!loggedIn" class="border border-[#11a63c] border-2 rounded px-2 py-1 text-white hover:bg-[#11a63c]" type="submit">Anmelden</button>
          </div>
        </form>
      </div>

      <!-- Conditional Rendering - Inhalt, wenn der Benutzer sich angemeldet hat -->
      <div v-if="loggedIn" class="flex flex-col flex-grow">

        <!-- Textarea mit voller Breite relativ zum Container ohne outline default -->
        <textarea class="flex flex-grow outline-0 resize-none w-full mb-4 text-white bg-neutral-700 rounded" readonly v-model="textareaValue"></textarea>

        <p v-if="error" class="text-red-600 font-bold mt-4">{{this.error}}</p>

        <div class="flex justify-end gap-4 border-t border-neutral-200 pt-4">
          <button class="border border-red-600 border-2 rounded px-2 py-1 hover:text-white hover:bg-red-600 text-white" @click="explicitLogout" type="button">Abmelden</button>
        </div>
      </div>

    </div>
  </div>

</template>