import React, { useState } from 'react';

const Redistribute = () => {
    const [share, setShare] = useState(true); // true for your account, false for group buddies
    const [amount, setAmount] = useState(0);

    const handleClick = () => {
        if(share) {
            alert(`${amount} euros have been transferred to your account`);
        } else {
            alert(`${amount} euros have been transferred to your group buddies`);
        }
    }

    return (
        <div classNameName='container text-center'>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="container">
                        <div className="row justify-content-center" style={{margin: '15vh 0'}}>
                            <div className="list-item">
                                <div className="list-item__title">You owe 10€</div>
                                <div className="list-item__details d-flex flex-row justify-content-between">
                                    <div className="details-people primary subtitle">Regan Short</div>
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
                        <h5>Funds to be deposited: <span class="text-success">20€</span></h5>
                        <a href="javascript:void(0)" class="btn btn-primary btn-text my-1">Redistribute</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Redistribute;
