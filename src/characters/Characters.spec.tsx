//test
import React from "react";
import { render, screen } from "@testing-library/react";
import Characters from "./Characters";

test("renders characters", () => {
  render(<Characters />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
