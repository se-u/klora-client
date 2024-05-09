import {
  Address,
  TonClient,
  Cell,
  // beginCell,
  // storeMessage,
  JettonMaster,
  OpenedContract,
  JettonWallet,
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
  orderId: string,
  MY_WALLET_ADDRESS: string
): Promise<string> {
  const client = new TonClient({
    endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
    apiKey: "24cf68e62988d24e0b2135faad64851d79a80d9fb391df2b83f13ab182c634a8",
  });

  interface JettonInfo {
    address: string;
    decimals: number;
  }

  interface Jettons {
    jettonMinter: OpenedContract<JettonMaster>;
    jettonWalletAddress: Address;
    jettonWallet: OpenedContract<JettonWallet>;
  }

  const JETTONS_INFO: Record<string, JettonInfo> = {
    BTL: {
      address: "EQDW-Je4cLAQHhoMZxyTh8SFmOirbOucigMORwRYmoombuPQ", //
      decimals: 1,
    },
  };
  const jettons: Record<string, Jettons> = {};

  const prepare = async () => {
    for (const name in JETTONS_INFO) {
      const info = JETTONS_INFO[name];
      const jettonMaster = client.open(
        JettonMaster.create(Address.parse(info.address))
      );
      const userAddress = Address.parse(MY_WALLET_ADDRESS);
      const jettonUserAddress = await jettonMaster.getWalletAddress(
        userAddress
      );
      const jettonWallet = client.open(JettonWallet.create(jettonUserAddress));
      const balance = await jettonWallet.getBalance();

      //const jettonData = await jettonWallet;
      const jettonData = await client.runMethod(
        jettonUserAddress,
        "get_wallet_data"
      );
      jettonData.stack.pop(); //skip balance
      jettonData.stack.pop(); //skip owneer address
      const adminAddress = jettonData.stack.readAddress();

      if (adminAddress.toString() !== Address.parse(info.address).toString()) {
        throw new Error(
          "jetton minter address from jetton wallet doesnt match config"
        );
      }

      jettons[name] = {
        jettonMinter: jettonMaster,
        jettonWalletAddress: jettonUserAddress,
        jettonWallet: jettonWallet,
      };
    }
  };

  const jettonWalletAddressToJettonName = (jettonWalletAddress: Address) => {
    const jettonWalletAddressString = jettonWalletAddress.toString();
    for (const name in jettons) {
      const jetton = jettons[name];

      if (
        jetton.jettonWallet.address.toString() === jettonWalletAddressString
      ) {
        return name;
      }
    }
    return null;
  };

  // Subscribe

  const Subscription = async (): Promise<Transaction[]> => {
    const client = new TonClient({
      endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
      apiKey:
        "24cf68e62988d24e0b2135faad64851d79a80d9fb391df2b83f13ab182c634a8",
    });

    const myAddress = Address.parse(
      "EQCr01MS9krfPxU-X5p0MOAIEfATPiuwoCzGbH_Pdhd9mQyT"
    ); // Address of receiver TON wallet
    const transactions = await client.getTransactions(myAddress, {
      limit: 5,
    });
    return transactions;
  };

  return retry(
    async () => {
      await prepare();
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
        const jettonName = jettonWalletAddressToJettonName(sourceAddress);
        if (!jettonName) {
          // unknown or fake jetton transfer
          console.log("unknown or fake jetton transfer");
          continue;
        }

        if (
          tx.inMessage === undefined ||
          tx.inMessage?.body.hash().equals(new Cell().hash())
        ) {
          // no in_msg or in_msg body
          console.log("no in_msg or in_msg body");
          continue;
        }

        const msgBody = tx.inMessage;
        const sender = tx.inMessage?.info.src;
        const originalBody = tx.inMessage?.body.beginParse();
        let body = originalBody?.clone();
        const op = body?.loadUint(32);
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
            jettonName +
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
    { retries: 1, delay: 4000 }
  );
}
