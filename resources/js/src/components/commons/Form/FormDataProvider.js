import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { agentBasicDetailsDTO } from "../../../constants/formConstantArray";

export const FormDataContext = React.createContext();

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const computeInitialState = (formConstants, isMultipart = false) => {
  let data;

  if (!isMultipart) {
    data = {};
    for (let index = 0; index < formConstants.length; index++) {
      const element = formConstants[index];
      data[element.jsonKey] = "";
    }
  } else {
    data = {};
    const formDataObject = new FormData();

    for (let index = 0; index < formConstants.length; index++) {
      const element = formConstants[index];
      data[element.jsonKey] = "";
      formDataObject.set(element.jsonKey, "");
    }
    data["formDataObject"] = formDataObject;
  }
  return data;
};

/* 
? For ARRAY CONSTANT
const computeInitialState = (formConstants) => {
    const data = {}
    for (let index = 0; index < formConstants.length; index++) {
        const element = formConstants[index];
        data[element.jsonKey] = "";
    }
    return data;
}
 */
const FormDataProvider = ({
  formConstants = [],
  isMultipart = false,
  ...props
}) => {
  // TODO table dependency

  const formData = useMemo(
    () => computeInitialState(formConstants, isMultipart),
    [formConstants, isMultipart]
  );

  const classes = useStyles({});

  const [formState, setFormState] = useState({ formData });

  console.log("================FormDataProvider====================");
  console.log(formData);
  console.log("================FormDataProvider====================");

  const handleSetState = (object) => {
    if (!isMultipart) {
      const { formData } = formState;
      setFormState({
        formData: { ...formData, ...object },
        setFormState,
      });
    } else {
      const { formData } = formState;

      // {jsonKey:"someThing" , value:""}

      formData.formDataObject.set(object.jsonKey, object.value);

      setFormState({
        formData: { ...formData, ...object },
        setFormState,
      });
    }
  };

  const resetState = () => {
    if (isMultipart) {
      setFormState({
        formData: new FormData(),
        setFormState,
      });
    } else {
      setFormState({
        formData: formData,
        setFormState,
      });
    }
  };

  const value = {
    ...formState,
    setFormState: handleSetState,
    resetState: resetState,
  };

  return (
    <FormDataContext.Provider value={value}>
      {props.children}
    </FormDataContext.Provider>
  );
};

FormDataProvider.propTypes = {};

export default FormDataProvider;
