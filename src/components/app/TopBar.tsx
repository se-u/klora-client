// import React from "react";
// import { TokenData } from "../../hooks/TokenData";
import { useEffect, useState } from "react";
import { Address, JettonMaster, JettonWallet } from "@ton/ton";
import config from "../../../config";
import { useTonAddress } from "@tonconnect/ui-react";
import { useTonClient } from "../../hooks/useTonClient";

function TopBar() {
  const friendlyAddress = useTonAddress();
  const client = useTonClient();
  const { utilityContract } = config;

  const [balance, setBalance] = useState<null | number>(null);
  const [tonBalance, setTonBalance] = useState<null | number>(null);
  useEffect(() => {
    const get = async () => {
      if (!client) return;
      const jettonMaster = client.open(
        JettonMaster.create(Address.parse(utilityContract.toString()))
      );

      if (!friendlyAddress) return;
      const tonBalance = await client.getBalance(
        Address.parse(friendlyAddress.toString())
      );
      setTonBalance(Number(tonBalance) / 1000000000);
      const jettonAddress = await jettonMaster.getWalletAddress(
        Address.parse(friendlyAddress.toString())
      );

      const jettonWallet = client.open(JettonWallet.create(jettonAddress));
      const balance = await jettonWallet.getBalance();
      setBalance(Number(balance));
    };
    get();
  }, [client, friendlyAddress, utilityContract]);
  return (
    <>
      <div className="flex justify-between px-3 py-4 border overflow-x-auto">
        {/* Profil User */}
        <div className="w-12 h-12 rounded-full border ">
          <img
            src="/avatar.jpg"
            alt="icon"
            className="rounded-full w-12 h-12 "
          />
        </div>
        {/* END OF Profil User */}

        {/* Start TOKEN*/}
        <div className="flex  items-center gap-3">
          {/* UTILITY TOKEN */}
          <div className="flex gap-2  items-center">
            {/* Angka token */}
            <p className="text-sm font-semibold text-neutral-600">
              {balance == null ? "loading.." : balance} BTL
            </p>
            {/* Angka token END*/}
            <img src="/BTLC.svg" alt="utility btl" className="w-7 h-7" />
          </div>
          {/* END UTILITY TOKEN */}

          {/* TOKEN */}
          <div className="flex gap-2  items-center">
            {/* Angka token */}
            <p className="text-sm font-semibold text-neutral-600">
              {tonBalance} KLO
            </p>
            {/* Angka token END */}
            <img src="/KLOC.svg" alt="crypto KLO" className="w-7 h-7" />
          </div>
          {/* END TOKEN */}
        </div>
        {/* END TOKEN*/}
      </div>
    </>
  );
}

export default TopBar;
