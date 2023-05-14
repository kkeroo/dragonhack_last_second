import { useEffect, useState } from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

const NewGroup = (props) => {
    const [groupName, setGroupName] = useState('');
    const [groupUsers, setGroupUsers] = useState([]);

    const handleAddGroup = () => {
        props.setGroups([
            { gid: '1', name: 'Summer Ibiza 2k23', budget: 402.52, users: ['2131', 'sada', '23121', 'sd', 's'] },
            { gid: '2', name: 'Skiing 2k22', budget: 1000, users: ['2131', 'sada'] },
            { gid: '3', name: 'Trip to Vienna', budget: 500, users: ['Sadia Bruce', 'Eryn Hobbs', 'Everly Clark'] }
        ]);
        props.setShow(false);
    }
    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create new group</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                <div className="input-group mb-3">
                    <input type="text" onChange={(e) => setGroupName(e.target.value)} className="form-control input input-text" id="" placeholder="Group name" />
                </div>
                <div class="subtitle">Add users</div>
                <select className="input-group p-2" multiple>
                    <option className="subtitle mb-1">Reagan Short</option>
                    <option className="subtitle mb-1">Sadia Bruce</option>
                    <option className="subtitle mb-1">Eryn Hobbs</option>
                    <option className="subtitle mb-1">Everly Clark</option>
                    <option className="subtitle mb-1">Johan Potts</option>
                </select>
            </Modal.Body>
            <Modal.Footer className="border-0 justify-content-center">
                <div>
                    <a onClick={handleAddGroup} class="btn btn-primary btn-icon my-1">
                        Create group
                        <img src="./assets/img/icons/plus.svg" />
                    </a>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

const Home = (props) => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([
        { gid: '1', name: 'Summer Ibiza 2k23', budget: 402.52, users: ['2131', 'sada', '23121', 'sd', 's'] },
        { gid: '1', name: 'Skiing 2k22', budget: 1000, users: ['2131', 'sada'] }
    ]);
    const [show, setShow] = useState(false);

    return (
        <div className="container">
            <div className="row justify-content-center" style={{ marginTop: '15vh' }}>
                <div class="title text-center">My Groups</div>
                <div className="col-md-4 mt-4">
                    <div class="list list-group">
                        {groups.map((group, i) => {
                            return (<div class="list-item" key={group.gid} onClick={() => { navigate('/group') }}>
                                <div class="list-item__title">{group.name}</div>
                                <div class="list-item__details d-flex flex-row justify-content-between">
                                    <div class="details-people primary subtitle">{group.users.length} users</div>
                                    <div class="details-date light subtitle">Budget left: {group.budget} €</div>
                                </div>
                            </div>)
                        })}
                    </div>
                    <div class="text-center">
                        <a onClick={() => setShow(true)} class="btn btn-primary btn-icon my-1 mt-3">
                            Create new group
                            <img src="./assets/img/icons/check.svg" />
                        </a>
                    </div>
                </div>
            </div>
            <NewGroup show={show} setShow={setShow} setGroups={setGroups} onClose={() => setShow(false)}></NewGroup>
        </div>
    );
};

export default Home;