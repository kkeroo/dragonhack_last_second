import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';

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
        owner: "Regan Short",
        amount: "70,00",
    },
    {
        id: "t2",
        name: "Groceries",
        owner: "Sadia Bruce",
        amount: "35,23",
    },
    {
        id: "t3",
        name: "Tickets",
        owner: "Jonah Potts",
        amount: "60,60",
    },
];

let AMOUNT = 402.52;

const GroupView = (props) => {
    const [showFundsModal, setShowFundsModal] = useState(false);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [showPeopleModal, setShowPeopleModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [transactionDetails, setTransactionDetails] = useState(GROUP_TRANSACTIONS[0]);
    const [showCloseModal, setShowCloseModal] = useState(false);
    const [showMinigameModal, setshowMinigameModal] = useState(false);
    const [firstPress, setFirstPress] = useState(false);
    const [score, setScore] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [finishGame, setFinishGame] = useState(false);

    const hideFundsModal = () => setShowFundsModal(false);
    const openFundsModal = () => setShowFundsModal(true);
    const hideTransactionModal = () => setShowTransactionModal(false);
    const openTransactionModal = () => setShowTransactionModal(true);
    const hidePeopleModal = () => setShowPeopleModal(false);
    const openPeopleModal = () => setShowPeopleModal(true);
    const hideDetailsModal = () => setShowDetailsModal(false);
    const openDetailsModal = () => setShowDetailsModal(true);
    const hideCloseModal = () => setShowCloseModal(false);
    const openCloseModal = () => setShowCloseModal(true);
    const hideMinigameModal = () => setshowMinigameModal(false);
    const openMinigameModal = () => setshowMinigameModal(true);

    let timer = null;

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

    const [groupAmount, setGroupAmount] = useState(AMOUNT);
    const addFunds = () => {
        const addedFunds = parseFloat(document.getElementById("addFundsValue").value);
        const newValue = groupAmount + addedFunds;
        setGroupAmount(newValue);
        hideFundsModal();
    };

    const [groupTransactions, setGroupTransactions] = useState(GROUP_TRANSACTIONS);
    const addTransaction = () => {
        const transactionName = document.getElementById("transactionName").value;
        const transactionAmount = document.getElementById("transactionAmount").value;
        const newTransaction = {
            id: "t4",
            name: transactionName,
            owner: "Sadia Bruce",
            amount: transactionAmount
        };

        const newValue = groupAmount - transactionAmount;
        setGroupAmount(newValue);
        setGroupTransactions([...groupTransactions, newTransaction]);
        hideTransactionModal();
    };


    const handleShowDetails = (transaction) => {
        openDetailsModal();
        setTransactionDetails(transaction);
    }

    const navigate = useNavigate();

    const transactionList = groupTransactions.map((transaction) => (
        <div className="list-item d-flex flex-row justify-content-between" key={transaction.id} onClick={() => handleShowDetails(transaction)} >
            <div>
                <div className="list-item__title">{transaction.name}</div>
                <div className="list-item__desc light subtitle">Amount: {transaction.amount}</div>
            </div>
            <img src="./assets/img/icons/information-outline.svg" className="img-fluid info" />
        </div>
    ));

    const playMinigame = () => {
        hideCloseModal();
        openMinigameModal();
        setFirstPress(false);
        setScore(0);
    };

    const handleClickMe = () => {
        let time = new Date();
        if (!firstPress) {
            setFirstPress(true);
            setScore(1);
            setStartTime(time);
        }
        else {
            let diff = Math.abs(time.getTime() - startTime.getTime()) / 1000;
            if (diff > 3) {
                setFinishGame(true);
            }
            else {
                setScore(score + 1);
            }

        }
    }

    const endGame = () => {
        alert(score);
    }

    return (
        <div className="mb-5">
            <Modal show={showFundsModal} onHide={hideFundsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add funds</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <div className="input-group input-group-icon mb-3 mt-2">
                        <input type="number" className="form-control input input-icon" id="addFundsValue" placeholder="Add funds" />
                        <img src="./assets/img/icons/currency-eur.svg" className="img-fluid" height="20" width="20" />
                    </div>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control input input-text" placeholder="Card number" />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control input input-text" placeholder="Card holder" />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="input-group mb-3">
                                <input type="number" className="form-control input input-text" placeholder="CCV" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="input-group mb-3">
                                <input type="number" className="form-control input input-text" placeholder="Expiration date" />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center border-0">
                    <Button className="btn btn-primary btn-icon my-1" onClick={addFunds}>
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
                    <div className="input-group mb-3">
                        <input type="text" className="form-control input input-text" id="transactionName" placeholder="Transaction name" />
                    </div>
                    <div className="input-group input-group-icon mb-3">
                        <input type="number" className="form-control input input-icon" id="transactionAmount" placeholder="Price" />
                        <img src="./assets/img/icons/currency-eur.svg" className="img-fluid" height="20" width="20" />
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center border-0">
                    <Button className="btn btn-primary btn-icon my-1" onClick={addTransaction}>
                        Add transaction
                        <img src="./assets/img/icons/check.svg" />
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showCloseModal} onHide={hideCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Close group</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <div>
                        Are you sure you want to close this group?
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center border-0">
                    <Button className="btn btn-primary btn-icon mb-2" onClick={playMinigame}>
                        Play minigame
                        <img src="./assets/img/icons/check.svg" />
                    </Button>
                    <Button as={Link} to="/redistribute" className="btn btn-dark btn-icon" onClick={addTransaction}>
                        Redistribute
                        <img src="./assets/img/icons/cash-multiple.svg" />
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showMinigameModal} onHide={hideMinigameModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Minigame</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4 text-center">
                    <div class="subtitle">Play minigame and win the remaining funds. Press the button as many times as you can in 3 seconds.</div>
                    <div className="title my-2">Score: <span class="primary">{score}</span></div>
                    <a onClick={handleClickMe} hidden={finishGame} class="btn btn-primary btn-icon my-3">
                        Click me!
                        <img src="./assets/img/icons/check.svg" />
                    </a>
                    <div className="subtitle my-2" hidden={!finishGame}>Your score is <span className="primary">{score}</span>, which is more than your friends.<br /> You get <span className="title">{AMOUNT}</span> €.</div>
                    <a hidden={!finishGame} onClick={() => navigate('/home')} class="btn btn-dark btn-text my-1">Back to home screen</a>
                </Modal.Body>
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
                <Modal.Footer className="justify-content-center border-0">
                    <Button className="btn btn-primary btn-icon my-1" onClick={addUser}>
                        Add user
                        <img src="./assets/img/icons/check.svg" />
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDetailsModal} onHide={hideDetailsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Transaction details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <div className="transaction-modal">
                        <div className="transaction-info mb-3">
                            <div className="transaction-info__label subtitle primary">Transaciton title</div>
                            <div className="transaction-info__text title">{transactionDetails.name}</div>
                        </div>
                        <div className="transaction-info mb-3">
                            <div className="transaction-info__label subtitle primary">Transaciton creator</div>
                            <div className="transaction-info__text title">{transactionDetails.owner}</div>
                        </div>
                        <div className="transaction-info">
                            <div className="transaction-info__label subtitle primary">Amount</div>
                            <div className="transaction-info__text title">{transactionDetails.amount}</div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center border-0">
                    <Button className="btn btn-dark btn-icon my-1" onClick={hideDetailsModal}>
                        Close
                        <img src="./assets/img/icons/window-close.svg" />
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
                        {groupAmount} <span className="small">€</span>
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
                            <div className="row">
                                {usersList}
                                <div className="col-4">
                                    <div onClick={openPeopleModal} className="user add-user d-flex flex-column justify-content-evenly align-items-center text-center my-2 p-3 cursor-pointer">
                                        <img src="./assets/img/icons/plus.svg" className="img-fluid" height="40" width="40" />
                                        <div className="user-username">Add user</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 col-12 col-md-4">
                        <div className="title text-center">Latest transactions</div>
                        <div className="row justify-content-center">
                            <div className="list list-transaction mt-2 px-md-0">{transactionList}</div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-5">
                    <a onClick={openCloseModal} class="btn btn-dark btn-icon my-1">
                        Close group
                        <img src="./assets/img/icons/window-close.svg" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default GroupView;
