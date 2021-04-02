import React from "react";
import { Dropdown } from "semantic-ui-react";
import FileSaver from "file-saver";

/**
 * Allows the user to perform file related actions such as save their
 * project or load one.
 * @extends React.Component
 */
class File extends React.Component {
  onSaveProject = () => {
    console.log("Saving project...");

    // Create the blob to download
    let blob = new Blob(["Hello, world!"], {
      type: "text/plain;charset=utf-8",
    });

    // Download it
    FileSaver.saveAs(blob, "hello-world.txt");
  };

  onLoadProject = () => {
    console.log("Loading project...");
  };

  render() {
    return (
      <Dropdown text="File" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Item onClick={this.onSaveProject}>
            Save Project
          </Dropdown.Item>
          <Dropdown.Item onClick={this.onLoadProject}>
            Load Project
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default File;
