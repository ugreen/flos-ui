import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./phone-field.css";
import { Rifm } from "rifm";

interface IFieldData {
  value: string;
  status: string;
  event: string;
}
type PhoneFieldProps = {
  label: string;
  required?: boolean;
  fieldEvent(v: IFieldData): void;
  allowInternational?: boolean;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  zIndex?: number;
  testId?: string;
  fullWidth?: boolean;
};

export const PhoneField = ({
  label,
  required,
  fieldEvent,
  disabled,
  placeholder,
  helperText,
  zIndex,
  testId,
  fullWidth,
}: PhoneFieldProps) => {
  const [phone, setPhone] = useState("");
  const [valid, setValid] = useState(true);
  const regExp = new RegExp("\\d+", "g");
  const helperMessage = helperText ? helperText : "Ugyldig telefonnummer";

  const parseDigits = (input: string) => (input.match(regExp) || []).join("");

  const removeWhiteSpace = (input: string) => input.replace(/\s+/g, "");

  const formatPhone = (input: string) => {
    if (input && regExp.test(input) && input !== "") {
      const digits = parseDigits(input).substr(0, 8);
      const formatNumber = digits.match(/.{1,2}/g) as Array<string>;
      return formatNumber.join(" ") as string;
    } else {
      return "";
    }
  };

  function onChangeHandler(formattedValue: string) {
    setPhone(formattedValue);
    const actualInput = removeWhiteSpace(formattedValue);
    if (actualInput && actualInput.length === 8) {
      fieldEvent({ value: actualInput, status: "valid", event: "change" });
      required && setValid(true);
    } else {
      fieldEvent({ value: actualInput, status: "inValid", event: "change" });
      required && setValid(false);
    }
  }

  function onBlurHandler(e: React.FocusEvent<HTMLInputElement>) {
    const phoneNumber = e.target.value;
    if (phoneNumber === "") {
      fieldEvent({ value: phoneNumber, status: "empty", event: "blur" });
      setValid(true);
    } else {
      const phoneNumberWithoutSpace = removeWhiteSpace(e.target.value);
      if (required) {
        if (phoneNumberWithoutSpace.length === 8) {
          fieldEvent({
            value: phoneNumberWithoutSpace,
            status: "valid",
            event: "blur",
          });
          setValid(true);
        } else {
          fieldEvent({
            value: phoneNumberWithoutSpace,
            status: "inValid",
            event: "blur",
          });
          setValid(false);
        }
      } else {
        fieldEvent({
          value: phoneNumberWithoutSpace,
          status: "optional",
          event: "blur",
        });
        setValid(true);
      }
    }
  }

  function onFocusHandler() {
    setValid(true);
  }

  return (
    <Rifm
      accept={regExp}
      format={formatPhone}
      value={phone}
      onChange={onChangeHandler}
    >
      {({ value, onChange }) => (
        <TextField
          error={!valid}
          required={required}
          className={"flos-telephone-field"}
          disabled={disabled && disabled}
          inputProps={{ "data-testid": testId ? testId : "" }}
          label={label}
          value={value}
          type={"tel"}
          onChange={onChange}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => onBlurHandler(e)}
          onFocus={onFocusHandler}
          placeholder={placeholder && placeholder}
          helperText={required && !valid && helperMessage}
          fullWidth={fullWidth && fullWidth}
        />
      )}
    </Rifm>
  );
};
