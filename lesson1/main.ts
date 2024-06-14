import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, WalletContractV4, fromNano, internal } from "ton";
import { mnemonicToWalletKey } from "ton-crypto";
import dotenv from 'dotenv'; 
async function main() {
    dotenv.config();
    
    const mnemonic = process.env.MNEMONIC_PHRASE || ""
    const key = await mnemonicToWalletKey(mnemonic.split(" "))
    const wallet = WalletContractV4.create({publicKey: key.publicKey, workchain: 0})

    const endpoint = await getHttpEndpoint({network: "testnet"})
    const client = new TonClient({endpoint})

    console.log("wallet address: ", wallet.address)


    if (!await client.isContractDeployed(wallet.address)) {
        return console.log("wallet is not deployed")
    }


    console.log("wallet is deployed - ", wallet.address)

    const balance = await client.getBalance(wallet.address)

    console.log("balance: ", fromNano(balance))

    const nftAddreass = process.env.ADDRESS || ""

    const walletContract = client.open(wallet)
    const seqno = await walletContract.getSeqno()

    await walletContract.sendTransfer({
        secretKey: key.secretKey,
        seqno: seqno,
        messages: [
            internal({
                to: nftAddreass,
                value: "0.05",
                body: "Hello",
                bounce: false
            })
        ]
    })

    let currentSeqno = seqno
    while(currentSeqno == seqno) {
        console.log("wait for transaction to confirm...")
        await sleep(1500)
        currentSeqno = await walletContract.getSeqno()
    }
    console.log("transaction confirmed")
}

main()

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}