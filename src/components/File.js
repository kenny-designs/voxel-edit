import React from "react";
import { Dropdown } from "semantic-ui-react";

/**
 * Allows the user to perform file related actions such as save their
 * project or load one.
 * @extends React.Component
 */
class File extends React.Component {
  render() {
    return (
      <Dropdown text="File" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Item>Save Project</Dropdown.Item>
          <Dropdown.Item disabled>Load Project</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default File;
