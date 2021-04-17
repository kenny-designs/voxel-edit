import React from "react";
import { Menu } from "semantic-ui-react";

/**
 * Allows user to switch between brush types single and extrude.
 * @extends React.Component
 */
class BrushTypes extends React.Component {
  constructor(props) {
    super(props);

    const activeBrushType = this.props.callbacks.onGetBrushType();

    this.state = {
      activeBrushType,
    };
  }

  componentDidMount() {
    // Send the initial brush type to parent component
    // this.props.callbacks.onBrushTypeChange(this.state.activeBrushType);

    const activeBrushType = this.props.callbacks.onGetBrushType();
    this.setState({ activeBrushType });
  }

  /**
   * Handler for each brush type option. Upon click, updates the current
   * brush type.
   * @param {Event} e - React's original SyntheticEvent
   * @param {data} props - Prop data from the Menu.Item
   */
  handleBrushClick = (e, { name }) => {
    // Update state with new brush type
    this.setState({ activeBrushType: name });

    // Send active brush type to parent component
    this.props.callbacks.onBrushTypeChange(name);
  };

  render() {
    const { activeBrushType } = this.state;

    return (
      <React.Fragment>
        <Menu.Item
          name="single"
          active={activeBrushType === "single"}
          onClick={this.handleBrushClick}
        >
          Single Voxel
        </Menu.Item>
        <Menu.Item
          name="extrude"
          active={activeBrushType === "extrude"}
          onClick={this.handleBrushClick}
        >
          Extrude Voxel
        </Menu.Item>
      </React.Fragment>
    );
  }
}

export default BrushTypes;
