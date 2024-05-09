// import React from "react";

import { useTokenContract } from "../../hooks/useTokenContract";

function TopBar() {
  const { balance } = useTokenContract();
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
              {balance} BTL
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
