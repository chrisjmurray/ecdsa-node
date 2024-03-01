const { toHex, hexToBytes, utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

/*
Private Key:  7e0ba39488d3c69bacf4fde9657f26fabebd1cb4fe2ce708dd010a3fb0a51ff4
Public Key:  0343fa1d75b7deb21259eeb9d7572be870e999b9f18b40eb084aff66a576b9bcc1
Address:  07515d96246a76c65a4a69bb4856b4e6ad34611f
*/

const privKey1 = 'ffc52089e43e10431c5cb7716ba000695c2d8ef2bd8f977e19d0cd201738b051'
const privKey2 = '2630961b12a1b8743e38fdadc1dc305d7bab8c34500782df6739058918b915e8'
const privKey3 = 'ea80d22427a7d5d503b6039afd563e7455c9fa42887d4470bdfcf97a003c645f'
const privKey4 = '7e0ba39488d3c69bacf4fde9657f26fabebd1cb4fe2ce708dd010a3fb0a51ff4'
const publicKey1 = '0343fa1d75b7deb21259eeb9d7572be870e999b9f18b40eb084aff66a576b9bcc1'

const nextNonce = 3
let keyToUse = privKey1

signature = secp.secp256k1.sign(nextNonce.toString(16).padStart(64, '0'), keyToUse)
console.log(signature['r'].toString()+'x'+signature['s'].toString())