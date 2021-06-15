import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Content from "../views/Content";

test("renders component", async () => {
  const { getByText } = render(<Content />);
  expect(getByText("Add user")).toBeInTheDocument();
});
