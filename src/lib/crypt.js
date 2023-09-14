import aes from 'crypto-js/aes';
import sha256 from 'crypto-js/sha256';
import utf8 from 'crypto-js/enc-utf8';

// import md5 from 'crypto-js/md5';
// import base64 from 'crypto-js/enc-base64';
// import hex from 'crypto-js/enc-hex';
// import CTR from 'crypto-js/mode-ctr';
// import CryptoJS from 'crypto-js';
// import PADDING_ZERO from 'crypto-js/pad-zeropadding';
// import FMT_OPENSSL from 'crypto-js/format-openssl';

export function hash(msg){
  return sha256(msg).toString()
}

export function kdf(password) {
  return sha256(password)
}


export function enc(key, data) {
  let text = aes.encrypt(data, key /*,{
    //iv:  md5(key),
    //mode: CTR,
    //padding: PADDING_ZERO,
    //format: FMT_OPENSSL
  }*/)

  return text.formatter.stringify(text)
}

export function dec(key, data) {
  let text = aes.decrypt(data, key)

  return text.toString(utf8)
}

export default {hash, kdf, enc, dec }
