import React from "react";
import "./ColorPalette.css";
import { ChromePicker } from "react-color";

/**
 * Represents each individual color on the color palette.
 * @param {*} props
 * @returns {JSX}
 */
const ColorCell = (props) => {
  return (
    <div
      onClick={() => {
        props.onColorCellClick(props.id, props.color);
      }}
      className={`color-cell ${props.isActive ? "active" : ""}`}
      style={{
        backgroundColor: props.color,
      }}
    ></div>
  );
};

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
      selectedColor: 0,
    };
  }

  /**
   * Handles color picker change.
   * @param {*} hex
   */
  handleChange = ({ hex }) => {
    this.setState({ currentHexColor: hex });
  };

  /**
   * Updates the currently selected color cell to the given id
   * @param {number} id
   * @param {string} color - Color of the cell
   */
  onColorCellClick = (id, color) => {
    this.setState({ selectedColor: id, currentHexColor: color });
  };

  render() {
    // Create buttons
    let buttons = [];
    for (let i = 0; i < 128; ++i) {
      buttons.push(
        <ColorCell
          key={i}
          id={i}
          onColorCellClick={this.onColorCellClick}
          color="#fff000"
          isActive={i === this.state.selectedColor}
        />
      );
    }

    return (
      <div>
        <div className="color-cell-container">{buttons}</div>
        <ChromePicker
          color={this.state.currentHexColor}
          disableAlpha={true}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default ColorPalette;
