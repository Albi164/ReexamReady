import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {cleanup, render,  fireEvent} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('renders App with header text', () =>
{const {getByText} = render(<App/>);
  expect(getByText(/Categories/i)).toBeInTheDocument();
});