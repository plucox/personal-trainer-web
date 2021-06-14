import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Navigator from "../views/Navigator";

test("renders component", async () => {
  const { getByText } = render(<Navigator />);
  expect(getByText("Authentication")).toBeInTheDocument();
});
