import {cleanup, render,  fireEvent} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import Post from "./Post";

describe('Login button clicked', () => {
    it('should click on text', () => {
        const { getByText } = render(<BrowserRouter><Post name="Submit" /></BrowserRouter>);
        const textEl = getByText('Submit');
        fireEvent.click(textEl)
    })
});
afterEach(cleanup);