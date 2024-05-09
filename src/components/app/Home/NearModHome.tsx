import { useState } from 'react';
import { LocationTick } from "iconsax-react";
import { Link } from "react-router-dom";

// Dummy data mod
const modData = [
    {
        id: 1,
        name: 'Sen Arya',
        address: 'Udinus Gedung H, Jalan Pendrikan Kidul, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50131',
        no_tlp: '6285872059178',
        image: 'senarya.png',
        mapLink: 'https://maps.app.goo.gl/E9M2589SUCKcVLPq8'
    },
    {
        id: 2,
        name: 'Calvin Samuel',
        address: 'Udinus Gedung D, Jl. Sadewa 2 No.8, Pendrikan Kidul, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50131',
        no_tlp: '6281227426908',
        image: 'calvin.jpeg',
        mapLink: 'https://maps.app.goo.gl/29YJXCyCtqFUNwSu5'
    },
];

function NearModHome() {
    const [selectedMod, setSelectedMod] = useState(null);

    const handleModClick = (mod) => {
        setSelectedMod(mod);
    };

    const handleCloseDetail = () => {
        setSelectedMod(null);
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
                                    <div className="mt-4 p-4 border border-neutral-200 rounded-lg">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold">{selectedMod.name}</h3>
                                            <button className="text-red-500" onClick={handleCloseDetail}>
                                                Close
                                            </button>
                                        </div>
                                        <img src={selectedMod.image} alt={selectedMod.name} className="w-full mb-4" />
                                        <p><strong>Alamat: </strong> {selectedMod.address}</p>
                                        <p><strong>Nomer: </strong><Link to={`https://wa.me/${selectedMod.no_tlp}`} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{selectedMod.no_tlp}</Link></p>
                                        <Link to={selectedMod.mapLink} target="_blank" rel="noopener noreferrer" className="block mt-4 bg-primary-700 hover:bg-primary-600 py-1 rounded-md text-white text-center">Kesana Sekarang</Link>
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
