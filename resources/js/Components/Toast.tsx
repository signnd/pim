import React, { useState, useEffect } from "react";

const Toast = ({ message, type = "success", show = false, onClose }) => {
    // Kendalikan kemunculan toast
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        if (show) {
            setVisible(true);
            // Pesan toast akan hilang dalam 3 detik
            const timer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose(); // Callback untuk menyembunyikan toast
            }, 3000);

            // Reset timeout saat komponen sudah hilang
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!visible) return null; // Jangan render jika tidak terlihat

    // Tentukan warna background dari tipe message (success, error, warning, etc.)
    const bgColor = type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-yellow-500";

    return (
        <div
            className={`fixed top-5 right-5 z-50 flex items-center ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg`}
            role="alert"
        >
            <span className="mr-2 text-xl">✅</span>
            <div className="text-sm font-semibold">{message}</div>
        </div>
    );
};

export default Toast;
