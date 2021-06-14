import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Target from "../views/Target";

test("renders component", async () => {
  const { getByText } = render(<Target />);
  expect(getByText("Target")).toBeInTheDocument();
});
