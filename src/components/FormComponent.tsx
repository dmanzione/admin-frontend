import { Card, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { MouseEventHandler } from "react";

export interface FormComponentProps {
  formData: FormData;
}

export interface FormData {
  fields: Field[];
  validation: Yup.ObjectSchema<Yup.AnyObject>;
  onSubmit(vals: any, setFieldErrors: Function): Promise<any>;
}

export interface Field {
  name: string;
  displayName: string;
  initValue: any;
  type: "text" | "password" | "email" | "date" | "tel" | "url" | "search" | "number";
}

export default function FormComponent({ formData }: FormComponentProps) {
  const { fields, validation, onSubmit } = formData;

  const initValues: any = {};
  fields.forEach((field) => {
    initValues[field.name] = field.initValue;
  });

  const handleSubmit = (
    vals: any,
    {
      setFieldError,
      setSubmitting,
    }: { setFieldError: Function; setSubmitting: Function }
  ) => {
    onSubmit(vals, setFieldError).finally(() => {
      setSubmitting(false);
    });
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validation}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
        <Form>
          {fields.map((field) => {
            return (
              <Form.Group
                className="mb-3"
                controlId={`form${field.name}`}
                key={field.name}
              >
                <Form.Label>{field.displayName}</Form.Label>
                <Form.Control
                  className={
                    errors[field.name] && touched[field.name] ? "is-invalid" : ""
                  }
                  type={field.type}
                  name={field.name}
                  placeholder={field.displayName}
                  onChange={handleChange}
                  value={values[field.name as string]}
                />
                <div className="invalid-feedback">
                  {errors[field.name] as string}
                </div>
              </Form.Group>
            );
          })}
          <Button
            className="float-end"
            variant="primary"
            type="submit"
            onClick={handleSubmit as unknown as MouseEventHandler<HTMLButtonElement>}
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
