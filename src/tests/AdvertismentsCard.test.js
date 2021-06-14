import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import AdvertismentsCard from "../views/AdvertismentsCard";

test("renders component", async () => {
  const { getByText } = render(<AdvertismentsCard />);
  expect(getByText("Description:")).toBeInTheDocument();
});
