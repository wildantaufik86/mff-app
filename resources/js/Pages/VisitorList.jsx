// resources/js/Pages/VisitorList.jsx

const VisitorList = ({ datas }) => {
    // console.log('VisitorList datas:', datas);

    return (
        <>
            <div className="grid gap-5 grid-cols-5 grid-rows-4">
                {datas && datas.length > 0 ? (
                    datas.map(visitor => (
                        <div key={visitor.id}>
                            <div className="bg-sky-400 p-2">
                                <h3>{visitor.name}</h3>
                                <p>Instansi: {visitor.instansi}</p>
                                <p>Email: {visitor.email}</p>
                                <p>Seat: {visitor.seat}</p>

                            </div>
                        </div>
                    ))
                ) : (
                    <p>No visitors found.</p>
                )}
            </div>

        </>
    );
}

export default VisitorList;
