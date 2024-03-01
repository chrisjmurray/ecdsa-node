import { useState } from "react";
import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1'

function Transfer({ address, setBalance, setNonce }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signature, setSignature] = useState("");
  const [publicKey, setPublickKey] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance, nonce },
      } = await server.post(`send`, {
        senderPubHex: publicKey,
        amount: parseInt(sendAmount),
        recipientAddress: recipient,
        signature: signature
      });
      setBalance(balance);
      setNonce(nonce);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="Amount to Send"
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Recipient's Address"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>

      </label>

      <label>
        Public Key
        <input
          placeholder="Sender's Public Key"
          value={publicKey}
          onChange={setValue(setPublickKey)}
        ></input>
      </label>

      <label>
        Signature
        <input
          placeholder="Transaction Signature"
          value={signature}
          onChange={setValue(setSignature)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
