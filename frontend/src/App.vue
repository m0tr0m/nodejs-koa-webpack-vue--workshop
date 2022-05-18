<script lang="ts">
import vue from 'vue'
import Login from "./components/Login.vue"; // importieren

export default vue.extend({
  name: 'app',
  components: {Login} // registrieren
})
</script>

<template>
  <Login></Login> <!-- verwenden -->
</template>