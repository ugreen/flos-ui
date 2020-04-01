import React from "react";
import ReactDOM from "react-dom";
// custom
import * as TestRenderer from "react-test-renderer";
import { AddressField } from "./address-field";

let renderer: TestRenderer.ReactTestRenderer;
let instance: TestRenderer.ReactTestInstance;

const testState = {
  label: "Adresse",
  elementId: "tdk-address-autocomplete",
  helperText: "Ugyldig adresse",
  required: true,
  fieldData: {},
  isError: false,
};
const flosAutoComplete = (
  <AddressField
    label={testState.label}
    elementId={testState.elementId}
    helperText={testState.helperText}
    required={testState.required}
    fieldEvent={(e) => (testState.fieldData = e)}
  />
);

beforeAll(() => {
  renderer = TestRenderer.create(
    <AddressField
      label={testState.label}
      elementId={testState.elementId}
      helperText={testState.helperText}
      required={testState.required}
      fieldEvent={(e) => (testState.fieldData = e)}
    />
  );
  instance = renderer.root;
});

describe("<FlosAutoComplete/> - Component render", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(flosAutoComplete, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Check Material UI render the element correctly", () => {
    const autocomplete = instance.findAll(
      (el: any) =>
        el.type == "input" &&
        el.props.type == "text" &&
        el.props.required == true
    );
    expect(autocomplete).toHaveLength(1);
  });

  it("Check on blur event is working correctly", () => {
    const autocomplete = instance.findAll(
      (el) =>
        el.type == "input" &&
        el.props.type == "text" &&
        el.props.required == true
    );
    TestRenderer.act(() => {
      autocomplete[0].props.onBlur({
        target: { value: "Tessebøllevej 2, 4681 Herfølge" },
      });
    });
    expect((testState.fieldData as any).address).toEqual(
      "Tessebøllevej 2, 4681 Herfølge"
    );
    expect((testState.fieldData as any).status).toEqual("custom");
    expect((testState.fieldData as any).zipCode).toEqual("");
    expect((testState.fieldData as any).event).toEqual("blur");
  });

  it("Check on focus event is working correctly", () => {
    const autocomplete = instance.findAll(
      (el: any) =>
        el.type == "input" &&
        el.props.type == "text" &&
        el.props.required == true
    );
    TestRenderer.act(() => {
      autocomplete[0].props.onFocus({ target: { value: "" } });
    });
    const errorEle = instance.findAll((el: any) => el.type == "p");
    expect(errorEle).toHaveLength(0);
  });

  it("Check Error state with invalid input", () => {
    const autocomplete = instance.findAll(
      (el: any) =>
        el.type == "input" &&
        el.props.type == "text" &&
        el.props.required == true
    );
    TestRenderer.act(() => {
      autocomplete[0].props.onBlur({ target: { value: "invalid address" } });
    });
    const errorEle = instance.findAll((el: any) => el.type == "p");
    expect(errorEle).toHaveLength(1);
  });
});
