import React from "react";
import Viewport from "./Viewport";
import "./GUIController.css";
import { Grid, Sidebar, Segment, Menu } from "semantic-ui-react";

/**
 * Handles switching between both desktop and mobile versions of the
 * UI. Whenever one of its chidlren updates, it will pass that data
 * up to its parent component.
 * @extends React.Component
 */
class GUIController extends React.Component {
  /**
   * Creates the JSX for the desktop version of the viewport.
   * @returns {JSX}
   */
  createDesktopViewport() {
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} inverted direction="top" visible width="very thin">
          <Menu.Item as="a">Undo</Menu.Item>
          <Menu.Item as="a">Redo</Menu.Item>
        </Sidebar>
        <Viewport onCanvasCreation={this.props.onCanvasCreation} />
      </Sidebar.Pushable>
    );
  }

  /**
   * Create the desktop version of the UI.
   * @returns {JSX}
   */
  createDesktopGUI() {
    return (
      <Grid celled className={"desktopGrid"}>
        <Grid.Row>
          <Grid.Column width={3}>
            <h1>Left Panel</h1>
          </Grid.Column>

          <Grid.Column width={11} style={{ padding: "0" }}>
            {this.createDesktopViewport()}
          </Grid.Column>

          <Grid.Column width={2}>
            <h1>Right Panel</h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  /**
   * Create the mobile version of the UI.
   * @returns {JSX}
   */
  createMobileGUI() {
    return (
      <div style={{ height: "100vh" }}>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} inverted direction="top" visible width="very thin">
            <Menu.Item as="a">Color Palette</Menu.Item>
            <Menu.Item as="a">Edit</Menu.Item>
            <Menu.Item as="a">Camera</Menu.Item>
            <Menu.Item as="a">Project</Menu.Item>
          </Sidebar>

          <Sidebar as={Menu} inverted direction="bottom" visible width="thin">
            <Menu.Item as="a">Add</Menu.Item>
            <Menu.Item as="a">Remove</Menu.Item>
            <Menu.Item as="a">Paint</Menu.Item>
          </Sidebar>

          <Viewport onCanvasCreation={this.props.onCanvasCreation} />
        </Sidebar.Pushable>
      </div>
    );
  }

  render() {
    // TODO: Change from arbitrary number
    const isMobile = window.innerWidth < 768;
    return isMobile ? this.createMobileGUI() : this.createDesktopGUI();
  }
}

export default GUIController;
