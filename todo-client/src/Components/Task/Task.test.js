import {render,fireEvent,screen} from "@testing-library/react";
import Task from "./Task";
import React from "react";

test('In Progress label rendered', () => {
  const { getByText } = render(<Task />);
  const labelTask = getByText('In Progress');
  expect(labelTask).toBeInTheDocument();
});

test('Done label rendered', () => {
  const { getByText } = render(<Task />);
  const labelTask = getByText('Done');
  expect(labelTask).toBeInTheDocument();
});






