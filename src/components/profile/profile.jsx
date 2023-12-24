import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "../navbar/navbar";

function Profile(props) {

    return <>
        <div>
            <Navbar />
            <div className="profile">
                <Container>
                    <Row>
                        <Col md={4}>
                            <img src={props.profile.image} alt="" />
                        </Col>
                        <Col md={8}>
                            {props.profile.firstName} {props.profile.lastName}
                            {props.profile.gender}
                            {props.profile.email}
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    </>

}

export default Profile;