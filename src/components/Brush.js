import React from "react";
import { Menu } from "semantic-ui-react";

/**
 * Allows user to switch between basic brush options such as add, remove, and paint.
 * @extends React.Component
 */
class Brush extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBrush: "add",
    };
  }

  componentDidMount() {
    // Send the initial brush name to parent component
    this.props.onBrushChange(this.state.activeBrush);
  }

  /**
   * Handler for each brush option. Upon click, updates the currently
   * selected brush.
   * @param {Event} e - React's original SyntheticEvent
   * @param {data} props - Prop data from the Menu.Item
   */
  handleBrushClick = (e, { name }) => {
    // Update state with current brush.
    this.setState({ activeBrush: name });

    // Send active brush name to parent component
    this.props.onBrushChange(name);
  };

  render() {
    const { activeBrush } = this.state;

    return (
      <React.Fragment>
        <Menu.Item
          name="add"
          active={activeBrush === "add"}
          onClick={this.handleBrushClick}
        >
          Add
        </Menu.Item>
        <Menu.Item
          name="remove"
          active={activeBrush === "remove"}
          onClick={this.handleBrushClick}
        >
          Remove
        </Menu.Item>
        <Menu.Item
          name="paint"
          active={activeBrush === "paint"}
          onClick={this.handleBrushClick}
        >
          Paint
        </Menu.Item>
      </React.Fragment>
    );
  }
}

export default Brush;
