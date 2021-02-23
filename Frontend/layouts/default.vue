<template>
  <v-app app>
    <main-header/>
    <v-main>
      <v-container class='h-100'>
        <nuxt/>
      </v-container>
    </v-main>
    <main-footer/>
  </v-app>
</template>

<script>
import MainHeader from '~/components/MainHeader'
import MainFooter from '~/components/MainFooter'

export default {
  name: 'default',
  components: { MainHeader, MainFooter }
}
</script>
