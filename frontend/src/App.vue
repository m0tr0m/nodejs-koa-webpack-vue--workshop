
<script lang="ts">
import vue from 'vue'
import axios, {AxiosError, AxiosResponse} from "axios";

export default vue.extend({
  name: 'app',
  components: {},
  data() {
    return {
      loggedIn: false,
      textareaValue: null,
      name: null,
      password: null,
      napplCookie: null,
      timer: 10 // seconds
    }
  },
  methods: {
    handleFormSubmit: function (e:FormDataEvent) {
      axios.post('http://localhost:3000/api/login?username='+this.name+'&password='+this.password).then((response: AxiosResponse) => {
        this.loggedIn = true
        this.textareaValue = JSON.stringify(response.data, null, 4)
        this.napplCookie = response.data.napplCookie
        this.startLogoutTimer()
      }).catch((error: AxiosError) => {
        this.textareaValue = JSON.stringify(error, null, 4)
      })
    },
    logout: function () {
      return axios.get('http://localhost:3000/api/logout')
    },
    startLogoutTimer: function () {
      let logout = () => {
        if(this.timer === 0) {
          clearInterval(logoutInterval)
          this.timer = 10
          this.logout().then(() => {
            this.loggedIn = false
            this.napplCookie = null
            this.textareaValue = null
          })
        } else {
          this.timer--
        }
      };
      const logoutInterval = setInterval(logout, 1000);
    }
  }
})
</script>

<template>

  <!-- Kontainer - Volle Höhe und Breite -->
  <div class="relative flex justify-center items-center p-10 h-full">

    <!-- Formular - Box mit Rahmen -->
    <form class="flex flex-col w-1/2 h-full 2xl:h-2/3 border border-neutral-200 p-4 gap-4" @submit.prevent="handleFormSubmit">

      <!-- Hauptinhalt -->
      <div class="flex flex-grow flex-col gap-4 overflow-auto">
        <div class="flex justify-between">
          <h1 class="text-2xl text-[#11a63c]">Application Layer Login</h1>
          <p v-if="napplCookie">Abmelden in {{this.timer}} Sekunden</p>
        </div>
        <div class="flex flex-col flex-grow items-center 2xl:pt-24">
          <div v-if="!loggedIn" class="flex flex-col w-1/2 gap-4">

            <div>
              <label class="text-[#11a63c]" for="name">Name</label>
              <input id="name" class="nice-input" type="text" v-model="name" autocomplete="name" placeholder="Name"/>
            </div>

            <div>
              <label class="text-[#11a63c]" for="password">Passwort</label>
              <input id="password" class="nice-input" type="password" v-model="password" autocomplete="password" placeholder="Passwort"/>
            </div>
          </div>

          <textarea v-else class="flex flex-grow outline-0 resize-none w-full" readonly v-model="textareaValue"></textarea>
        </div>
      </div>
      <div class="flex justify-end gap-4 border-t border-neutral-200 pt-4">
        <button v-if="!loggedIn" class="border rounded px-2 py-1 hover:text-white hover:bg-[#11a63c]" type="submit">Anmelden</button>
        <button v-else class="border rounded px-2 py-1 hover:text-white hover:bg-[#11a43c]" @click="logout" type="button">Abmelden</button>
      </div>
    </form>
  </div>
</template>