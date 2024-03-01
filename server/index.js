const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const { toHex, hexToBytes, utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());

const accounts = {
  "0725804149fb96017a8bc94ec31a9ae57d1a306e": {"balance": 7086, "nonce": 1},
  "cc800203a02933b661e584530cc56a1697e1ab1e": {"balance": 2274, "nonce": 3},
  "05b6fcd1df04a1f0de923a681488ff76478619a9": {"balance": 2621, "nonce": 12},
  "07515d96246a76c65a4a69bb4856b4e6ad34611f": {"balance": 9835, "nonce": 7},
};

function addressFromPublicHex(publicHex) {
  let publicKey = hexToBytes(publicHex);
  let khash = keccak256(publicKey.slice(1));
  return toHex(khash.slice(khash.length-20, khash.length));
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = accounts[address]['balance'] || 0;
  const nonce = accounts[address]['nonce'] || 0;
  res.send({ balance, nonce });
});

app.post("/send", (req, res) => {
  const { senderPubHex, recipientAddress, amount, signature } = req.body;
  const senderAddress = addressFromPublicHex(senderPubHex);
  const [r, s] = signature.split('x');
  const msg = accounts[senderAddress]['nonce'].toString(16).padStart(64, '0')

  setInitialBalance(senderAddress);
  setInitialBalance(recipientAddress);
  

  if (secp.secp256k1.verify({'r': BigInt(r), 's': BigInt(s)}, msg, senderPubHex)) {
    if (accounts[senderAddress]['balance'] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else if (amount < 0) {
      res.status(400).send({ message: "Nice try!" });
    } else {
      accounts[senderAddress]['nonce'] += 1;
      accounts[senderAddress]['balance']  -= amount;
      accounts[recipientAddress]['balance']  += amount;
      const balance = accounts[senderAddress]['balance'];
      const nonce = accounts[senderAddress]['nonce'];
      res.send({ balance, nonce });
    } 
  } else {
    res.status(400).send({ message: "Invalid Signature!" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!accounts[address]) {
    balances[address] = {'balance': 0, 'nonce': 1};
  }
}
