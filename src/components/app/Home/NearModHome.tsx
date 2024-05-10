import { useEffect, useState } from "react";
import { CloseCircle, LocationTick } from "iconsax-react";
import { Link } from "react-router-dom";
import AppButton from "../AppButton";
import { useTonAddress } from "@tonconnect/ui-react";
import { useTonClient } from "../../../hooks/useTonClient";
import { Barter, Master } from "../../../contracts/Barter";
import { Address, toNano } from "@ton/core";
import config from "../../../../config";
import { useTonConnect } from "../../../hooks/useTonConnect";

function NearModHome() {
  const [selectedMod, setSelectedMod] = useState<Master | null>();
  const [notification, setNotification] = useState("");
  const [nickname, setNickname] = useState<string>("");
  const [amountBottle, setAmountBottle] = useState<bigint>(BigInt(0));
  const [handleSend, setHandleSend] = useState(false);

  const handleModClick = (mod: Master) => {
    setSelectedMod(mod);
  };

  const handleCloseDetail = () => {
    setSelectedMod(null);
  };

  // State : #
  const [master, setMaster] = useState<Master[]>();

  // Logic : ##
  const friendlyAddress = useTonAddress();
  const { sender } = useTonConnect();
  const client = useTonClient();
  const { barterContract } = config;
  useEffect(() => {
    const get = async () => {
      if (!client) return;
      const barterMaster = client.open(
        Barter.fromAddress(Address.parse(barterContract.toString()))
      );
      if (!friendlyAddress) return;
      const getMaster = await barterMaster.getMaster();
      setMaster(getMaster.values());

      const statusMaster = await barterMaster.getStatusMaster(
        Address.parse("0QBNwC2ou0P7AOxsahUPuUZQn71aTIxzXa9BnMWB0MQgAY1Y"),
        Address.parse(friendlyAddress.toString())
      );

      if (statusMaster === true) {
        setNotification("Sudah terkirim!");
      }

      if (handleSend) {
        barterMaster.send(
          sender,
          { value: toNano("0.01") },
          {
            $$type: "ArgSendBottle",
            masterAddress: Address.parse(
              "0QBNwC2ou0P7AOxsahUPuUZQn71aTIxzXa9BnMWB0MQgAY1Y"
            ),
            name: nickname.toString(),
            senderAddress: Address.parse(friendlyAddress),
            total: BigInt(amountBottle),
          }
        );
      }
    };
    get();
  }, [
    amountBottle,
    barterContract,
    client,
    friendlyAddress,
    handleSend,
    nickname,
    sender,
  ]);

  return (
    <>
      <div>
        <article className=" ">
          <div className="flex items-center gap-4">
            <div>
              <h3
                // onClick={() =>
                //   addMaster({
                //     masterAddress: Address.parse(
                //       "0QBNwC2ou0P7AOxsahUPuUZQn71aTIxzXa9BnMWB0MQgAY1Y"
                //     ),
                //     camp: " Udinus Gedung H, Jalan Pendrikan Kidul, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50131",
                //     phone: BigInt(6285872059178),
                //     name: "Sebastian",
                //   })
                // }
                className="text-lg font-medium text-neutral-800"
              >
                List Volunteer Klora !
              </h3>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {/* LIST MOD TERDEKAT */}

            {master?.map((mod, id) => (
              <li key={id}>
                <Link
                  to="#"
                  className="flex gap-2 items-center h-full rounded-lg border border-neutral-200 p-2 hover:bg-neutral-100"
                  onClick={() => handleModClick(mod)}
                >
                  <LocationTick
                    variant="Bulk"
                    className="w-10 h-10 text-primary-700"
                  />
                  <div>
                    <strong className="font-medium text-neutral-700">
                      {mod.name}
                    </strong>

                    <p className="mt-1 text-xs font-medium text-neutral-400">
                      {"TODO"}
                    </p>
                  </div>
                </Link>
                {/* DETAIL MOD */}
                {selectedMod && selectedMod.name === mod.name && (
                  <div className="mt-4 p-4 border border-neutral-200 space-y-2 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{mod.name}</h3>
                      <CloseCircle
                        onClick={handleCloseDetail}
                        variant="Bulk"
                        className="text-primary-600"
                      />
                    </div>
                    <img
                      src={"/avatar.jpg"}
                      alt={mod.name}
                      className="w-full mb-4"
                    />
                    <p className="text-sm">
                      <strong>Alamat: </strong> {mod.camp}
                    </p>
                    <p className="text-sm">
                      <strong>Nomer: </strong>
                      <Link
                        to={`https://wa.me/${mod.phone}`}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {Number(mod.phone)}
                      </Link>
                    </p>

                    {!notification && (
                      <div className="flex flex-col space-y-2 ">
                        <div className="flex items-center  justify-between">
                          <label
                            htmlFor="nick_name"
                            className="font-bold text-sm mr-2"
                          >
                            Nama panggilan:
                          </label>
                          <input
                            onChange={(e) => setNickname(e.target.value)}
                            type="text"
                            name="nick_name"
                            id="nick_name"
                            className="border rounded-md focus:outline-none focus:border-primary-500 p-1"
                            placeholder="Panggilanmu"
                          ></input>
                        </div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="jmlh_btl"
                            className="font-bold text-sm mr-2"
                          >
                            Jumlah Botol:
                          </label>
                          <input
                            onChange={(e) =>
                              setAmountBottle(BigInt(e.target.value))
                            }
                            type="number"
                            name="jmlh_btl"
                            id="jmlh_btl"
                            className="border rounded-md  focus:outline-none p-1 focus:border-primary-500"
                            placeholder="Jumlah Botol"
                          ></input>
                        </div>
                      </div>
                    )}

                    {notification && (
                      <div className="bg-green-200 text-green-800 p-2 rounded-md mt-2">
                        {notification}
                      </div>
                    )}
                    {!notification && (
                      <div className="flex justify-center ">
                        <AppButton
                          onClick={() => {
                            setHandleSend(true);
                            setNotification("Berhasil terkirim");
                          }}
                          text="Kirim"
                        />
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </>
  );
}

export default NearModHome;
