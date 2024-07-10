const CheckModal = ({ message, isOpen, onClose, visitorNames }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
            <div className="bg-white p-8 rounded-lg shadow-lg z-10">
                <h2 className="text-xl mb-4">Informasi Pengunjung</h2>
                <p>{message}</p>
                <p>{visitorNames}</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Close
                </button>
            </div>
        </div>
    );
};
