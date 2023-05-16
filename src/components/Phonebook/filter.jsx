import React from 'react';
import { Formik, Field, Form } from 'formik';
import PropTypes from 'prop-types';
export const Filter = ({ value, onChange }) => {
  return (
    <Formik>
      <Form>
        <label htmlFor="filter">Filter contacts:</label>
        <Field
          type="text"
          id="filter"
          name="filter"
          value={value}
          onChange={onChange}
        />
      </Form>
    </Formik>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
