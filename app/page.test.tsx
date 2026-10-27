import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./page";

test("calculates and toggles the 24h breakdown", () => {
  render(<Home />);
  fireEvent.change(screen.getByLabelText("Voltage (V)"), { target: { value: "230" } });
  fireEvent.change(screen.getByLabelText("Current (A)"), { target: { value: "5" } });
  fireEvent.change(screen.getByLabelText("Rate (sen/kWh)"), { target: { value: "50" } });
  fireEvent.click(screen.getByRole("button", { name: "Calculate" }));
  expect(screen.getByText("1,150.00 W")).toBeInTheDocument();
  expect(screen.getByText("27.6000 kWh")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /Show 24-Hour Breakdown/ }));
  expect(screen.getAllByRole("row")).toHaveLength(25);

  fireEvent.click(screen.getByRole("button", { name: "Reset" }));
  expect(screen.queryByText("1,150.00 W")).not.toBeInTheDocument();
});

test("shows errors for empty input", () => {
  render(<Home />);
  fireEvent.click(screen.getByRole("button", { name: "Calculate" }));
  expect(screen.getByRole("alert")).toHaveTextContent("valid positive voltage");
});
