import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './style.module.css';
import PropTypes from 'prop-types';

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('required'),
  number: Yup.string()
    .matches(
      /^[+]?[0-9]{1,4}?[-.\s]?[(]?[0-9]{1,3}[)]?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('required'),
});

function ContactForm({ handleAddContact }) {
  const onSubmit = (values, actions) => {
    handleAddContact({ ...values });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form className={css.contact}>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" />

            <label htmlFor="number">Number</label>
            <Field type="tel" id="number" name="number" />
            <ErrorMessage name="number" />
          </div>
          <button type="submit" disabled={!formik.isValid}>
            add contact
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ContactForm;

ContactForm.propTypes = {
  handleAddContact: PropTypes.func.isRequired,
};
