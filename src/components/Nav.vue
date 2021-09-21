<template>
  <div>
    <v-btn color="primary" dark @click.stop="drawer = !drawer">
      MENU
    </v-btn>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.url" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>


</template>

<script>
  export default {
    name: 'Nav',
    data: () => ({
      drawer: null,
      items: [{
          title: 'Students',
          url: '/',
          icon: 'mdi-view-dashboard'
        },
        {
          title: 'Teachers',
          url: '/teacher',
          icon: 'mdi-account-box'
        },
        {
          title: 'House',
          url: '/house',
          icon: 'mdi-home'
        },
      ],
    }),
  }
</script>