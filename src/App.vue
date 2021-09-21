<template>
  <v-app>
  <!--componet nav -->
    <Nav></Nav>

    <v-main>
      <router-view />
    </v-main>

  </v-app>
</template>

<script>
  import Nav from './components/Nav'
  export default {
    name: 'App',
    components: {
      Nav
    },
    data: () => ({
      draw: null,
    }),
  };
</script>