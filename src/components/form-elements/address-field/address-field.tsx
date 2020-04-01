import React from "react";
import TextField from "@material-ui/core/TextField";
import { dawaAutocomplete } from "dawa-autocomplete2";
import "./address-field.css";
import { validateAddress } from "./validateAddress";

type FieldEventDataProps = {
  zipCode: string;
  address: string;
  status: string;
  event: string;
};

type AddressFieldProps = {
  elementId: string;
  label: string;
  required: boolean;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  minLength?: number;
  defaultValue?: string;
  testId?: string;
  fieldEvent(v: FieldEventDataProps): void;
  fullWidth?: boolean;
};

export const AddressField = ({
  elementId,
  label,
  fieldEvent,
  required,
  placeholder,
  helperText,
  disabled,
  minLength,
  testId,
  defaultValue,
  fullWidth,
}: AddressFieldProps) => {
  const [isError, setIsError] = React.useState(false);
  const [dawaComp, setDawaComp] = React.useState(null);
  const minimumLength = minLength ? minLength : 3;
  let zipCode = "";
  const baseUrl = "https://dawa.aws.dk";

  function fieldEventHandler(val: string, status: string, ev: string) {
    fieldEvent({
      address: val,
      status: status,
      zipCode: zipCode,
      event: ev,
    });
  }

  function handleOnBlur(event: React.ChangeEvent<HTMLInputElement>) {
    verifyAddress(event.target.value, "blur");
  }

  function handleOnFocus() {
    setIsError(false);
  }

  function handleOnSelect(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length >= minimumLength) {
      verifyAddress(event.target.value, "select");
    }
  }

  function verifyAddress(currentValue: string, eventType: string) {
    if (dawaComp) {
      validateAddress(currentValue, baseUrl).then(
        (postNr: string) => {
          zipCode = postNr;
          setIsError(false);
          fieldEventHandler(currentValue, "valid", eventType);
        },
        (postNr: string) => {
          zipCode = postNr;
          if (currentValue.length === 0) {
            setIsError(false);
            fieldEventHandler(currentValue, "empty", eventType);
          } else {
            setIsError(true);
            fieldEventHandler(currentValue, "inValid", eventType);
          }
        }
      );
    } else {
      //custom validation (if skip DAWA)
      fieldEventHandler(currentValue, "custom", eventType);
      setIsError(true);
    }
  }

  React.useEffect(() => {
    setIsError(false);
    const inputElement = document.getElementById(elementId);
    if (inputElement) {
      const dawaComponent = dawaAutocomplete(inputElement, {
        baseUrl: baseUrl,
        adgangsadresserOnly: false,
        fuzzy: true,
        stormodtagerpostnumre: true,
        minLength: minimumLength,
        multiline: false,
      });
      setDawaComp(dawaComponent);
    }
  }, [elementId, minimumLength]);

  return (
    <TextField
      error={isError}
      required={required}
      disabled={disabled && disabled}
      id={elementId}
      label={label}
      placeholder={placeholder && placeholder}
      helperText={helperText && isError && helperText}
      autoComplete={"on"}
      onSelect={handleOnSelect}
      onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
        handleOnBlur(event);
      }}
      onFocus={handleOnFocus}
      defaultValue={defaultValue && defaultValue}
      className={"flos-address-field"}
      fullWidth={fullWidth && fullWidth}
      margin="normal"
      inputProps={{ "data-testid": testId ? testId : "" }}
    />
  );
};
