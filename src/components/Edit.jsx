import React from "react";
import { Dropdown } from "semantic-ui-react";

/**
 * Allows the user to perform actions related to editing such as undo
 * or redo.
 * @extends React.Component
 */
class Edit extends React.Component {
  render() {
    return (
      <Dropdown text="Edit" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Item disabled>Undo</Dropdown.Item>
          <Dropdown.Item disabled>Redo</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default Edit;
