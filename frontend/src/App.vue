<script lang="ts">
import vue from 'vue'
import Login from "./components/Login.vue";

export default vue.extend({
  name: 'app',
  components: {Login}
})
</script>

<template>
    <Login></Login>
</template>