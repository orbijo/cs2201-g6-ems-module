import React from "react";
import { Formik, Form, useField } from "formik";
import DatePicker from "react-datepicker";
// Styles
import "react-datepicker/dist/react-datepicker.css";

const MyDatePicker = ({ name = "" }) => {
  const [field, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <DatePicker
      {...field}
      selected={value}
      onChange={(date) => setValue(date)}
    />
  );
};

export default MyDatePicker