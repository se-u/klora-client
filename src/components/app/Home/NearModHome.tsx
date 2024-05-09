import { useState } from "react";
import { CloseCircle, LocationTick } from "iconsax-react";
import { Link } from "react-router-dom";
import AppButton from "../AppButton";

// Dummy data mod
const modData = [
    {
        id: 1,
        name: "Sen Arya",
        address:
            "Udinus Gedung H, Jalan Pendrikan Kidul, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50131",
        no_tlp: "6285872059178",
        image: "senarya.png",
        mapLink: "https://maps.app.goo.gl/E9M2589SUCKcVLPq8",
    },
    {
        id: 2,
        name: "Calvin Samuel",
        address:
            "Udinus Gedung D, Jl. Sadewa 2 No.8, Pendrikan Kidul, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50131",
        no_tlp: "6281227426908",
        image: "calvin.jpeg",
        mapLink: "https://maps.app.goo.gl/29YJXCyCtqFUNwSu5",
    },
];

function NearModHome() {
    const [selectedMod, setSelectedMod] = useState(null);
    const [notification, setNotification] = useState("");

    const handleModClick = (mod) => {
        setSelectedMod(mod);
    };

    const handleCloseDetail = () => {
        setSelectedMod(null);
    };

    const handleSend = () => {
        setNotification("Berhasil Terkirim");
        setTimeout(() => {
            setNotification("");
            setSelectedMod(null);
        }, 3000);
    };

    return (
        <>
            <div>
                <article className=" ">
                    <div className="flex items-center gap-4">
                        <div>
                            <h3 className="text-lg font-medium text-neutral-800">
                                List Volunteer Klora !
                            </h3>
                        </div>
                    </div>

                    <ul className="mt-4 space-y-2">
                        {/* LIST MOD TERDEKAT */}
                        {modData.map((mod) => (
                            <li key={mod.id}>
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
                                            {mod.address}
                                        </p>
                                    </div>
                                </Link>
                                {/* DETAIL MOD */}
                                {selectedMod && selectedMod.id === mod.id && (
                                    <div className="mt-4 p-4 border border-neutral-200 space-y-2 rounded-lg">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold">
                                                {selectedMod.name}
                                            </h3>
                                            <CloseCircle
                                                onClick={handleCloseDetail}
                                                variant="Bulk"
                                                className="text-primary-600"
                                            />
                                        </div>
                                        <img
                                            src={selectedMod.image}
                                            alt={selectedMod.name}
                                            className="w-full mb-4"
                                        />
                                        <p className="text-sm">
                                            <strong>Alamat: </strong>{" "}
                                            {selectedMod.address}
                                        </p>
                                        <p className="text-sm">
                                            <strong>Nomer: </strong>
                                            <Link
                                                to={`https://wa.me/${selectedMod.no_tlp}`}
                                                className="text-blue-600 underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {selectedMod.no_tlp}
                                            </Link>
                                        </p>
                                        <div className="flex flex-col space-y-2 ">
                                            <div className="flex items-center  justify-between">
                                                <label
                                                    htmlFor="nick_name"
                                                    className="font-bold text-sm mr-2"
                                                >
                                                    Nama panggilan:
                                                </label>
                                                <input
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
                                                    type="number"
                                                    name="jmlh_btl"
                                                    id="jmlh_btl"
                                                    className="border rounded-md  focus:outline-none p-1 focus:border-primary-500"
                                                    placeholder="Jumlah Botol"
                                                ></input>
                                            </div>
                                        </div>
                                        {notification && (
                                            <div className="bg-green-200 text-green-800 p-2 rounded-md mt-2">
                                                {notification}
                                            </div>
                                        )}
                                        <div className="flex justify-center ">
                                            <AppButton
                                                onClick={handleSend}
                                                text="Kirim"
                                            />
                                        </div>
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
