import React from "react";
import Viewport from "./Viewport";
import "./GUIController.css";
import { Grid } from "semantic-ui-react";

/**
 * Handles switching between both desktop and mobile versions of the
 * UI. Whenever one of its chidlren updates, it will pass that data
 * up to its parent component.
 * @extends React.Component
 */
class GUIController extends React.Component {
  render() {
    return (
      <Grid celled className={"desktopGrid"}>
        <Grid.Row>
          <Grid.Column width={3}>
            <h1>Col1</h1>
          </Grid.Column>
          <Grid.Column width={11} style={{ padding: "0" }}>
            <Viewport onCanvasCreation={this.props.onCanvasCreation} />
          </Grid.Column>
          <Grid.Column width={2}>
            <h1>Col2</h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
    //return <Viewport onCanvasCreation={this.props.onCanvasCreation} />;
  }
}

export default GUIController;
