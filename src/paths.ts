export const host = process.env.NODE_ENV === 'production' ? 'https://synchronicity-backend.herokuapp.com' : 'http://localhost:5000'

export const putSettingsPath = `${host}/settings`
