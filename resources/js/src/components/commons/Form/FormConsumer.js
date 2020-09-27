import React, { useContext } from "react";
import { FormDataContext } from "./FormDataProvider";

export const withFormContext = (Component, formConstantObject) => {
  return (props) => {
    const formContext = useContext(FormDataContext);
    return <Component {...props} formContext={formContext} />;
  };
};
