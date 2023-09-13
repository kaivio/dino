import aes from 'crypto-js/aes';
import sha256 from 'crypto-js/sha256';
import md5 from 'crypto-js/md5';
import base64 from 'crypto-js/enc-base64';
import hex from 'crypto-js/enc-hex';utf8 
import utf8 from 'crypto-js/enc-utf8';
import CTR from 'crypto-js/mode-ctr';
import CryptoJS from 'crypto-js';
import PADDING_ZERO from 'crypto-js/pad-zeropadding';
import FMT_OPENSSL from 'crypto-js/format-openssl';

var JsonFormatter = {
  stringify: function (cipherParams) {
    console.log('stringify: ',cipherParams);

    // create json object with ciphertext
    var jsonObj = { ct: cipherParams.ciphertext.toString(base64) };

    // optionally add iv or salt
    if (cipherParams.iv) {
      jsonObj.iv = cipherParams.iv.toString();
    }

    if (cipherParams.salt) {
      jsonObj.s = cipherParams.salt.toString();
    }

    // stringify json object
    console.log('stringify: ',jsonObj);

    return JSON.stringify(jsonObj);
  },
  parse: function (jsonStr) {
    console.log('parse: ',jsonStr);
    var jsonObj = JSON.parse(jsonStr);

    // extract ciphertext from json object, and create cipher params object
    var cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: base64.parse(jsonObj.ct)
    });


    if (jsonObj.iv) {
      cipherParams.iv = hex.parse(jsonObj.iv);
    }

    if (jsonObj.s) {
      cipherParams.salt = hex.parse(jsonObj.s);
    }

    return cipherParams;
  }
};


export function kdf(password) {
  return sha256(password)
}


export function enc(key, data) {
  let text = aes.encrypt(data, key, {
    iv:  md5(key),
    mode: CTR,
    padding: PADDING_ZERO,
    format: FMT_OPENSSL
  })

  console.log(text.toString());
  console.log(text.formatter.stringify(text));


  return text.formatter.stringify(text)
}

export function dec(key, data) {
  let text = aes.decrypt(data, key, {
    iv: md5(key),
    mode: CTR,
    padding: PADDING_ZERO,
    format: FMT_OPENSSL

  })

  console.log(text.toString());

  return text.toString(utf8)
}

export default { kdf, enc, dec }