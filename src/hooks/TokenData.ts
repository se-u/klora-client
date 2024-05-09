import {
  Address,
  JettonMaster,
  JettonWallet,
  TonClient,
  beginCell,
  toNano,
} from "@ton/ton";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useState } from "react";

export function TokenData(MY_WALLET_ADDRESS: string) {
  const [tonConnectUI] = useTonConnectUI();
  const [balance, setBalance] = useState(0);
  const client = new TonClient({
    endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
    apiKey: "24cf68e62988d24e0b2135faad64851d79a80d9fb391df2b83f13ab182c634a8",
  });
  const info = {
    address: "EQDW-Je4cLAQHhoMZxyTh8SFmOirbOucigMORwRYmoombuPQ", //
    decimals: 1,
  };
  const jettonMaster = client.open(
    JettonMaster.create(Address.parse(info.address))
  );

  const jettonData = useAsyncInitialize(async () => {
    const userAddress = Address.parse(MY_WALLET_ADDRESS);
    const jettonUserAddress = await jettonMaster.getWalletAddress(userAddress);
    const jettonWallet = client.open(JettonWallet.create(jettonUserAddress));
    const balance = await jettonWallet.getBalance();
    setBalance(Number(balance));
  }, []);

  return {
    btl: balance,
    transfer: async (
      destinationAddress: string = "EQBbvsnZDVnPkXpT8yd-ZHlPOyz9nZ-HLadQ_4m8p-N21xrl",
      sourceAddress: string = "EQBNM5IGnQZCCC-z3xvCKGCaMkvubCNJDq1q-0u7WbSqyJu_"
    ) => {
      // transfer#0f8a7ea5 query_id:uint64 amount:(VarUInteger 16) destination:MsgAddress
      // response_destination:MsgAddress custom_payload:(Maybe ^Cell)
      // forward_ton_amount:(VarUInteger 16) forward_payload:(Either Cell ^Cell)
      // = InternalMsgBody;

      const forwardPayload = beginCell()
        .storeUint(0, 32) // 0 opcode means we have a comment
        .storeStringTail("Get Reward")
        .endCell();

      const body = beginCell()
        .storeUint(0x0f8a7ea5, 32) // opcode for jetton transfer
        .storeUint(0, 64) // query id
        .storeCoins(5) // jetton amount, amount * 10^9
        .storeAddress(
          Address.parse("EQBbvsnZDVnPkXpT8yd-ZHlPOyz9nZ-HLadQ_4m8p-N21xrl")
        ) // TON wallet destination address
        .storeAddress(
          Address.parse("EQBbvsnZDVnPkXpT8yd-ZHlPOyz9nZ-HLadQ_4m8p-N21xrl")
        ) // response excess destination
        .storeBit(0) // no custom payload
        .storeCoins(toNano("0.02")) // forward amount (if >0, will send notification message)
        .storeBit(1) // we store forwardPayload as a reference
        .storeRef(forwardPayload)
        .endCell();

      // old
      // const body = beginCell()
      //   .storeUint(0xf8a7ea5, 32) // jetton transfer op code
      //   .storeUint(0, 64) // query_id:uint64
      //   .storeCoins(100) // amount:(VarUInteger 16) -  Jetton amount for transfer (decimals = 6 - jUSDT, 9 - default)
      //   .storeAddress(
      //     Address.parse("EQAj_28o6i_FA804vqyCOJs0z_XK4Iih9JrmaxLWECN3YZJ7")
      //   ) // destination:MsgAddress
      //   .storeAddress(
      //     Address.parse("EQBNM5IGnQZCCC-z3xvCKGCaMkvubCNJDq1q-0u7WbSqyJu_")
      //   ) // response_destination:MsgAddress
      //   .storeUint(0, 1) // custom_payload:(Maybe ^Cell)
      //   .storeCoins(toNano(0.05)) // forward_ton_amount:(VarUInteger 16) - if >0, will send notification message
      //   .storeBit(1) // we store forwardPayload as a reference
      //   .storeRef(forwardPayload)
      //   .endCell();

      const transaction = {
        messages: [
          {
            address:
              "EQBNM5IGnQZCCC-z3xvCKGCaMkvubCNJDq1q-0u7WbSqyJu_".toString(), // sender jetton wallet
            amount: toNano("0.1").toString(), // for commission fees, excess will be returned
            payload: body.toBoc().toString("base64"), // payload with jetton transfer and comment body
          },
        ],
        validUntil: Math.floor(Date.now() / 1000) + 360,
      };

      const result = await tonConnectUI.sendTransaction(transaction);
      console.log(result);
    },
  };
}
