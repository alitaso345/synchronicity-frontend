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
  text: convertToHTML(res.text),
  platform: res.platform
})

const convertToHTML = (text: string): string => {
  return text.split(" ").map(item => {
    for (const emote of emoteData) {
      if (emote.name === item) { 
        return `<img src="${emote.url}" width=${emote.width} height=${emote.height} alt=${emote.name}/>`
      }
    }

    return `<div style="display: inline-block; margin: 8px auto;">${item}</div>`
  }).join(" ")
}

const Root: React.FC = () => {
  const [messages, update] = useState<Message[]>([])
  const eventSource = new EventSource(`${host}/events`)

  useEffect(
    () => {
      eventSource.onmessage = e => {
        try {
          const data = JSON.parse(e.data)
          const message = convertToMessage(data)
          update(_messges => [message, ..._messges])
        } catch {
          console.log(e.data)
        }
      }
    },
    []
  )

  return (
    <div className="timeline-container">
      {messages.map((item, index) => (
        <div
          className="message-item"
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "5px"
          }}
        >
          <div
            className="platform-icon"
            style={{
              margin: "auto 5px",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <img
              src={item.platform === "twitter" ? "../Twitter_Social_Icon_Circle_Color.png" : "../TwitchGlitchPurple.png"}
              width={30}
              height={30}
            />
          </div>

          <div
            className="user"
            style={{
              margin: "auto 5px",
              color: `${item.platform === "twitter" ? "#00ACEE" : "#6441a5"}`,
              fontFamily: `Arial, “ヒラギノ角ゴ Pro W3”, “Hiragino Kaku Gothic Pro”, Osaka, メイリオ, Meiryo, “ＭＳ Ｐゴシック”, “MS PGothic”, sans-serif`
            }}
          >
            {item.user}
          </div>
          <span>:</span>
          <div
            className="text"
            style={{
              margin: "auto 5px"
            }}
            dangerouslySetInnerHTML={{__html: item.text}}
          />
        </div>
      ))}
    </div>
  )
}

export default Root