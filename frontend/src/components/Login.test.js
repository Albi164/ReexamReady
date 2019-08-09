import React from 'react'
import Login from "./Login";
import {cleanup, render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";

describe('Check for text in header', () => {
    it('should contain the proper text', () => {
        const {getByText} = render(<BrowserRouter><Login/></BrowserRouter>);
        getByText('Login as a company!');
    });
});

afterEach(cleanup);