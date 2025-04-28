import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "./searchBar";

const mockSearch = "Colombia";

const mockonChange = jest.fn();

describe("the SearchBar component", () => {
  it("should render the given options", () => {
    render(
      <SearchBar
      value=""
      onChange={mockonChange}
      placeholder="Search"
      />
    );

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("should render the given options", () => {
    render(
      <SearchBar
      value="mockSearch"
      onChange={mockonChange}
      placeholder="Search"
      />
    );
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "Colombia" } });

    expect(mockonChange).toHaveBeenCalled();
    expect(mockonChange).toHaveBeenCalledWith("Colombia");
  });
});