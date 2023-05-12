import { Card, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { UsState } from "../types/UsState";

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
  type:
    | "text"
    | "password"
    | "email"
    | "date"
    | "tel"
    | "url"
    | "search"
    | "number"
    | "state"
    | "hidden";
}

const FormComponent = ({ formData }: FormComponentProps) => {
  const { fields, validation, onSubmit } = formData;

  const initValues: any = {};
  fields.forEach((field) => {
    initValues[field.name] = field.initValue || "";
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
            if (field.type === "state")
              return (
                <StateField
                  key={field.name}
                  field={field}
                  value={values[field.name]}
                  onChange={handleChange}
                />
              );

            if (field.type === "hidden")
              return (
                <HiddenField
                  key={field.name}
                  field={field}
                  value={values[field.name]}
                />
              );

            return (
              <NormalField
                key={field.name}
                field={field}
                value={values[field.name as string]}
                error={!!(errors[field.name] && touched[field.name])}
                errMsg={errors[field.name] as string}
                onChange={handleChange}
              />
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
};

export default FormComponent;

interface FieldProps {
  field: Field;
  value: any;
  error?: boolean;
  errMsg?: string;
  onChange?: ChangeEventHandler;
}

const NormalField = ({ field, value, error, errMsg, onChange }: FieldProps) => {
  return (
    <Form.Group className="mb-3" controlId={`form${field.name}`}>
      <Form.Label>{field.displayName}</Form.Label>
      <Form.Control
        className={error ? "is-invalid" : ""}
        type={field.type}
        name={field.name}
        placeholder={field.displayName}
        onChange={onChange}
        value={value}
      />
      <div className="invalid-feedback">{errMsg}</div>
    </Form.Group>
  );
};

const HiddenField = ({ field, value }: FieldProps) => {
  return (
    <Form.Group controlId={`form${field.name}`}>
      <Form.Control type={field.type} name={field.name} value={value} />
    </Form.Group>
  );
};

const StateField = ({ field, value, onChange }: FieldProps) => {
  return (
    <Form.Group className="mb-3" controlId={`form${field.name}`}>
      <Form.Label>{field.displayName}</Form.Label>
      <Form.Select value={value} onChange={onChange} name={field.name}>
        {(Object.keys(UsState) as Array<keyof typeof UsState>).map((state) => (
          <option value={state} key={state}>
            {state}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};
