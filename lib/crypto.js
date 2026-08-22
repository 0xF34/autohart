const crypto = require('crypto')

const KEY = process.env.ENCRYPTION_KEY || 'autohar-key'

function generateToken(length = 20) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let token = ''
  for (let i = 0; i < length; i++) {
    token += chars[crypto.randomInt(chars.length)]
  }
  return token
}

function encrypt(text) {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(KEY.padEnd(32).slice(0, 32)), iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return iv.toString('hex') + ':' + encrypted
}

function decrypt(text) {
  try {
    const parts = text.split(':')
    const iv = Buffer.from(parts[0], 'hex')
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(KEY.padEnd(32).slice(0, 32)), iv)
    let decrypted = decipher.update(parts[1], 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  } catch {
    return ''
  }
}

module.exports = { generateToken, encrypt, decrypt }
