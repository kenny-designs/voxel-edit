import React from "react";
import { Dropdown } from "semantic-ui-react";
import FileSaver from "file-saver";

/**
 * Allows the user to perform file related actions such as save their
 * project or load one.
 * @TODO File is already a class used within the browser. Rename this! It might
 * be time to start referring to all components as just SomethingComponent or similar.
 *
 * @property {Input} loadFileInput - Input used for selecting project file to load
 * @property {FileReader} loadFileReader - Reads data from selected project file
 * @extends React.Component
 */
class File extends React.Component {
  constructor(props) {
    super(props);

    // Create input for allowing users to select their project to load
    this.loadFileInput = document.createElement("input");
    this.loadFileInput.type = "file";
    this.loadFileInput.accept = ".json";
    this.loadFileInput.addEventListener("change", this.handleFileSelected);

    // Create FileReader for loading user projects
    this.loadFileReader = new FileReader();
    this.loadFileReader.addEventListener("load", this.handleFileRead);
  }

  /**
   * Callback for when users wish to save their project. Creates a JSON file
   * with the contents of the 3D scene then saves locally to the user's device.
   */
  onSaveProject = () => {
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

  /**
   * Callback for when users wish to load a pre-existing project.
   */
  onLoadProject = () => {
    this.loadFileInput.click();
  };

  /**
   * Handler for when the users selects the file they wish to load.
   * @param {Event} e
   */
  handleFileSelected = (e) => {
    this.loadFileReader.readAsText(this.loadFileInput.files[0]);
  };

  /**
   * Handler for reading the data from the user's selected project file.
   * @param {Event} e
   */
  handleFileRead = (e) => {
    const json = JSON.parse(e.target.result);
    console.log(json);
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
