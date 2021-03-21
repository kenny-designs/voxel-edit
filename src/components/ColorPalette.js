import React from "react";
import { ChromePicker } from "react-color";

/**
 * Allows the user to select what colors they wish to paint with,
 * choose new colors to paint with, and select the color that they
 * are currently painting with.
 * @extends React.Component
 */
class ColorPalette extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentHexColor: "#000000",
    };
  }

  /**
   * Handles color picker change.
   * @param {*} param0
   */
  handleChange = ({ hex }) => {
    this.setState({ currentHexColor: hex });
  };

  render() {
    return (
      <React.Fragment>
        <h1>ColorPalette</h1>
        <ChromePicker
          color={this.state.currentHexColor}
          disableAlpha={true}
          onChange={this.handleChange}
        />
      </React.Fragment>
    );
  }
}

export default ColorPalette;
