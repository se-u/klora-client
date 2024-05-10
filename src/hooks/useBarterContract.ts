import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import configContract from "../../config";
import { Barter, Master, SendBottle } from "../contracts/Barter";

import { Address, Dictionary, OpenedContract, toNano } from "@ton/core";
import { useEffect, useState } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import { useTonConnect } from "./useTonConnect";
export function useBarterContracts() {
  const { sender } = useTonConnect();
  const friendlyAddress = useTonAddress();
  const client = useTonClient();
  const [master, setMaster] = useState<Dictionary<Address, Master>>();
  const [myBottle, setMyBottle] = useState<bigint>();
  const [isMaster, setIsMaster] = useState<boolean | null>();
  const [sendBottles, setSendBottles] = useState<SendBottle[]>();
  const barter = useAsyncInitialize(async () => {
    if (!client) return;
    const barterAddress = Address.parse(configContract.barterContract);
    return client.open(
      Barter.fromAddress(barterAddress)
    ) as OpenedContract<Barter>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      const sender = Address.parse(friendlyAddress);
      if (!barter) return;
      setMaster(await barter.getMaster());
      setMyBottle(await barter.getTotalBottle(sender));
      setIsMaster(await barter.getIsMaster(sender));

      const getSendBottles = (await barter.getSendBottles()).values();
      setSendBottles(getSendBottles);
    }

    getValue();
  }, [barter, friendlyAddress]);

  const addMaster = async (args: {
    masterAddress: Address;
    name: string;
    camp: string;
    phone: bigint;
  }) => {
    if (!barter) {
      console.warn("cant get barter");
      return;
    }
    await barter.send(
      sender,
      {
        value: toNano(0.01),
      },
      {
        $$type: "ArgAddMaster",
        name: args.name,
        camp: args.camp,
        phone: args.phone,
        master: args.masterAddress,
        totalBottle: BigInt(0),
        status: false,
      }
    );
  };

  const sendBottle = async (
    masterAddress: Address,
    senderAddress: Address,
    name: string,
    total: bigint
  ) => {
    if (!barter) {
      console.warn("cant get barter");
      return;
    }
    await barter.send(
      sender,
      {
        value: toNano(0.01),
      },
      {
        $$type: "ArgSendBottle",
        masterAddress: masterAddress,
        senderAddress: senderAddress,
        name: name,
        total: total,
      }
    );
  };

  const statusMaster = async (
    masterAddress: Address,
    senderAddress: Address
  ) => {
    if (!barter) {
      console.warn("cant get barter");
      return;
    }
    return await barter.getStatusMaster(masterAddress, senderAddress);
  };

  const clearSendAndUpdateUser = async (
    masterAddress: Address,
    userAddress: Address,
    amount: bigint
  ) => {
    if (!barter) {
      console.warn("cant get barter");
      return;
    }
    await barter.send(
      sender,
      {
        value: toNano(0.01),
      },
      {
        $$type: "ArgClearSendBottle",
        masterAddress,
      }
    );

    await barter.send(
      sender,
      {
        value: toNano(0.01),
      },
      {
        $$type: "ArgVerifyBottle",
        address: userAddress,
        amount: amount,
      }
    );
  };

  return {
    isMaster,
    master,
    myBottle,
    sendBottles,
    addMaster,
    sendBottle,
    statusMaster,
    clearSendAndUpdateUser,
  };
}
