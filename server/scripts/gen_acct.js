const { toHex, hexToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function addressFromPublicHex(publicHex) {
    let publicKey = hexToBytes(publicHex);
    let khash = keccak256(publicKey.slice(1));
    return toHex(khash.slice(khash.length-20, khash.length));
}

const privateKey = secp.secp256k1.utils.randomPrivateKey();
console.log("Private Key: ", toHex(privateKey));
const publicKey = secp.secp256k1.getPublicKey(privateKey);
console.log("Public Key: ", toHex(publicKey));
const address = addressFromPublicKey('022b4f26ad17825424c21b64c24910fd9d383d11b7dd5ca387641bb518d70b2992')
console.log("Address: ", address)





