import React from "react";

const GroupView = () => {
    return (
        <div className="mb-5">
            <div className="container mt-3">
                <a class="breadcrumbs d-flex flex-row mb-3" href="#">
                    <img src="./assets/img/icons/back-arrow.svg" class="img-fluid me-2" />
                    All groups
                </a>
                <div className="mt-3 text-center">
                    <div class="title">V blagajni</div>
                    <div class="group-amount mt-3">
                        400,00<span class="small">€</span>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <a href="#" class="btn btn-primary btn-icon my-1">
                        Dodaj sredstva
                        <img src="./assets/img/icons/cash-multiple.svg" />
                    </a>
                    <a href="#" class="btn btn-dark btn-icon my-1">
                        Dodaj transakcijo
                        <img src="./assets/img/icons/cart-outline.svg" />
                    </a>
                </div>
                <div className="mt-5 text-center">
                    <div class="title">Člani</div>
                    <div class="group-users">
                        <div class="row">
                            <div class="col-4">
                                <div class="user d-flex flex-column justify-content-evenly align-items-center text-center my-2 p-3">
                                    <img src="./assets/img/icons/account.svg" class="img-fluid" height="40" width="40" />
                                    <div class="user-username">Janez Novak</div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="user d-flex flex-column justify-content-evenly align-items-center text-center my-2 p-3">
                                    <img src="./assets/img/icons/account.svg" class="img-fluid" height="40" width="40" />
                                    <div class="user-username">Janez Novak</div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="user d-flex flex-column justify-content-evenly align-items-center text-center my-2 p-3">
                                    <img src="./assets/img/icons/account.svg" class="img-fluid" height="40" width="40" />
                                    <div class="user-username">Janez Novak</div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="user d-flex flex-column justify-content-evenly align-items-center text-center my-2 p-3">
                                    <img src="./assets/img/icons/account.svg" class="img-fluid" height="40" width="40" />
                                    <div class="user-username">Janez Novak</div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="user d-flex flex-column justify-content-evenly align-items-center text-center my-2 p-3">
                                    <img src="./assets/img/icons/account.svg" class="img-fluid" height="40" width="40" />
                                    <div class="user-username">Janez Novak</div>
                                </div>
                            </div>
                        </div>
                        <a href="javascript:void(0)" class="btn btn-dark btn-icon mt-3">
                            Dodaj uporabnika
                            <img src="./assets/img/icons/plus.svg" />
                        </a>
                    </div>
                </div>
                <div className="mt-5">
                    <div class="title text-center">Zadnje transakcije</div>
                    <div class="list list-transaction mt-2">
                        <div class="list-item d-flex flex-row justify-content-between">
                            <div>
                                <div class="list-item__title">Lorem ipsum</div>
                                <div class="list-item__desc light subtitle">Novo stanje: 400,00 €</div>
                            </div>
                            <img src="./assets/img/icons/information-outline.svg" class="img-fluid info" />
                        </div>
                        <div class="list-item d-flex flex-row justify-content-between">
                            <div>
                                <div class="list-item__title">Lorem ipsum</div>
                                <div class="list-item__desc light subtitle">Novo stanje: 400,00 €</div>
                            </div>
                            <img src="./assets/img/icons/information-outline.svg" class="img-fluid info" />
                        </div>
                        <div class="list-item d-flex flex-row justify-content-between">
                            <div>
                                <div class="list-item__title">Lorem ipsum</div>
                                <div class="list-item__desc light subtitle">Novo stanje: 400,00 €</div>
                            </div>
                            <img src="./assets/img/icons/information-outline.svg" class="img-fluid info" />
                        </div>
                        <div class="list-item d-flex flex-row justify-content-between">
                            <div>
                                <div class="list-item__title">Lorem ipsum</div>
                                <div class="list-item__desc light subtitle">Novo stanje: 400,00 €</div>
                            </div>
                            <img src="./assets/img/icons/information-outline.svg" class="img-fluid info" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupView;
