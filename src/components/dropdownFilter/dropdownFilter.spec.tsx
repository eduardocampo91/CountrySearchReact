import { fireEvent, render, screen } from "@testing-library/react";
import DropdownFilter from "./dropdownFilter";

const mockDropdownOptions = ["AA", "BB", "CC"];
const mockOnChange = jest.fn();

describe("the DropdownFilter component", () => {
  it("should render the given options", () => {
    render(
      <DropdownFilter
        options={mockDropdownOptions}
        value=""
        onChange={mockOnChange}
        label="Filter"
      />
    );

    expect(screen.getByText("AA")).toBeInTheDocument();
    expect(screen.getByText("BB")).toBeInTheDocument();
    expect(screen.getByText("CC")).toBeInTheDocument();
  });

  it("should call mockOnChange function when an option is selected", () => {
    render(
      <DropdownFilter
        options={mockDropdownOptions}
        value=""
        onChange={mockOnChange}
        label="Filter"
      />
    );
    const selection = screen.getByRole('combobox');
    fireEvent.change(selection, { target: { value: mockDropdownOptions[1] } });

    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledWith("BB");
  });
});
