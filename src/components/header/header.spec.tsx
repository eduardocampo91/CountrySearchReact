import { render, screen } from "@testing-library/react";
import Header from "./header";


describe("the Header component", () => {
  it("should render", () => {
    render(
      <Header/>
    );
    expect(screen.getByText("Countries Search App")).toBeInTheDocument();
  });
});