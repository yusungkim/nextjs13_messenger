import { Message } from "@lib/type"
import Image from "next/image"
import { cls } from "lib/client/utils"

interface Props {
  message: Message
}

function MessageComponent({ message }: Props) {
  const isUser = true

  return (
    <div className={cls(
      "flex w-fit gap-x-2 items-start justify-start px-4 py-1",
      isUser ? "ml-auto" : ""
    )}>

      <div className={cls(
        "flex-shrink-0 rounded-full mx-2 bg-slate-100",
        isUser ? "order-2" : ""
      )}>
        <Image
          height={55}
          width={55}
          src={message.profilePic}
          alt="Profile picture"
        />
      </div>

      <div className="">
        <p className={cls(
          "text-xs",
          isUser ? "text-blue-400 text-right" : "text-pink-400 text-left"
        )}>{message.username}</p>
        <div className="flex items-end gap-1">
          <p className={cls(
            "text-lg text-white px-3 py-1 rounded-md",
            isUser ? "bg-blue-400/90 order-2" : "bg-pink-400/90"
          )}>{message.message}</p>
          <p className="text-slate-400 text-xs">{new Date(message.created_at).toLocaleString()}</p>
        </div>
      </div>

    </div>
  )
}

export default MessageComponent