import React from "react";
import FormService from "../../services/FormService";
import SweetAlert from "react-bootstrap-sweetalert";
import InputControlsService from "../../services/InputControlsService";

class ManageForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allFormsArr: [],
      confirmDelete: false,
      formId: ""
    };
  }

  componentDidMount() {
    FormService.getAll(this.getAllSuccess, this.getAllError);
  }

  getAllSuccess = resp => {
    this.setState({
      allFormsArr: resp.data.items.reverse()
    });
    console.log(resp);
  };

  getAllError = err => {
    alert("Error: Form Get All Failed");
    console.log(err);
  };

  formClick = evt => {
    console.log(evt.target.id);
    this.props.history.push(`/formbuilder/manage/${evt.target.id}`);
  };

  cancelBack = () => {
    this.setState({ confirmDelete: false, formId: "" });
  };

  showConfirm = evt => {
    this.setState({ confirmDelete: true, formId: evt.target.id });
  };

  deleteForm = evt => {
    console.log(this.state.formId);
    InputControlsService.delete(
      this.state.formId,
      this.deleteSuccess,
      this.deleteError
    );
  };

  deleteSuccess = resp => {
    FormService.getAll(this.getAllSuccess, this.getAllError);
    this.cancelBack();
  };

  deleteError = err => {
    alert("Not very sweet alert :(");
  };

  render() {
    return (
      <React.Fragment>
        <h4 className="d-flex justify-content-between align-items-center py-2 mb-4">
          <div className="font-weight-bold">Form Builder</div>
        </h4>
        <h2>Manage</h2>
        <SweetAlert
          warning
          showCancel
          show={this.state.confirmDelete}
          allowEscape={true}
          closeOnClickOutside={true}
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title="Are you sure?"
          onConfirm={this.deleteForm}
          onCancel={this.cancelBack}
        >
          You will not be able to recover this form!
        </SweetAlert>
        <div className="row">
          {this.state.allFormsArr.map((form, index) => {
            return (
              <div
                key={index}
                className="col-s-6 col-md-6 col-lg-6 card mb-4 d-inline-block"
              >
                <div
                  className="card-header text-center formTitle"
                  id={form.id}
                  onClick={this.formClick}
                >
                  <strong>Title: {form.title}</strong>
                </div>
                <div className="card-body">
                  <div className="card-title">
                    <strong>Version:</strong> {form.version}
                  </div>
                  <div className="card-text">
                    <strong>Description:</strong> {form.description}
                  </div>
                </div>
                <button
                  id={form.id}
                  className="btn btn-danger float-right"
                  onClick={this.showConfirm}
                >
                  >:^(
                </button>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default ManageForms;
