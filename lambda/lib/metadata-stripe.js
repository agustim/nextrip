'use strict'

import crypto from 'crypto';

module.exports.generateMetadata = async (mdkey, obj, secret) => {

  bodyCopy = JSON.parse(JSON.stringify(obj))

  // Encrypt info in metadata
  let algorithm = 'aes256';
  let inputEncoding = 'utf8';
  let outputEncoding = 'hex';
  let ivlength = 16  // AES blocksize

  let text = JSON.stringify(bodyCopy)

  let key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);

  console.log('Ciphering "%s" with key "%s" using %s', text, key, algorithm);

  let iv = crypto.randomBytes(ivlength);
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let ciphered = cipher.update(text, inputEncoding, outputEncoding);
  ciphered += cipher.final(outputEncoding);
  let ciphertext = iv.toString(outputEncoding) + ':' + ciphered

  console.log('Result in %s is "%s"', outputEncoding, ciphertext);

  return await splitMetadata(ciphered, mdkey, 500)
}

splitMetadata = async (text, key, maxChar) => {
  let ret = {}
  let mda = text.match(new RegExp('.{1,' + maxChar + '}', 'g'));
  for (let i=0; i < mda.length; i++) {
    value = await pad(i,2)
    ret[key + value] = mda [i]
  }
  console.log(ret)
  return ret
}

pad = async (num, size) => {
  let s = "00000" + num;
  return s.substr(s.length-size);
}