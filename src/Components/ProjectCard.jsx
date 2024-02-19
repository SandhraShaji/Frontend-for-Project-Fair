import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { baseUrl } from '../services/baseUrl';
function ProjectCard({project}) {
  console.log(project);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div>
        <Card onClick={handleShow} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={project?`${baseUrl}/uploads/${project.projectImage}`:'empty image'} />
      <Card.Body>
        <Card.Title>{project?.title}</Card.Title>
      </Card.Body>
    </Card>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row >
                <Col>
                    <img width={'220px'} src={project?`${baseUrl}/uploads/${project.projectImage}`:'empty image'} alt="" />
                </Col>
                <Col>
                    <p>
                        <b>Project Overview</b><br />
                        {project?.overview}
                    </p>
                    <p>
                        <b>Technologies Used: </b><br />
                        {project?.language}
                    </p>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-evenly'>
          <a href={project?.github} variant="secondary" onClick={handleClose}>
          <i class="fa-brands fa-github fa-bounce fs-2"></i>
          </a>
          <a href={project?.link} variant="primary" onClick={handleClose}>
          <i class="fa-solid fa-link fa-bounce fs-2"></i>
          </a>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProjectCard