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

    // Test object for json:
    let myObj = {
      shoppingList: {
        fruits: ["bananas", "apples", "oranges"],
        grains: ["whole wheat bread", "spaghetti"],
        games: ["Yes"],
      },
      money: 0,
    };

    const myObjJSON = JSON.stringify(myObj);

    // Create the blob to download
    let blob = new Blob([myObjJSON], {
      type: "application/json",
    });

    // Download it
    FileSaver.saveAs(blob, "shopping-list.json");
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
