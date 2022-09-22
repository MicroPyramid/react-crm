import React, { useState } from "react";

export const UseContactForm = (submitCallBack) => {
  const [state, setState] = useState({});

  const onChangeHandler = (e) => {
    setState((contactstate) => ({ ...contactstate, [e.target.name]: e.target.value }));
  };
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    submitCallBack();
  };
  return [state, onChangeHandler, onSubmitHandler];
};