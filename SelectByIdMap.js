import TextInput from "../common/TextInput";
import React from "react";

const SelectByIdMap = props => {
  return props.formArray.map(formItem => {
    console.log(formItem.items);
    if (formItem.items.length === 1) {
      return (
        <div key={formItem.items.position}>
          <form className="form-group col-lg-12">
            <TextInput
              key={formItem.items.position}
              label={formItem.items[0].label}
              className="form-control input-sm"
              value={formItem.items[0].name}
              disabled={true}
            />
          </form>
        </div>
      );
    } else {
      return formItem.items.map((child, idx) => {
        console.log(child);
        return (
          <div className="col">
            {idx === 0 && (
              <div>
                <label className="form-label">{child.label}</label>
              </div>
            )}
            <form className="form-group col" style={{ display: "inline-flex" }}>
              <div className="container input-group">
                <label htmlFor={child.name}>{child.name}</label>
                <input
                  className="col-lg-12 input-group-append"
                  type={child.dataType}
                  name={child.name}
                />
              </div>
            </form>
          </div>
        );
      });
    }
  });
};

export default SelectByIdMap;
