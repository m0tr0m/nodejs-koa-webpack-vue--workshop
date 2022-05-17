
<script lang="ts">
import vue from 'vue'

export default vue.extend({
  name: 'app',
  components: {},
  data() {
    return {
      loggedIn: false,
      textareaValue: null,
      name: null,
      password: null
    }
  },
  methods: {
    handleFormSubmit: function (e:FormDataEvent) {
      e.preventDefault()
      this.loggedIn = true;
      this.textareaValue = 'Angemeldet!'
      return true
    },
    logout: function () {
      this.loggedIn = false;
      this.textareaValue = null
    }
  }
})
</script>

<template>

  <!-- Kontainer - Volle Höhe und Breite -->
  <div class="relative flex justify-center items-center p-10 h-full">

    <!-- Formular - Box mit Rahmen -->
    <form class="flex flex-col w-1/2 h-1/2 border border-neutral-200 p-4 gap-4" @submit="handleFormSubmit">

      <!-- Hauptinhalt -->
      <div class="flex flex-grow flex-col gap-4">
        <h1 class="text-2xl">Application Layer Login</h1>
        <div class="flex flex-col flex-grow items-center py-8">
          <div v-if="!loggedIn" class="flex flex-col w-1/2">

            <label for="name">Name</label>
            <input id="name" class="px-2 py-1 border border-neutral-200 w-full mb-4 rounded" type="text" v-model="name" autocomplete="name" placeholder="Name"/>

            <label for="password">Passwort</label>
            <input id="password" class="px-2 py-1 border border-neutral-200 w-full rounded" type="password" v-model="password" autocomplete="password" placeholder="Passwort"/>
          </div>

          <textarea v-else class="flex flex-grow outline-0 resize-none" readonly v-model="textareaValue"></textarea>
        </div>
      </div>
      <div class="flex justify-end gap-4 border-t border-neutral-200 pt-4">
        <button v-if="!loggedIn" class="border rounded px-2 py-1 hover:text-white hover:bg-[#11a43c]" type="submit">Anmelden</button>
        <button v-else class="border rounded px-2 py-1 hover:text-white hover:bg-[#11a43c]" @click="logout" type="button">Abmelden</button>
      </div>
    </form>
  </div>
</template>