import { Message } from "@lib/type"
import Image from "next/image"

interface Props {
  message: Message
}

function MessageComponent({ message }: Props) {
  return (
    <div className="flex gap-x-2 items-start justify-start px-4 py-1">

      <div className="rounded-full overflow-hidden bg-slate-100 aspect-square w-14 h-14 flex justify-center items-center">
        <Image
          height={50}
          width={50}
          src={message.profilePic}
          alt="Profile picture"
        />
      </div>

      <div className="">
        <p className="text-xs text-pink-400">{message.username}</p>
        <div className="flex items-end gap-1">
          <p className="text-lg bg-pink-400/90 text-white px-3 py-1 rounded-md">{message.message}</p>
          <p>{message.created_at}</p>
        </div>
      </div>

    </div>
  )
}

export default MessageComponent