import { Address, OpenedContract, toNano, beginCell } from "@ton/core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useEffect, useState } from "react";
import { contractAddress } from "../contracts/address.json";
import { JettonMinter } from "../contracts/JettonMinter";
import { useTonConnect } from "./useTonConnect";
import { JettonWallet } from "../contracts/JettonWallet";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";

// let minterContract: OpenedContract<JettonMinter>;

export function useTokenContract() {
  // const [tonConnectUI, setOptions] = useTonConnectUI();

  const client = useTonClient();
  const [balance, setBalance] = useState<null | number | bigint>(null);
  const friendlyAddress = useTonAddress();

  const tokenWallet = useAsyncInitialize(async () => {
    if (!client) return;
    const jettonMinter = client.open(
      JettonMinter.createFromAddress(
        Address.parse("EQDW-Je4cLAQHhoMZxyTh8SFmOirbOucigMORwRYmoombuPQ")
      )
    );

    const tokenWallet = client.open(
      JettonWallet.createFromAddress(
        await jettonMinter.getWalletAddress(Address.parse(friendlyAddress))
      )
    );

    const balance_ = await tokenWallet.getJettonBalance();
    setBalance(Number(balance_));
    return tokenWallet;
  }, [client]);

  const contractState = useAsyncInitialize(async () => {
    if (!client) return;

    const state = client.getContractState(
      Address.parse("EQDW-Je4cLAQHhoMZxyTh8SFmOirbOucigMORwRYmoombuPQ")
    );
    return state;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!contractState) return;
      console.warn("DEBUG: ", contractState);
      if (contractState.state == "active" || contractState.code != null) {
        console.warn("This contract is active!");
      }
    }
    getValue();
  }, [contractState, tokenWallet]);

  return {
    balance,
    // sendTransfer: () => {
    //   const body = beginCell()
    //     .storeUint(0xf8a7ea5, 32) // jetton transfer op code
    //     .storeUint(0, 64) // query_id:uint64
    //     .storeCoins(100) // amount:(VarUInteger 16) -  Jetton amount for transfer (decimals = 6 - jUSDT, 9 - default)
    //     .storeAddress(
    //       Address.parse("EQAj_28o6i_FA804vqyCOJs0z_XK4Iih9JrmaxLWECN3YZJ7")
    //     ) // destination:MsgAddress
    //     .storeAddress(tokenWallet?.address) // response_destination:MsgAddress
    //     .storeUint(0, 1) // custom_payload:(Maybe ^Cell)
    //     .storeCoins(toNano(0.05)) // forward_ton_amount:(VarUInteger 16) - if >0, will send notification message
    //     .storeUint(0, 1) // forward_payload:(Either Cell ^Cell)
    //     .endCell();

    //   console.log(tokenWallet?.address.toString());

    //   console.log(tokenWallet?.address.toString());
    //   console.log(toNano("0.05").toString());
    //   console.log(body.toString());

    // return sender.send(tokenWallet?.address, toNano("0.1"), body);

    //   const myTransaction = {
    //     validUntil: Math.floor(Date.now() / 1000) + 360,
    //     messages: [
    //       {
    //         address: tokenWallet?.address, // sender jetton wallet
    //         amount: toNano("0.05"), // for commission fees, excess will be returned
    //         payload: body, // payload with jetton transfer body
    //       },
    //     ],
    //   };

    //   tokenWallet?.sendTransfer()

    //   console.log(Address.parse(friendlyAddress.toString()));
    //   let sentAmount = toNano("10");
    //   const sendResult = tokenWallet.sendTransfer(
    //     sender,
    //     toNano("0.1"), //tons
    //     sentAmount,
    //     Address.parse("EQAj_28o6i_FA804vqyCOJs0z_XK4Iih9JrmaxLWECN3YZJ7"),
    //     tokenWallet?.address,
    //     body.toBoc().toString("base64"),
    //     toNano("0.05"),
    //     null
    //   );
    //   console.log(sendResult.transactions);
    // },
  };
}

// Address.parse("EQCr01MS9krfPxU-X5p0MOAIEfATPiuwoCzGbH_Pdhd9mQyT"),
// const key = await mnemonicToWalletKey(
//   "language miss fancy carry trophy inner inside survey pluck adjust give dance buyer meat swallow mesh patrol exclude recall van okay pulp lamp outer".split(
//     " "
//   )
// );
// const wallet = WalletContractV4.create({
//   publicKey: key.publicKey,
//   workchain: 0,
// });
// const walletContract = client.open(wallet);
// const walletSender = walletContract.sender(key.secretKey);
