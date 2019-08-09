import React from 'react'
import TvChannels from "./TvChannels";
import {cleanup, render, fireEvent} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";

describe('Check for link text', () => {
    it('should contain the proper text', () => {
        const {getByText} = render(<BrowserRouter><TvChannels/></BrowserRouter>);
        getByText('Login');
    });
});

afterEach(cleanup);
describe('Test that there are no changes on re rendering', () => {
    it('should contains name with prop change', () => {
        const { getByText, rerender } = render(<BrowserRouter><TvChannels name="Login" /></BrowserRouter>);
        getByText('Login')
        rerender(<BrowserRouter><TvChannels name="Login" /></BrowserRouter>);
        getByText('Login')
    })
});