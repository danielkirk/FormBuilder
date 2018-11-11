import React from "react";
import { Link, Route } from "react-router-dom";
import CreateForm from "./CreateForm";
import SelectFormById from "./SelectByFormId";
import ManageForms from "./ManageForms";

class FormBuilderNavigation extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/formbuilder/create" component={CreateForm} />
        <Route
          exact
          path="/formbuilder/create/:formId"
          component={CreateForm}
        />
        <Route path="/formbuilder/manage/:formId" component={SelectFormById} />
        <Route exact path="/formbuilder/manage" component={ManageForms} />
      </React.Fragment>
    );
  }
}

export default FormBuilderNavigation;
