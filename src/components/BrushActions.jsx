import React from "react";
import { Menu } from "semantic-ui-react";

/**
 * Allows user to switch between brush actions add, remove, and paint.
 * @extends React.Component
 */
class BrushActions extends React.Component {
  constructor(props) {
    super(props);

    const activeBrushAction = this.props.callbacks.onGetBrushAction();

    this.state = {
      activeBrushAction,
    };
  }

  componentDidMount() {
    // Send the initial brush action to parent component
    //this.props.callbacks.onBrushActionChange(this.state.activeBrushAction);

    const activeBrushAction = this.props.callbacks.onGetBrushAction();
    this.setState({ activeBrushAction });
  }

  /**
   * Handler for each brush action option. Upon click, updates the current
   * brush action.
   * @param {Event} e - React's original SyntheticEvent
   * @param {data} props - Prop data from the Menu.Item
   */
  handleBrushClick = (e, { name }) => {
    // Update state with new brush action
    this.setState({ activeBrushAction: name });

    // Send active brush action to parent component
    this.props.callbacks.onBrushActionChange(name);
  };

  render() {
    const { activeBrushAction } = this.state;

    return (
      <React.Fragment>
        <Menu.Item
          name="add"
          active={activeBrushAction === "add"}
          onClick={this.handleBrushClick}
        >
          Add Voxel
        </Menu.Item>
        <Menu.Item
          name="remove"
          active={activeBrushAction === "remove"}
          onClick={this.handleBrushClick}
        >
          Remove Voxel
        </Menu.Item>
        <Menu.Item
          name="paint"
          active={activeBrushAction === "paint"}
          onClick={this.handleBrushClick}
        >
          Paint Voxel
        </Menu.Item>
      </React.Fragment>
    );
  }
}

export default BrushActions;
