import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { PhoneField } from './phone-field';
import { fireEvent, wait } from '@testing-library/react';

interface IFieldData{
    value: string;
    status: string;
    event: string;
}
const testState = {label: 'Telefon', helperText: 'Ugyldig telefonnummer', testId:'flosTelefonField', required: true, fieldData: {} as IFieldData, isError: false};
const phoneField = <PhoneField testId={testState.testId} label={testState.label} helperText={testState.helperText} required={testState.required} fieldEvent={(e) => testState.fieldData = e}/>;

describe ('<PhoneField/> - Component render', ()=> {
    it ('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(phoneField, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('field is not allow string', async () => {
        const { getByTestId } =  ({
            ...render(phoneField)
         });
        fireEvent.change(getByTestId('flosTelefonField'), {
            target: {
                value: 'string value'
            }
        });
        await wait();
        expect((getByTestId('flosTelefonField') as HTMLInputElement).value).toBe('');
    });

    it('Check error message is visible in invalid state', async () => {
        const { getByTestId, getByText } =  ({
            ...render(phoneField)
        });
        fireEvent.change(getByTestId('flosTelefonField'), {
            target: {
                value: '1245'
            }
        });
        await wait();
       expect((getByText('Ugyldig telefonnummer'))).toBeTruthy();
    });

    it('Check blur event validate data', async () => {
        const { getByTestId, getByText } =  ({
            ...render(phoneField)
        });
        fireEvent.blur(getByTestId('flosTelefonField'), {
            target: {
                value: '1245'
            }
        });
        await wait();
        expect((getByText('Ugyldig telefonnummer'))).toBeTruthy();
    });

    it('Check blur event working correctly', async () => {
        const { getByTestId } =  ({
            ...render(phoneField)
        });
        fireEvent.blur(getByTestId('flosTelefonField'), {
            target: {
                value: '1245'
            }
        });
        await wait();
        expect((getByTestId('flosTelefonField') as HTMLInputElement).value).toBe('');
    });

    it('Check change event give the correct output', async () => {
        const { getByTestId } =  ({
            ...render(phoneField)
        });
        fireEvent.change(getByTestId('flosTelefonField'), {
            target: {
                value: '85854512'
            }
        });
        await wait();
        expect((getByTestId('flosTelefonField') as HTMLInputElement).value).toBe('85 85 45 12');
    });

    it('Check field event prop working correctly for valid input', async () => {
        const { getByTestId } =  ({
            ...render(phoneField)
        });
        fireEvent.change(getByTestId('flosTelefonField'), {
            target: {
                value: '85854512'
            }
        });
        await wait();
        expect(testState.fieldData.value).toBe('85854512');
        expect(testState.fieldData.status).toBe('valid');
        expect(testState.fieldData.event).toBe('change');
    });

    it('Check field event prop working correctly for invalid input', async () => {
        const { getByTestId } =  ({
            ...render(phoneField)
        });
        fireEvent.blur(getByTestId('flosTelefonField'), {
            target: {
                value: '124'
            }
        });
        await wait();
        expect(testState.fieldData.value).toBe('124');
        expect(testState.fieldData.status).toBe('inValid');
        expect(testState.fieldData.event).toBe('blur');
    });
});
