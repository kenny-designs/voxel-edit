import React from "react";
import "./ColorPalette.css";
import { ChromePicker } from "react-color";
import { Icon } from "semantic-ui-react";

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

    // Get data from parent component
    const { currentColor, selectedColorIndex } = this.props.onGetColorData();

    this.state = {
      currentColor,
      selectedColorIndex,
    };
  }

  /**
   * Handles color picker change.
   * @param {*} rgb
   */
  handlePickerChange = ({ rgb }) => {
    // Tell the parent that there was a change in color
    this.props.onSelectedColorChange(this.state.selectedColorIndex, rgb);

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

    this.setState({ selectedColorIndex: id, currentColor: color });
  };

  onAddColorBtnClick = () => {
    console.log("We clicked it!");
  };

  render() {
    // Create buttons for each color
    let buttons = [];
    const { colors } = this.props.onGetColorData();
    colors.forEach((color, index) => {
      buttons.push(
        <ColorCell
          key={index}
          id={index}
          onColorCellClick={this.onColorCellClick}
          color={color}
          isActive={index === this.state.selectedColorIndex}
        />
      );
    });

    return (
      <div>
        <div className="color-cell-container">
          {buttons}
          <div
            className="color-cell add-cell-btn"
            onClick={this.onAddColorBtnClick}
          >
            <Icon name="plus" />
          </div>
        </div>
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
