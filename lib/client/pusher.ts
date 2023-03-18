import ClientPusher from "pusher-js"

const clientPusher = new ClientPusher('2ee23cb63c72ce37822a', {
  cluster: 'ap3',
  forceTLS: true,
})

export default clientPusher