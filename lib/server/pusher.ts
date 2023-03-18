import Pusher from "pusher"

const serverPusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || "",
  key: "2ee23cb63c72ce37822a",
  secret: process.env.PUSHER_SECRET || "",
  cluster: "ap3",
  useTLS: true,
})

export default serverPusher