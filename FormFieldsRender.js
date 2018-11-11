import React from "react";
import TextInput from "../common/TextInput";
import { Draggable } from "react-beautiful-dnd";

const FormFieldsRender = props => {
  return props.formFieldsArr.map((field, index) => {
    if (
      field.dataType === "text" ||
      field.dataType === "date" ||
      field.dataType === "tel"
    ) {
      console.log(field, index);
      return (
        <React.Fragment key={index}>
          <Draggable draggableId={`draggable-${index}`} index={index}>
            {provided => (
              <div
                key={index}
                className="mb-1"
                style={{
                  backgroundColor: "pink"
                }}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <TextInput
                  id={index}
                  label={field.label}
                  name={field.label}
                  type={field.dataType}
                  disabled={true}
                />
                <button
                  className="btn btn-outline-danger float-right"
                  id={index}
                  onClick={props.deleteFormField}
                  type="button"
                >
                  Delete
                </button>
                <br />
              </div>
            )}
          </Draggable>
        </React.Fragment>
      );
    } else {
      return (
        <Draggable draggableId={`draggable-${index}`} index={index}>
          {provided => (
            <div
              className="col-lg-12"
              key={index}
              style={{
                backgroundColor: "pink"
              }}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              {" "}
              {field.options.map((option, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <div>
                      {idx === 0 && (
                        <label className="form-label">{field.label}</label>
                      )}
                      <div className="input-group col-lg-12">
                        <div className="form-control">
                          {" "}
                          <span className="input-group-append">
                            <input
                              type="text"
                              className="col-lg-10"
                              id={idx}
                              value={option.name}
                              onChange={props.dropdownInputChange}
                              index={index}
                              parentId={idx}
                              position={idx}
                              name={field.label}
                            />
                            <input
                              id={idx}
                              className="input-md input-group-prepend"
                              type={
                                field.dataType === "checkbox"
                                  ? "checkbox"
                                  : "radio"
                              }
                            />
                          </span>
                        </div>
                      </div>
                      <br />
                    </div>
                    {field.options.length - idx === 1 ? (
                      <React.Fragment>
                        <button
                          className="btn btn-outline-danger float-right"
                          name={field.dataType}
                          id={index}
                          onClick={props.deleteFormField}
                          type="button"
                        >
                          Delete
                        </button>
                        <br />
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </Draggable>
      );
    }
  });
};

export default FormFieldsRender;
