import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './App.css'

function App() {
  let [details, setDetails] = useState([]);
  const [status, setStatus] = useState(true);
  const [temp, setTemp] = useState({
    Name: "",
    Year: "",
    Director: "",
    Casts: "",
    Language: "",
    Parts: ""
  })

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    console.log(temp.Name);
  }
  const handleShow = (data) => {
    setTemp(data);
    setShow(true)
    console.log(data);
  };
  const addShow = () => {
    setShow(true);
    setTemp({
      Name: "",
      Year: "",
      Director: "",
      Casts: "",
      Language: "",
      Parts: ""
    })
  }
  useEffect(() => {
    fetch('https://6a2a9ed0b687a7d5cbc41789.mockapi.io/CRUD/Movies/Movies', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    }).then(tasks => {
      setDetails(tasks.reverse());
    }).catch(error => {
      console.log(error);
    })
  }, [status]);

  const addUser = () => {
    setShow(false);
    fetch('https://6a2a9ed0b687a7d5cbc41789.mockapi.io/CRUD/Movies/Movies', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },

      body: JSON.stringify(temp)
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
    }).then(task => {
      alert("Created Successfully");
      setStatus(!status);
    }).catch(error => {
      console.log(error);
    })
  }


  const updateUser = () => {
    handleClose();
    fetch(`https://6a2a9ed0b687a7d5cbc41789.mockapi.io/CRUD/Movies/Movies/${temp.id}`, {
      method: 'PUT', // or PATCH
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(temp)
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    }).then(task => {
      alert("Updated Successfully")
      setStatus(!status);
    }).catch(error => {
      console.log(error)
    })
  }


  const deleteUser = (id) => {

    fetch(`https://6a2a9ed0b687a7d5cbc41789.mockapi.io/CRUD/Movies/Movies/${id}`, {
      method: 'DELETE',
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    }).then(task => {
      alert("Deleted Successfully")
      setStatus(!status);
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <>
      <div className='top-nav'>
        <h1 className='title'>MOVIES DETAILS</h1>
        <button onClick={() => addShow()}><b>ADD USER</b></button>
      </div>
      <div className="table-container">
        <Table striped bordered hover variant="dark" className="movies-table">
          <thead className='text-center'>
            <tr>
              <th>SNO</th>
              <th className='name'>MOVIE NAME</th>
              <th>YEAR</th>
              <th className='director'>DIRECTOR</th>
              <th className='casts'>CASTS</th>
              <th className='lang'>LANGUAGE</th>
              <th>PART</th>
              <th className='action'>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {details?.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{e.Name}</td>
                  <td>{e.Year}</td>
                  <td>{e.Director}</td>
                  <td>{e.Casts}</td>
                  <td>{e.Language}</td>
                  <td className='part'>{e.Parts}</td>
                  <td className='btns'>
                    <button className='btn1' onClick={() => handleShow(e)}><b>EDIT</b></button>
                    <button className='btn2' onClick={() => deleteUser(e.id)}><b>DELETE</b></button>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </Table>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label><b>Movie Name</b></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Movie Name"
                  defaultValue={temp.Name}
                  name={"Name"}
                  autoFocus
                  onChange={(e) => { setTemp({ ...temp, Name: e.target.value }) }}
                />

                <Form.Label><b>Year</b></Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter Movie Release Year"
                  defaultValue={temp.Year}
                  name={"Year"}
                  autoFocus
                  onChange={(e) => { setTemp({ ...temp, Year: e.target.value }) }}
                />

                <Form.Label><b>Director</b></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Movie Director Name"
                  defaultValue={temp.Director}
                  name={"Director"}
                  autoFocus
                  onChange={(e) => { setTemp({ ...temp, Director: e.target.value }) }}
                />

                <Form.Label><b>Casts</b></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Movie Casts Name"
                  defaultValue={temp.Casts}
                  name={"Casts"}
                  autoFocus
                  onChange={(e) => { setTemp({ ...temp, Casts: e.target.value }) }}
                />

                <Form.Label><b>Language</b></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Movie Language"
                  defaultValue={temp.Language}
                  name={"Language"}
                  autoFocus
                  onChange={(e) => { setTemp({ ...temp, Language: e.target.value }) }}
                />

                <Form.Label><b>Part</b></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Movie Part"
                  defaultValue={temp.Parts}
                  name={"Parts"}
                  autoFocus
                  onChange={(e) => { setTemp({ ...temp, Parts: e.target.value }) }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {temp.id == undefined ? <Button variant="success" onClick={addUser}>Add Movie</Button> : <Button variant="primary" onClick={updateUser}>
              Save Changes
            </Button>}

          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default App
