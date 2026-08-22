const { decrypt } = require('./crypto')

function getSession(req) {
  const cookie = req.cookies.get('rc_session')
  if (!cookie) return null
  const decrypted = decrypt(cookie.value)
  if (!decrypted) return null
  try {
    return JSON.parse(decrypted)
  } catch {
    return null
  }
}

module.exports = { getSession }
