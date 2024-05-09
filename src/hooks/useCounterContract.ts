import { Address, OpenedContract, toNano, Sender } from "@ton/core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
// import { useTonConnect } from "./useTonConnect";
// import { counterContract } from "../contracts/counterContract";
import { Counter } from "../contracts/Counter";
import { useEffect, useState } from "react";
import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4 } from "@ton/ton";
import { contractAddress } from "../contracts/address.json";
import { useTonConnect } from "./useTonConnect";
export function useCounterContract() {
  // -----
  const [counter, setCounter] = useState<null | number | bigint>(null);
  // const [sender, setSender] = useState<null | Sender>(null);
  const [balance, setBalance] = useState<null | bigint>(null);
  const client = useTonClient();
  const { sender } = useTonConnect();
  //   const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const address = Address.parse(contractAddress);
    const key = await mnemonicToWalletKey(
      "language miss fancy carry trophy inner inside survey pluck adjust give dance buyer meat swallow mesh patrol exclude recall van okay pulp lamp outer".split(
        " "
      )
    );
    const wallet = WalletContractV4.create({
      publicKey: key.publicKey,
      workchain: 0,
    });
    const walletContract = client.open(wallet);
    const walletSender = walletContract.sender(key.secretKey);
    // setSender(walletSender);

    return client.open(Counter.fromAddress(address)) as OpenedContract<Counter>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!counterContract) return;
      setCounter(await counterContract.getCounter());
      setBalance(await counterContract.getBalance());
      // getValue();
    }
    getValue();
  }, [counterContract]);

  return {
    contract_address: Address.parse(contractAddress),
    contract_balance: balance,
    counter_value: counter?.toString(),
    sendIncrement: async () => {
      await counterContract?.send(
        sender,
        {
          value: toNano("0.05"),
        },
        {
          $$type: "Add",
          queryId: 0n,
          amount: 1n,
        }
      );

      const counterBefore = BigInt(5);
      let counterAfter = await counterContract?.getCounter();
      let attempt = 1;
      while (counterAfter === counterBefore) {
        console.log("antempt ke", attempt);
        counterAfter = await counterContract?.getCounter();
        attempt++;
      }

      // console.log(result)
    },
  };
}
