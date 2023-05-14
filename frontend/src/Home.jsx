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
            {gid: '1', name: 'Summer Ibiza 2k23', budget: 402.52, users: ['2131', 'sada', '23121', 'sd', 's']},
            {gid: '2', name: 'Skiing 2k22', budget: 1000, users: ['2131', 'sada']},
            {gid: '3', name: 'Trip to Vienna', budget: 500, users: ['Sadia Bruce', 'Eryn Hobbs', 'Everly Clark']}
        ])
    }
  return (
    <Modal show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row justify-content-center mt-5">
                <div>
                    <div className="input-group my-2">
                        <input type="text" onChange={(e) => setGroupName(e.target.value)} className="form-control input input-text" id="" placeholder="Group name" />
                    </div>
                    <div class="subtitle mt-3">Add users</div>
                    <select className="input-group my-2" multiple>
                        <option>Reagan Short</option>
                        <option>Sadia Bruce</option>
                        <option>Eryn Hobbs</option>
                        <option>Everly Clark</option>
                        <option>Johan Potts</option>
                    </select>
                    <div className='text-center'>
                        <a onClick={handleAddGroup} className="btn btn-primary btn-text my-1 mt-3">Create Group</a>
                    </div>
                    <br/>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
  );
}

const Home = (props) => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([
        {gid: '1', name: 'Summer Ibiza 2k23', budget: 402.52, users: ['2131', 'sada', '23121', 'sd', 's']},
        {gid: '1', name: 'Skiing 2k22', budget: 1000, users: ['2131', 'sada']}
    ]);
    const [show, setShow] = useState(false);

    return (
        <div className="container">
            <div className="row justify-content-center" style={{marginTop: '15vh'}}>
                <div class="title text-center">My Groups</div>
                <div className="col-md-4 mt-4">
                    <div class="list list-group">
                        {groups.map((group, i) => {
                            return (<div class="list-item" key={group.gid} onClick={() => {navigate('/group')}}>
                                <div class="list-item__title">{group.name}</div>
                                <div class="list-item__details d-flex flex-row justify-content-between">
                                    <div class="details-people primary subtitle">{group.users.length} users</div>
                                    <div class="details-date light subtitle">Budget left: {group.budget} €</div>
                                </div>
                            </div>)
                        })}
                    </div>
                    <a onClick={() => setShow(true)} class="btn btn-primary btn-icon my-1 mt-3">
                            Create new group
                            <img src="./assets/img/icons/check.svg" />
                    </a>
                </div>
            </div>
            <NewGroup show={show} setGroups={setGroups} onClose={() => setShow(false)}></NewGroup>
        </div>
    );
};

export default Home;