<template>
  <div class='d-flex align-center justify-center h-100'>
    <v-card width='640'>
      <v-card-title class='text-h4'>Authorization</v-card-title>
      <v-card-text>
        <v-form ref='form' v-model='valid' lazy-validation>
          <v-text-field
              v-model='authData.name'
              :counter='16'
              :rules='rules.name'
              label='Your name'
              required outlined
              @keypress.enter='submit'
          />
          <v-text-field
              v-model='authData.room'
              :rules='rules.room'
              label='Room number'
              required outlined
              @keypress.enter='submit'
          />
          <v-btn :disabled='!valid' color='primary' @click='submit' block>Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <v-snackbar
        v-model='snackbar'
        :timeout='6000'
        top
    >
      {{ message }}
      <template v-slot:action='{ attrs }'>
        <v-btn
            color='pink'
            text
            v-bind='attrs'
            @click='snackbar = false'
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'loginPage',
  layout: 'empty',
  sockets: {
    connect: function () {
      console.warn('Socket to notification channel connected')
    }
  },
  head: {
    title: 'Welcome to live chat'
  },
  data: () => ({
    rules: {
      name: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 16) || 'Name must be less than 16 characters',
      ],
      room: [
        v => !!v || 'Room number is required',
        // v => /^-?\d*\.?\d*$/.test(v) || 'Room number is not a number',
      ]
    },
    snackbar: false,
    message: '',
    valid: true,
    authData: {
      name: '',
      room: ''
    }
  }),

  methods: {
    ...mapMutations(['setUser']),
    async submit () {
      await this.$refs.form.validate()
      if ( !this.valid) return

      this.$socket.emit('userJoined', this.authData, data => {
        if (typeof data === 'string') {
          console.error(data)
        } else {
          this.setUser({ ...this.authData, id: data.userId })
          this.$router.push('/chat')
        }
      })
    }
  },
  mounted () {
    const { message } = this.$route.query
    if (message === 'noUser') {
      this.message = 'Enter data'
    } else if (message === 'leftChat') {
      this.message = 'You are out of chat'
    }

    this.snackbar = !!this.message
  }
}
</script>
