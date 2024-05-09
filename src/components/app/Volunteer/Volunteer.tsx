import { useState } from 'react';

// Contoh data pengguna
const userData = {
    id: 1,
    name: 'Sebastian',
    walletAddress: '0xabc123',
    totalBottles: 50,
    isVerified: false,
};

export default function Volunteer() {
    const [user, setUser] = useState(userData);
    const [showDetail, setShowDetail] = useState(false); // State untuk menampilkan detail pengguna
    const [isVerified, setIsVerified] = useState(user.isVerified);
    const [verifiedNotification, setVerifiedNotification] = useState('');

    const handleShowDetail = () => {
        setShowDetail(!showDetail);
    };

    const handleVerify = () => {
        setIsVerified(true);
        setVerifiedNotification('Botol tervertifikasi.');
        // Update data pengguna jika perlu
        setUser(prevUser => ({ ...prevUser, isVerified: true }));
    };

    return (
        <div className="container mx-auto">
            <div className="mb-6 p-3 shadow-md rounded-md">
                <h1 className="font-semibold text-2xl">Halo Calvin 👋</h1>
                <div className="flex justify-between  mt-2 pb-1.5">
                    <h2 className="text-neutral-700 font-medium">
                        Anda berhasil menampung
                    </h2>
                    <p className="text-sm  text-neutral-400">100 Botol</p>
                </div>
            </div>
            <h1 className="text-xl font-semibold mb-4">List all users</h1>
            {/* Card Pengguna */}
            <div
                className="bg-white p-4 rounded-md shadow-md cursor-pointer"
                onClick={handleShowDetail}
            >
                <div className="flex justify-between  mb-2">
                    <span className="font-medium text-neutral-700">{user.name}</span>
                    <span className="font-medium bg-primary-600 text-white py-1 px-3 rounded-md">Detail</span>
                </div>
            </div>

            {/* Detail Pengguna */}
            {showDetail && (
                <div className="bg-white p-4 rounded-md shadow-md mt-4">
                    <div className="flex items-center mb-2">
                        <span className="mr-2">Name:</span>
                        <span className="font-semibold">{user.name}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="mr-2">Wallet Address:</span>
                        <span className="font-semibold">{user.walletAddress}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="mr-2">Total Botol:</span>
                        <input
                            type="number"
                            className="border rounded-md px-2 py-1"
                            value={user.totalBottles}
                            onChange={(e) => setUser(prevUser => ({ ...prevUser, totalBottles: e.target.value }))}
                        />
                    </div>
                    <div className="mb-2">
                        {!isVerified && (
                            <button className="ml-4 font-medium bg-primary-600 hover:bg-primary-700 text-white px-6 py-1 rounded-md"
                                    onClick={handleVerify}
                            >
                                Verify
                            </button>
                        )}
                    </div>
                    {/* Notifikasi Vertifikasi */}
                    {verifiedNotification && (
                        <div className="mt-4 bg-primary-500 text-white p-2 rounded-md">
                            {verifiedNotification}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
