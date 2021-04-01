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
    const {
      currentColor,
      selectedColorIndex,
      isColorsFull,
    } = this.props.onGetColorData();

    this.state = {
      currentColor,
      selectedColorIndex,
      isColorsFull,
    };
  }

  /**
   * Checks for changes in color data from the onGetColorData() prop. If
   * there are any, updates the state.
   */
  updateColorData = () => {
    const {
      currentColor,
      selectedColorIndex,
      isColorsFull,
    } = this.props.onGetColorData();

    let newState = {};

    if (this.state.isColorsFull !== isColorsFull) {
      newState.isColorsFull = isColorsFull;
    }

    if (this.state.selectedColorIndex !== selectedColorIndex) {
      newState.selectedColorIndex = selectedColorIndex;
    }

    const { r, g, b } = this.state.currentColor;
    if (r !== currentColor.r || g !== currentColor.g || b !== currentColor.b) {
      newState.currentColor = currentColor;
    }

    if (Object.keys(newState).length !== 0) {
      this.setState(newState);
    }
  };

  componentDidUpdate() {
    this.updateColorData();
  }

  /**
   * Handles color picker change.
   * @param {*} rgb
   */
  handlePickerChange = ({ rgb }) => {
    // Tell the parent that there was a change in color
    this.props.onSelectedColorChange(this.state.selectedColorIndex, rgb);

    this.updateColorData();
  };

  /**
   * Updates the currently selected color cell to the given id
   * @param {number} id
   * @param {string} color - Color of the cell
   */
  onColorCellClick = (id, color) => {
    // Tell the parent that there is a new selected color/cell
    this.props.onNewSelectedColor(id);

    this.updateColorData();
  };

  /**
   * Handles when the add cell button is clicked.
   */
  onAddCellClick = () => {
    // Add a new color to the palette
    this.props.onAddColor();

    this.updateColorData();
  };

  /**
   * Creates the JSX for all of the color select buttons.
   * @returns {JSX}
   */
  getColorCells = () => {
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

    return buttons;
  };

  /**
   * Creates the JSX for the add color cell. If the internal ColorPalette's
   * colors array is full, returns null instead.
   * @returns {JSX}
   */
  getAddColorCell = () => {
    if (this.state.isColorsFull) return null;

    return (
      <div className="color-cell add-cell-btn" onClick={this.onAddCellClick}>
        <Icon name="plus" />
      </div>
    );
  };

  render() {
    return (
      <div>
        <div className="color-cell-container">
          {this.getColorCells()}
          {this.getAddColorCell()}
        </div>
        <ChromePicker
          color={this.state.currentColor}
          disableAlpha={true}
          onChange={this.handlePickerChange}
        />
      </div>
    );
  }
}

export default ColorPalette;
