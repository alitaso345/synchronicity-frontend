import * as React from 'react'
import { useState, useEffect } from 'react'

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

const App: React.FC = () => {
  const [messages, update] = useState<Message[]>([])
  const eventSource = new EventSource(`${host}/events`)

  useEffect(
    () => {
      eventSource.onmessage = e => {
        console.log(e.data)
        const data = JSON.parse(e.data)
        const message = convertToMessage(data)
        update(_messges => [message, ..._messges])
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
              src={item.platform === "twitter" ? "../Twitter_Social_Icon_Circle_Color.png" : "../iconfinder_16_940984.png"}
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
          >
            {item.text}
          </div>
        </div>
      ))}
    </div>
  )
}

export default App