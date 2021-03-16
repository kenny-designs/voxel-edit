import React from "react";

/**
 * Handles switching between both desktop and mobile versions of the
 * UI. Whenever one of its chidlren updates, it will pass that data
 * up to its parent component.
 * @extends React.Component
 */
class GUIController extends React.Component {
  render() {
    return <h2>GUIController!</h2>;
  }
}

export default GUIController;
