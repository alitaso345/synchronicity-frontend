import * as React from 'react'
import { useState, useEffect } from 'react'
import { emoteData } from './emoteData'

// Heroku用の環境変数設定
const host = process.env.NODE_ENV === 'production' ? 'https://synchronicity-backend.herokuapp.com' : 'http://localhost:5000'

type Message = {
  user: string
  text: string
  platform: string
}

const convertToMessage = (res: any): Message => ({
  user: res.user,
  text: res.text,
  platform: res.platform
})

const Root: React.FC = () => {
  const [messages, update] = useState<Message[]>([])
  const eventSource = new EventSource(`${host}/events`)

  useEffect(
    () => {
      eventSource.onmessage = e => {
        try {
          const data = JSON.parse(e.data)
          const message = convertToMessage(data)
          update(_messages => {
            if (_messages.length > 50) {
              _messages.pop()
            }
            return [message, ..._messages]
          })
        } catch {
          console.log(e.data)
        }
      }
    },
    []
  )

  return (
    <div
      className="timeline-container" 
      style={{minWidth: "200px", width: "100%"}}
    >
      {messages.map((item, index) => (
        <div
          className="message-item"
          key={index}
          style={{
            width: "100%",
            margin: "5px auto",
            wordBreak: "break-all"
          }}
        >
          <span
            className="platform-icon"
            style={{marginRight: "3px"}}
          >
            <img
              src={item.platform === "twitter" ? "../Twitter_Social_Icon_Circle_Color.png" : "../TwitchGlitchPurple.png"}
              width={18}
              height={18}
            />
          </span>

          <span
            className="user"
            style={{
              color: `${item.platform === "twitter" ? "#00ACEE" : "#6441a5"}`,
              fontFamily: `Arial, “ヒラギノ角ゴ Pro W3”, “Hiragino Kaku Gothic Pro”, Osaka, メイリオ, Meiryo, “ＭＳ Ｐゴシック”, “MS PGothic”, sans-serif`
            }}
          >
            {item.user}
          </span>
          <span>: </span>
          {item.text.split(" ").map((t, i) => {
            for (const emote of emoteData) {
              if (emote.name === t) {
                return <img key={i} src={emote.url} width={emote.width} height={emote.height} alt={emote.name} />
              }
            }

            return <span key={i}>{t}</span>
          })}
        </div>
      ))}
    </div>
  )
}

export default Root