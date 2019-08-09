import React from 'react'
import Login from "./Login";
import {cleanup, render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";

afterEach(cleanup);
describe('Login button clicked', () => {
    it('should click on text', () => {
        const { getByText } = render(<BrowserRouter><Login name="Submit" /></BrowserRouter>);
        const textEl = getByText('Submit');
        fireEvent.click(textEl)
    })
});
afterEach(cleanup);
describe('No changes on re rendering', () => {
    it('should contains name with prop change', () => {
        const { getByText, rerender } = render(<BrowserRouter><Login name="Submit" /></BrowserRouter>);
        getByText('Submit');
        rerender(<BrowserRouter><Login name="Submit" /></BrowserRouter>);
        getByText('Submit')
    })
});
