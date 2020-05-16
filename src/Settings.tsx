import * as React from 'react'
import { useState, useEffect } from 'react'
import { settingsPath } from './paths'

const Setting: React.FC = () => {
  const [hashTag, updateHashTag] = useState('')
  const [channel, updateChannel] = useState('')

  useEffect(
    () => {
      const fetchHashTagAndChannel = async () => {
        const res = await fetch(settingsPath)
        const json = await res.json()

        updateHashTag(json.hashTag)
        updateChannel(json.channel)
      }

      fetchHashTagAndChannel()
    }, [])

  const submitHandler = async (): Promise<void> => {
    const res = await fetch(settingsPath, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ hashTag: hashTag, channel: channel})
    })

    if (res.status === 204) {
      alert('設定変更が完了しました')
    } else {
      alert('設定の変更に失敗しました')
    }
  }

  return (
    <div>
      <h2>設定ページ</h2>
      <div>
        <label>Twitterハッシュタグ</label>
        <input
          placeholder="#mogra"
          value={hashTag}
          onChange={(e) => updateHashTag(e.currentTarget.value)}
        />
      </div>

      <div>
        <label>Twitchチャンネル名</label>
        <input
          placeholder="#mogra"
          value={channel}
          onChange={(e) => updateChannel(e.currentTarget.value)}
        />
      </div>

      <button onClick={submitHandler}>変更する</button>
    </div>
  )
}

export default Setting