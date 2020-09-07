import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function UsersForm(props) {
  const schema = Yup.object({
    name: Yup.string().max(2, "must be 2 car or less").required("Required"),
    email: Yup.string().email("Invalid email adrdess").required("Required"),
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={props.values}
      onSubmit={props.onSubmit}
      validationSchema={schema}
      render={(props) => {
        return (
          <Form>
            <label>Name : </label>
            <Field name="name" />
            <ErrorMessage name="name" />
            <br />

            <label>Email : </label>
            <Field name="email" />
            <ErrorMessage name="email" />
            <br />
            <button type="submit">Send</button>
          </Form>
        );
      }}
    />
  );
}
