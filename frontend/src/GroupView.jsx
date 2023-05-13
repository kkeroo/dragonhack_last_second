import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const GROUP_USERS = [
    {
        id: "u1",
        name: "Regan Short",
    },
    {
        id: "u2",
        name: "Sadia Bruce",
    },
    {
        id: "u3",
        name: "Eryn Hobbs",
    },
    {
        id: "u4",
        name: "Everly Clark",
    },
    {
        id: "u5",
        name: "Jonah Potts",
    },
];

const GROUP_TRANSACTIONS = [
    {
        id: "t1",
        name: "Gas",
        amount: "70,00",
    },
    {
        id: "t2",
        name: "Groceries",
        amount: "35,23",
    },
    {
        id: "t3",
        name: "Tickets",
        amount: "60,60",
    },
];

const GroupView = (props) => {
    const [showFundsModal, setShowFundsModal] = useState(false);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [showPeopleModal, setShowPeopleModal] = useState(false);

    const hideFundsModal = () => setShowFundsModal(false);
    const openFundsModal = () => setShowFundsModal(true);
    const hideTransactionModal = () => setShowTransactionModal(false);
    const openTransactionModal = () => setShowTransactionModal(true);
    const hidePeopleModal = () => setShowPeopleModal(false);
    const openPeopleModal = () => setShowPeopleModal(true);

    const [groupUsers, setGroupUsers] = useState(GROUP_USERS);
    const addUser = () => {
        const usernameInput = document.getElementById("usernameInput");
        const username = usernameInput.value;
        const newUser = {
            id: "u6",
            name: username,
        };
        setGroupUsers([...groupUsers, newUser]);
        hidePeopleModal();
    };

    const usersList = groupUsers.map((user) => (
        <div className="col-4" key={user.id}>
            <div className="user d-flex flex-column justify-content-evenly align-items-center text-center my-2 p-3">
                <img src="./assets/img/icons/account.svg" className="img-fluid" height="40" width="40" />
                <div className="user-username">{user.name}</div>
            </div>
        </div>
    ));

    const [groupTransactions, setGroupTransactions] = useState(GROUP_TRANSACTIONS);
    const addTransaction = () => {
        const transactionName = document.getElementById("transactionName").value;
        const transactionAmount = document.getElementById("transactionAmount").value;
        const newTransaction = {
            id: "t4",
            name: transactionName,
            amount: transactionAmount
        };
        setGroupTransactions([...groupTransactions, newTransaction]);
        hideTransactionModal();
    };

    const transactionList = groupTransactions.map((transaction) => (
        <div className="list-item d-flex flex-row justify-content-between">
            <div>
                <div className="list-item__title">{transaction.name}</div>
                <div className="list-item__desc light subtitle">Amount: {transaction.amount}</div>
            </div>
            <img src="./assets/img/icons/information-outline.svg" className="img-fluid info" />
        </div>
    ));

    return (
        <div className="mb-5">
            <Modal show={showFundsModal} onHide={hideFundsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add funds</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <div className="input-group input-group-icon mb-3 mt-2">
                        <input type="number" className="form-control input input-icon" placeholder="Add funds" />
                        <img src="./assets/img/icons/currency-eur.svg" className="img-fluid" height="20" width="20" />
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button className="btn btn-primary btn-icon my-1" onClick={hideFundsModal}>
                        Add funds
                        <img src="./assets/img/icons/check.svg" />
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showTransactionModal} onHide={hideTransactionModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <div className="input-group my-2">
                        <input type="text" className="form-control input input-text" id="transactionName" placeholder="Transaction name" />
                    </div>
                    <div className="input-group input-group-icon my-4">
                        <input type="number" className="form-control input input-icon" id="transactionAmount" placeholder="Price" />
                        <img src="./assets/img/icons/currency-eur.svg" className="img-fluid" height="20" width="20" />
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button className="btn btn-primary btn-icon my-1" onClick={addTransaction}>
                        Add transaction
                        <img src="./assets/img/icons/check.svg" />
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showPeopleModal} onHide={hidePeopleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add user</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <div className="input-group input-group-label mb-4">
                        <input type="text" className="form-control input input-label" placeholder="Add user by username" id="usernameInput" />
                        <div className="label">You can add up to 10 users.</div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button className="btn btn-primary btn-icon my-1" onClick={addUser}>
                        Add user
                        <img src="./assets/img/icons/check.svg" />
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="container mt-3">
                <a className="breadcrumbs d-flex flex-row mb-3" href="#">
                    <img src="./assets/img/icons/back-arrow.svg" className="img-fluid me-2" />
                    Ibiza 2k23
                </a>
                <div className="mt-3 text-center">
                    <div className="title">V blagajni</div>
                    <div className="group-amount mt-3">
                        400,00<span className="small">€</span>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <div>
                        <Button onClick={openFundsModal} className="btn btn-primary btn-icon my-1">
                            Add funds
                            <img src="./assets/img/icons/cash-multiple.svg" />
                        </Button>
                    </div>
                    <div>
                        <Button onClick={openTransactionModal} className="btn btn-dark btn-icon my-1">
                            Add transaction
                            <img src="./assets/img/icons/cart-outline.svg" />
                        </Button>
                    </div>
                </div>
                <div className="row justify-content-evenly">
                    <div className="mt-5 col-12 col-md-4 text-center">
                        <div className="title">Group users</div>
                        <div className="group-users">
                            <div className="row">{usersList}</div>
                            <Button onClick={openPeopleModal} className="btn btn-dark btn-icon mt-3">
                                Add user
                                <img src="./assets/img/icons/plus.svg" />
                            </Button>
                        </div>
                    </div>
                    <div className="mt-5 col-12 col-md-4">
                        <div className="title text-center">Latest transactions</div>
                        <div className="row justify-content-center">
                            <div className="list list-transaction mt-2 px-md-0">{transactionList}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupView;
