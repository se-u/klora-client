// import React from "react";

import { useTonAddress } from "@tonconnect/ui-react";
import { TokenData } from "../../hooks/TokenData";
import { useEffect, useState } from "react";
import { Address } from "@ton/core";

function TopBar() {
  const friendlyAddress = useTonAddress();
  const { btl, transfer } = TokenData(
    "0QBNwC2ou0P7AOxsahUPuUZQn71aTIxzXa9BnMWB0MQgAY1Y"
  );

  const [balance, setBalance] = useState<null | number>(null);
  useEffect(() => {
    const get = async () => {
      if (btl) setBalance(btl);
    };
    get();
  }, [btl]);
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
            <p
              onClick={() => transfer()}
              className="text-sm font-semibold text-neutral-600"
            >
              {balance == null ? "loading.." : balance} BTL
            </p>
            {/* Angka token END*/}
            <img src="/BTLC.svg" alt="utility btl" className="w-7 h-7" />
          </div>
          {/* END UTILITY TOKEN */}

          {/* TOKEN */}
          <div className="flex gap-2  items-center">
            {/* Angka token */}
            <p className="text-sm font-semibold text-neutral-600">0.001 KLO</p>
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
