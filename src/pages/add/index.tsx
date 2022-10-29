import React from "react";
import { Provider } from "jotai";
import Form from "../../features/form";

const Add = () => {
  return (
    <>
      <Provider>
        <Form isAddMode={true} />
      </Provider>
    </>
  );
};

export default Add;
