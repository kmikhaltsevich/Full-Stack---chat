<template>
  <div>
    <v-navigation-drawer v-model='drawer' fixed app clipped mobile-breakpoint='640'>
      <v-list subheader>
        <v-subheader>User list in room</v-subheader>
        <v-list-item v-for='(item, i) in users' :key='i' router exact>
          <v-list-item-avatar>
            <v-avatar size='40'>
              <v-img v-if='item.image && item.image.length' :src='item.image'></v-img>
              <v-icon v-else size='40'>mdi-account-circle</v-icon>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content :class='item.id === user.id ? "font-weight-bold" : ""'>
            {{ item.name }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app clipped-left>
      <v-app-bar-nav-icon @click.stop='drawer = !drawer'/>
      <v-toolbar-title v-text='title'/>
      <v-spacer/>
      <v-btn @click='exitChat' icon>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'MainHeader',
  data () {
    return {
      drawer: true,
      title: 'Your private chat ;)'
    }
  },
  computed: mapState(['user', 'users']),
  methods: {
    ...mapMutations(['clearData']),
    exitChat () {
      this.$socket.emit('userLeft', this.user.id, () => {
        this.clearData()
        this.$router.push('/?message=leftChat')
      })
    }
  },
  mounted () {
    this.title = `Chat in the room ${this.user.room}`
  }
}
</script>
