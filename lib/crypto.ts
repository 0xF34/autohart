import crypto from 'crypto'

const KEY = process.env.ENCRYPTION_KEY || 'autohar-key'

export function generateToken(length: number = 20): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let token = ''
  for (let i = 0; i < length; i++) {
    token += chars[crypto.randomInt(chars.length)]
  }
  return token
}

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(KEY.padEnd(32).slice(0, 32)), iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return iv.toString('hex') + ':' + encrypted
}

export function decrypt(text: string): string {
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
