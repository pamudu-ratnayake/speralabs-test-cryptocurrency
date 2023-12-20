import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function SignUpPage(props) {
  const [activeTab, setActiveTab] = useState("#login");
  const navigate = useNavigate();

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });
  
  const signUpSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
    signupConPassword: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required()
  });

  const onLogin = (values) => {
    console.log("login click", values);
    axios.post(`http://localhost:8070/auth-user/login`, values)
    .then((res) => {
        console.log("login done", res.data);
        localStorage.setItem("profile", JSON.stringify(res.data));
        navigate('/home');
    })
    .catch((err) => {
        console.error(err);
        alert('Login Failed! Please try again');
    })
  };
  
  const onSignup = (values) => {
    console.log("signup click", values);
    if (values.password === values.signupConPassword) {
        axios.post(`http://localhost:8070/auth-user/signup`, values)
        .then((res) => {
            console.log('sighup=====> ', res.data);
            localStorage.setItem("profile", JSON.stringify(res.data));
        })
        .catch((err) => {
            console.error(err);
        })
    } else {
        alert('Password missmatching!');
    }
  };

  return (
    <div style={{ margin: "100px" }}>
      <Card>
        <Card.Header>
          <Nav variant="tabs" activeKey={activeTab} onSelect={handleSelect}>
            <Nav.Item>
              <Nav.Link eventKey="#login">Log In</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#signup">Sign Up</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          {activeTab === "#login" && (
            <>
              <Formik
                validationSchema={schema}
                onSubmit={(values) => {onLogin(values)}}
                initialValues={{
                    email: "",
                    password: "",
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="validationFormik01">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          isValid={touched.email && !errors.email}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="validationFormik02">
                        <Form.Label>password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          isValid={touched.password && !errors.password}
                        />

                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Button type="submit">Submit form</Button>
                  </Form>
                )}
              </Formik>
            </>
          )}
          {activeTab === "#signup" && (
            <>
              <Formik
                validationSchema={signUpSchema}
                onSubmit={(values) => {onSignup(values)}}
                initialValues={{
                    email: "",
                    password: "",
                    signupConPassword: "",
                    firstName: "",
                    lastName: ""
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="validationFormik03">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          isValid={touched.firstName && !errors.firstName}
                        />

                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="validationFormik04">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          isValid={touched.lastName && !errors.lastName}
                        />

                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="validationFormik05">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          isValid={touched.email && !errors.email}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="validationFormik06">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          isValid={touched.password && !errors.password}
                        />

                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="validationFormik07">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="signupConPassword"
                          value={values.signupConPassword}
                          onChange={handleChange}
                          isValid={touched.signupConPassword && !errors.signupConPassword}
                        />

                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    

                    <Button type="submit">Submit form</Button>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignUpPage;
