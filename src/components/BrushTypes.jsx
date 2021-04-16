import React from "react";
import { Menu } from "semantic-ui-react";

class BrushTypes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBrush: "add",
    };
  }

  /*
  componentDidMount() {
    // Send the initial brush name to parent component
    this.props.callbacks.onBrushChange(this.state.activeBrush);
  }
  */

  /**
   * Handler for each brush option. Upon click, updates the currently
   * selected brush.
   * @param {Event} e - React's original SyntheticEvent
   * @param {data} props - Prop data from the Menu.Item
   */
  /*
  handleBrushClick = (e, { name }) => {
    // Update state with current brush.
    this.setState({ activeBrush: name });

    // Send active brush name to parent component
    this.props.callbacks.onBrushChange(name);
  };
  */

  render() {
    const { activeBrush } = this.state;

    return (
      <React.Fragment>
        <Menu.Item name="add" active={activeBrush === "add"}>
          Single Voxel
        </Menu.Item>
        <Menu.Item name="remove" active={activeBrush === "remove"}>
          Extrude Voxel
        </Menu.Item>
        <Menu.Item name="paint" active={activeBrush === "paint"}>
          Box Voxel
        </Menu.Item>
      </React.Fragment>
    );
  }
}

export default BrushTypes;
