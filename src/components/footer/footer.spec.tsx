import { render, screen } from "@testing-library/react";
import Footer from "./footer";


describe("the Footer component", () => {
  it("should render", () => {
    render(
      <Footer/>
    );
    expect(screen.getByText("© 2025 Country Search App. All rights reserved.")).toBeInTheDocument();
  });
});