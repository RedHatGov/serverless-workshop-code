// author: @dudash
// license: Apache 2.0
import React from "react";
import { observer } from "mobx-react";
import { Formik } from "formik"; // forms helper
import Form from "react-bootstrap/Form";
import * as yup from "yup"; // validate schemas
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const buttonStyle = { marginRight: "10px" };
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/; // for Mobile Numbers
const schema = yup.object({
    fullname: yup.string().required("Name is required"),
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid")
});

function MoreInfoView({ stateStore }) {    
    const handleSubmit = async evt => {
        // manually entering an address - validate, set, share
        const isValid = true; // await schema.validate(evt);
        if (!isValid) {return;}
        // stateStore.setFullName(evt.fullname);
        // stateStore.setFullName(evt.anythingelse);

        // TODO: send this to erdemo.io if available - error otherwise
        // TODO: if erdemo.io unavailable then send to TXT message? Or maybe hide this tab?
    };

    return (
        <div className="App-homepage-moreinfo">
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{ fullname: "", anythingelse: "", phone: "" }}
                enableReinitialize={true}
            >
                {({ handleSubmit, handleChange, handleBlur, values, touched, isInvalid, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="fullname">
                                {/* <Form.Label>Please provide additional information below</Form.Label> */}
                                <Form.Control
                                    type="text"
                                    name="fullname"
                                    placeholder="Douglas Adams"
                                    value={values.fullname || ""}
                                    onChange={handleChange}
                                    isInvalid={touched.fullname && errors.fullname}
                                />
                                <Form.Control.Feedback type="invalid">{errors.fullname}</Form.Control.Feedback>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    placeholder="555-555-5555"
                                    value={values.phone || ""}
                                    onChange={handleChange}
                                    isInvalid={touched.phone && errors.phone}
                                />
                                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                                <Form.Control
                                    type="text"
                                    name="anythingelse"
                                    placeholder="You can share any other info here"
                                    value={values.anythingelse || ""}
                                    onChange={handleChange}
                                    isInvalid={touched.anythingelse && errors.anythingelse}
                                />
                                <Form.Control.Feedback type="invalid">{errors.anythingelse}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
export default observer(MoreInfoView);