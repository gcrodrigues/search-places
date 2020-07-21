import React from "react";
import { render, fireEvent, getAllByText } from "@testing-library/react-native";
import MockedNavigator from "../../src/MockedNavigator";
import Home from "../../src/screens/Home";

describe("Home screen", () => {
  it("should be able to search places", () => {
    const { getByTestId } = render(<MockedNavigator component={Home} />);

    const input = getByTestId("search-input");
    fireEvent.changeText(input, "Farmácia");

    const button = getByTestId("search-button");
    fireEvent.press(button);

    expect(
      expect.arrayContaining([expect.objectContaining({ types: ["pharmacy"] })])
    );
  });
});
