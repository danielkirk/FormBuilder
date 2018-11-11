import React from "react";
import FormService from "../../services/FormService";
import SelectByIdMap from "../formbuilder/SelectByIdMap";

class SelectByFormId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formArray: []
    };
  }

  componentDidMount() {
    const { formId } = this.props.match.params;
    this.setState({ formId: formId });
    if (formId) {
      FormService.selectByFormId(
        formId,
        this.selectByFormIdSuccess,
        this.selectByFormIdError
      );
    }
  }

  selectByFormIdSuccess = response => {
    this.setState(
      {
        title: response.data[0].items[0].title,
        description: response.data[0].items[0].description,
        formArray: this.state.formArray.concat(response.data),
        version: `v${response.data[0].items[0].version}`
      },
      () => {
        console.log(this.state.formArray);
      }
    );
  };

  selectByFormIdError = error => console.log(error);

  editForm = () => {
    const { formId } = this.props.match.params;
    this.props.history.push(`/formbuilder/create/${formId}`);
  };

  manageForm = () => {
    this.props.history.push("/formbuilder/manage");
  };

  render() {
    return (
      <React.Fragment>
        <h4 className="d-flex justify-content-between align-items-center py-2 mb-4">
          <div className="font-weight-bold">
            {this.state.title} {this.state.version}
          </div>
          <button
            type="button"
            onClick={this.editForm}
            className="btn btn-success"
          >
            Edit
          </button>
        </h4>
        <h5>
          <em>{this.state.description}</em>
        </h5>
        <hr className="border-light container-m--x my-0" />
        <div className="card-body col-lg-4">
          <SelectByIdMap formArray={this.state.formArray} />
        </div>
        <button
          type="button"
          onClick={this.manageForm}
          className="btn btn-primary float-right"
        >
          View Forms
        </button>
      </React.Fragment>
    );
  }
}

export default SelectByFormId;
