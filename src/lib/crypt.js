import crypto from "crypto"


export function kdf(password) {
  let key = crypto.createHash('sha256')
    .update(password)
    .digest('base64')
  return key
}

export function encrypt(key, data) {
  let key = Buffer.from(key, 'base64')
  let iv = crypto.randomFillSync(Buffer.alloc(16))
  data = Buffer.from(data)
  let cipher = crypto
    .createCipheriv('aes-256-cbc', key, iv)
  let size = Buffer.alloc(4)
  size.writeInt32LE(data.length)

  let makeup = 0
  let last_block = data.length % 32
  if (last_block != 0) {
    makeup = 32 - last_block
    data = Buffer.concat([
      data,
      Buffer.alloc(makeup, 0)])
  }
  let encrypted = cipher.update(data)

  let res = Buffer.concat([iv, size, encrypted])
  return res.toString('base64')
}

export function decrypt(key, data) {
  data = Buffer.from(data, 'base64')
  let key = Buffer.from(key, 'base64')
  let iv = data.slice(0, 16)
  let size = data.slice(16, 20).readInt32LE(0)

  let decipher = crypto
    .createDecipheriv('aes-256-cbc', key, iv)

  let block = data.slice(20)
  block = Buffer.concat([block, Buffer.from("🤔")])
  let decrypted = decipher.update(block)
  // console.log("bytes: " + size) // 24
  // console.log('block: ' + decrypted.length) // 16 ??? 
  // console.log('sum: ' + data.length) // 52
  // // 52 - 20 = 32 !!!!! 
  return decrypted.slice(0, size).toString()
}

export default {
  kdf,
  encrypt,
  decrypt
}