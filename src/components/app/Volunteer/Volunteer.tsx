import { useEffect, useState } from "react";
import { useBarterContracts } from "../../../hooks/useBarterContract";
import { Address } from "@ton/core";
import { useTonAddress } from "@tonconnect/ui-react";
import { SendBottle } from "../../../contracts/Barter";
import { TokenData } from "../../../hooks/TokenData";
import { JettonWallet } from "@ton/ton";
import { useTonClient } from "../../../hooks/useTonClient";

type SendBottleWithId = {
  id: number;
  $$type: "SendBottle";
  masterAddress: Address;
  name: string;
  senderAddress: Address;
  total: bigint;
};

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Volunteer() {
  const friendlyAddress = useTonAddress();
  const client = useTonClient();
  const { isMaster, master, sendBottles, clearSendAndUpdateUser } =
    useBarterContracts();
  const [myBottle, setMyBottle] = useState<number>();
  const [sendBottlesData, setSendBottlesData] = useState<SendBottleWithId[]>();
  const tokenData = TokenData();

  const [isVerified, setIsVerified] = useState<boolean | null>(false);
  const [verifiedNotification, setVerifiedNotification] = useState("");

  const handleVerify = async () => {
    if (tokenData.walletAddress) {
      const wallet = client?.open(
        JettonWallet.create(tokenData?.walletAddress)
      );
      const beforebalance = await wallet?.getBalance();
      await tokenData.transfer();

      let afterBalance = await wallet?.getBalance();
      let i = 0;

      while (beforebalance == afterBalance) {
        console.log("attemp", ++i);
        console.log("before", beforebalance);
        setIsVerified(true);
        setVerifiedNotification("Loading ..");
        afterBalance = await wallet?.getBalance();
        console.log("after", afterBalance);
        await sleep(4000);
      }

      setVerifiedNotification("Reward berhasil ditransfer.");
      // Update data pengguna jika perlu
    }
  };

  useEffect(() => {
    const totalBottle = master?.get(
      Address.parse(friendlyAddress)
    )?.totalBottle;
    if (isMaster) console.log("akses dijinkan");
    const addIds = (array: SendBottle[]) =>
      array.map((item, index) => ({ ...item, id: index + 1 }));
    if (sendBottles) {
      const sendBottlesData = addIds(sendBottles);
      setSendBottlesData(sendBottlesData);
    }
    setMyBottle(Number(totalBottle));
  }, [friendlyAddress, isMaster, master, sendBottles]);

  return (
    <div className="container mx-auto">
      <div className="mb-6 p-3 shadow-md rounded-md">
        <h1 className="font-semibold text-2xl">Halo Calvin 👋</h1>
        <div className="flex justify-between  mt-2 pb-1.5">
          <h2 className="text-neutral-700 font-medium">
            Anda berhasil menampung
          </h2>
          <p className="text-sm  text-neutral-400">{myBottle} Botol</p>
        </div>
      </div>
      <h1 className="text-xl font-semibold mb-4">List all users</h1>

      {/* Detail Pengguna */}
      {sendBottlesData && (
        <div className="bg-white p-4 rounded-md shadow-md mt-4">
          <div className="flex items-center mb-2">
            <span className="mr-2">Name:</span>
            <span className="font-semibold">{sendBottlesData[0].name}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="mr-2">Wallet Address:</span>
            <span className="font-semibold">
              {sendBottlesData[0].senderAddress.toString()}
            </span>
          </div>
          <div className="flex items-center mb-2">
            <span className="mr-2">Total Botol:</span>
            <input
              type="number"
              className="border rounded-md px-2 py-1"
              value={Number(sendBottlesData[0].total)}
            />
          </div>
          <div className="mb-2">
            {!isVerified ? (
              <div className="flex">
                <button
                  className="font-medium bg-primary-700 hover:bg-primary-600 text-white px-6 py-1 rounded-md mr-2"
                  onClick={handleVerify}
                >
                  Verify
                </button>
                <button className="font-medium bg-red-700 hover:bg-red-600 text-white px-6 py-1 rounded-md">
                  Cancel
                </button>
              </div>
            ) : (
              <div className="mt-4 bg-primary-500 text-white p-2 rounded-md">
                {verifiedNotification}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
