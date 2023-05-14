import { useEffect, useState } from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NewGroup = (props) => {
    const [groupName, setGroupName] = useState('');
    const [groupUsers, setGroupUsers] = useState([]);

  return (
    <Modal show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row justify-content-center mt-5 text-center">
                <div>
                    <div className="input-group my-2">
                        <input type="text" onChange={(e) => setGroupName(e.target.value)} className="form-control input input-text" id="" placeholder="Group name" />
                    </div>
                    <a  className="btn btn-primary btn-text my-1 mt-3">Create Group</a>
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
    const [groups, setGroups] = useState([{gid: '1', name: 'Morje 2k23', budget: 450, users: ['2131', 'sada', '23121']}]);
    const [show, setShow] = useState(false);

    return (
        <div className="container">
            <div className="row justify-content-center" style={{marginTop: '15vh'}}>
                <div class="title text-center">My Groups</div>
                <div className="col-md-4 mt-4">
                    <div class="list list-group">
                        {groups.map((group, i) => {
                            return (<div class="list-item" key={group.gid}>
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
            <NewGroup show={show} onClose={() => setShow(false)}></NewGroup>
        </div>
    );
};

export default Home;