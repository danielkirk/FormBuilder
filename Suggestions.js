import React from "react";
import Autocomplete from "react-autocomplete";

const Suggestions = props => {
  return (
    <Autocomplete
      wrapperProps={{
        className: "form-control",
        style: { padding: 0, zIndex: 99 }
      }}
      getItemValue={item => item.label}
      inputProps={{
        key: Math.floor(Math.random()) * 1000,
        disabled: props.dataType === "" ? true : false,
        className: "form-control",
        style: { border: "none", borderRadius: "0" },
        name: "label",
        placeholder: "Please enter a label name...",
        onKeyPress: props.handleKeyPress
      }}
      items={
        props.dataType === "text"
          ? [
              { label: "Legal First Name" },
              { label: "Legal Last Name" },
              { label: "Nickname" }
            ]
          : props.dataType === "date"
          ? [
              { label: "Birth Date" },
              { label: "Date of Birth" },
              { label: "Application Due Date" }
            ]
          : props.dataType === "tel"
          ? [
              { label: "Work Phone" },
              { label: "Cell Phone" },
              { label: "Home Phone" }
            ]
          : props.dataType === "checkbox"
          ? [{ label: "Race" }, { label: "Ethnicity" }, { label: "Asian" }]
          : [
              { label: "Gender" },
              { label: "Hispanic Heritage" },
              { label: "Veteran" }
            ]
      }
      renderItem={(item, isHighlighted) => {
        return (
          <div
            key={Math.floor(Math.random() * 1000)}
            style={{
              background: isHighlighted ? "lightgray" : "white"
            }}
          >
            {item.label}
          </div>
        );
      }}
      value={props.label}
      onChange={props.onInputFieldChange}
      onSelect={props.onSelect}
    />
  );
};

export default Suggestions;
