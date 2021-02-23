import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
// import SocketIO from 'socket.io-client'
// const options = { path: '/api/socket' }

export default function ({ store }) {
  Vue.use(new VueSocketIO({
    debug: false,
    connection: 'http://localhost:8000',
    // debug: false,
    // connection: SocketIO('http://localhost:8000', options),
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  }))
}
