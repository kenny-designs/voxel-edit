import React from "react";
import "./ColorPalette.css";
import { ChromePicker } from "react-color";

/**
 * Represents each individual color on the color palette.
 * @param {*} props
 * @returns {JSX}
 */
const ColorCell = (props) => {
  const { color, id, isActive } = props;
  const { r, g, b } = color.getRGB255();

  return (
    <div
      onClick={() => {
        props.onColorCellClick(id, { r, g, b });
      }}
      className={`color-cell ${isActive ? "active" : ""}`}
      style={{
        backgroundColor: `rgb(${r}, ${g}, ${b})`,
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
      currentColor: { r: 0, g: 0, b: 0 },
      selectedColor: 0,
    };
  }

  /**
   * Handles color picker change.
   * @param {*} rgb
   */
  handlePickerChange = ({ rgb }) => {
    // Tell the parent that there was a change in color
    this.props.onSelectedColorChange(this.state.selectedColor, rgb);

    this.setState({ currentColor: rgb });
  };

  /**
   * Updates the currently selected color cell to the given id
   * @param {number} id
   * @param {string} color - Color of the cell
   */
  onColorCellClick = (id, color) => {
    // Tell the parent that there is a new selected color/cell
    this.props.onNewSelectedColor(id);

    this.setState({ selectedColor: id, currentColor: color });
  };

  render() {
    // Create buttons for each color
    let buttons = [];
    const colors = this.props.onGetColorData();
    colors.forEach((color, index) => {
      buttons.push(
        <ColorCell
          key={index}
          id={index}
          onColorCellClick={this.onColorCellClick}
          color={color}
          isActive={index === this.state.selectedColor}
        />
      );
    });

    return (
      <div>
        <div className="color-cell-container">{buttons}</div>
        <ChromePicker
          color={this.state.currentColor}
          disableAlpha={true}
          onChangeComplete={this.handlePickerChange}
        />
      </div>
    );
  }
}

export default ColorPalette;
