import {
  Address,
  TonClient,
  Cell,
  // beginCell,
  // storeMessage,
  JettonMaster,
  Transaction,
} from "@ton/ton";

export async function retry<T>(
  fn: () => Promise<T>,
  options: { retries: number; delay: number }
): Promise<T> {
  let lastError: Error | undefined;
  for (let i = 0; i < options.retries; i++) {
    try {
      return await fn();
    } catch (e) {
      if (e instanceof Error) {
        lastError = e;
      }
      await new Promise((resolve) => setTimeout(resolve, options.delay));
    }
  }
  throw lastError;
}

export async function tryProcessJetton(
  MY_WALLET_ADDRESS: string
): Promise<string> {
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
  const userAddress = Address.parse(MY_WALLET_ADDRESS);
  const jettonUserAddress = await jettonMaster.getWalletAddress(userAddress);

  // Subscribe

  const Subscription = async (): Promise<Transaction[]> => {
    const client = new TonClient({
      endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
      apiKey:
        "24cf68e62988d24e0b2135faad64851d79a80d9fb391df2b83f13ab182c634a8",
    });

    const myAddress = jettonUserAddress; // Address of receiver TON wallet
    const transactions = await client.getTransactions(myAddress, {
      limit: 5,
    });
    return transactions;
  };

  return retry(
    async () => {
      const Transactions = await Subscription();
      let i = 0;
      for (const tx of Transactions) {
        console.log(++i);
        const sourceAddress = tx.inMessage?.info.src;
        console.log(sourceAddress?.toString());
        if (!sourceAddress) {
          // external message - not related to jettons
          console.log("!sourceAddress");
          continue;
        }

        if (!(sourceAddress instanceof Address)) {
          console.log("!sourceAddress instanfe of Address");
          continue;
        }

        const in_msg = tx.inMessage;
        console.log(in_msg);

        if (in_msg?.info.type !== "internal") {
          // external message - not related to jettons
          console.log("external message - not related to jettons");
          continue;
        }

        // jetton master contract address check
        // const jettonName = jettonWalletAddressToJettonName(sourceAddress);
        // if (!jettonName) {
        //   // unknown or fake jetton transfer
        //   console.log("unknown or fake jetton transfer");
        //   continue;
        // }

        if (
          tx.inMessage === undefined ||
          tx.inMessage?.body.hash().equals(new Cell().hash())
        ) {
          // no in_msg or in_msg body
          console.log("no in_msg or in_msg body");
          continue;
        }

        // const msgBody = tx.inMessage;
        // const sender = tx.inMessage?.info.src;
        const originalBody = tx.inMessage?.body.beginParse();
        const body = originalBody?.clone();
        // const op = body?.loadUint(32);
        // if (!(op == 0x7362d09c)) {
        //   continue; // op == transfer_notification
        // }

        console.log("op code check passed", tx.hash().toString("hex"));

        // const queryId = body?.loadUint(64);
        const amount = body?.loadCoins();
        // const from = body?.loadAddress();
        // const maybeRef = body?.loadBit();
        // const payload = maybeRef ? body?.loadRef().beginParse() : body;
        // const payloadOp = payload?.loadUint(32);
        // if (!(payloadOp == 0)) {
        //   console.log("no text comment in transfer_notification");
        //   continue;
        // }

        // const comment = payload?.loadStringTail();
        // if (!(comment == orderId)) {
        //   continue;
        // }

        console.log(
          "Got " +
            "btl" +
            " jetton deposit " +
            amount?.toString() +
            ' units with text comment "' +
            // comment +
            '"'
        );
        const txHash = tx.hash().toString("hex");
        return txHash;
      }
      //   throw new Error("Transaction not found");
    },
    { retries: 2, delay: 5000 }
  );
}
