<template>
  <v-card height='100%' width='100%' class='d-flex justify-space-between flex-column'>
    <v-card-text ref='messageBlock'>
      <message
          v-for='(massage, index) in messages'
          :key='index'
          :name='massage.name'
          :text='massage.text'
          :owner='user.id === massage.id'
      />
    </v-card-text>
    <v-card-actions>
      <v-text-field v-model='text' autofocus outlined hide-details @keydown.enter='send'>
        <template v-slot:append-outer>
          <v-btn color='primary' height='56px' @click='send'> Send</v-btn>
        </template>
      </v-text-field>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import Message from '@/components/chat/Message'

export default {
  name: 'chat',
  middleware: ['authChat'],
  components: { Message },
  head () {
    return {
      title: `Room ${ this.user.room }`
    }
  },
  data: () => {
    return {
      text: ''
    }
  },
  watch: {
    messages () {
      setTimeout(() => {
        const messageBlock = this.$refs.messageBlock
        if (!messageBlock || !messageBlock.scrollHeight) return
        messageBlock.scrollTop = messageBlock.scrollHeight
      })
    }
  },
  computed: mapState(['user', 'messages']),
  methods: {
    send () {
      this.$socket.emit(
          'createMessage', {
            text: this.text,
            id: this.user.id
          }, data => {
            if (typeof data === 'string') {
              console.error(data)
            } else {
              this.text = ''
            }
          }
      )
    }
  }
}
</script>

<style lang='scss' scoped>
.v-card {
  .v-card__text {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 72px;
    overflow-y: auto;
  }

  .v-card__actions {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 72px;
  }
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #131c21;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #394045;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
