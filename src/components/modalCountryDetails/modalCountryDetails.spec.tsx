import { fireEvent, render, screen } from "@testing-library/react";
import ModalCountryDetail from "./modalCountryDetails";

const mockSelectedCountry = {
        code: "CO",
        name: "Colombia",
        capital: "Bogotá",
        currency: "COP",
        continent: {
          name: "South America"
        },
        languages: [
          {
            name: "Spanish"
          }
        ]
};

const mockonHide = jest.fn();

describe("the ModalCountryDetail component", () => {
  it("should render the given options", () => {
    render(
      <ModalCountryDetail
        show={true}
        country={mockSelectedCountry}
        onHide={mockonHide}
      />
    );

    expect(screen.getByText("Bogotá")).toBeInTheDocument();
    expect(screen.getByText("COP")).toBeInTheDocument();
    expect(screen.getByText("South America")).toBeInTheDocument();
    expect(screen.getByText("Spanish")).toBeInTheDocument();
  });

  it("should call mockonHide when clickin the close button in modal", () => {
    render(
      <ModalCountryDetail
        show={true}
        country={mockSelectedCountry}
        onHide={mockonHide}
      />
    );
    fireEvent.click(screen.getByTestId("footer-close-btn"));

    expect(mockonHide).toHaveBeenCalled();
  });

});
