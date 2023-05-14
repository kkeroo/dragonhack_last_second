import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Redistribute = () => {
    const [share, setShare] = useState(true); // true for your account, false for group buddies
    const [amount, setAmount] = useState(0);
    const [paymentMade, setPaymentMade] = useState(false);

    const navigate = useNavigate();

    const handleClick = () => {
        setPaymentMade(true);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="container">
                        <div className="row justify-content-center" style={{ marginTop: "15vh" }}>
                            <div className="list-item">
                                <div className="list-item__title">You owe 10€</div>
                                <div className="list-item__details d-flex flex-row justify-content-between">
                                    <div className="details-people primary subtitle">Jonah Potts</div>
                                    <div className="details-date light subtitle">Kosilo</div>
                                </div>
                            </div>
                            <div className="list-item">
                                <div className="list-item__title">You are owed 50€</div>
                                <div className="list-item__details d-flex flex-row justify-content-between">
                                    <div className="details-people primary subtitle">Eryn Hobbs, Sadie Brue</div>
                                    <div className="details-date light subtitle">Rent a boat</div>
                                </div>
                            </div>
                            <div className="list-item">
                                <div className="list-item__title">You owe 20€</div>
                                <div className="list-item__details d-flex flex-row justify-content-between">
                                    <div className="details-people primary subtitle">Everly Clark</div>
                                    <div className="details-date light subtitle">Špecerija</div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="title mt-4">
                                <div className="title mt-4">
                                    {paymentMade ? (
                                        "Payment successful!"
                                    ) : (
                                        <span dangerouslySetInnerHTML={{ __html: 'Funds to be deposited: <span class="primary">20€</span>' }}></span>
                                    )}
                                </div>
                            </div>
                            {paymentMade ? (
                                <button class="btn btn-primary btn-text mt-4" onClick={() => { navigate('/') }}>
                                    Home
                                </button>
                            ) : (
                                <button class="btn btn-dark btn-icon mt-4" onClick={handleClick}>
                                    Redistribute
                                    <img src="./assets/img/icons/cash-sync.svg" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Redistribute;
