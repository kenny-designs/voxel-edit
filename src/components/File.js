import React from "react";
import { Dropdown } from "semantic-ui-react";
import SubmitTextModal from "./SubmitTextModal";
import FileSaver from "file-saver";

/**
 * Allows the user to perform file related actions such as save their
 * project or load one.
 * @TODO File is already a class used within the browser. Rename this! It might
 * be time to start referring to all components as just SomethingComponent or similar.
 *
 * @property {Input} loadFileInput - Input used for selecting project file to load
 * @property {FileReader} loadFileReader - Reads data from selected project file
 * @property {number} maxNameLength - Max chars a user can enter for their filename. Default 100
 * @extends React.Component
 */
class File extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSaveModalOpen: false,
      isExportModalOpen: false,
      exportType: "",
    };

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
   * @function
   * @param {string} filename What to name the saved project file
   */
  handleSaveProject = (filename) => {
    // Prevent users from saving an empty filename
    if (filename.length === 0) return;

    // Get JSON that represents the project
    const projectJSON = JSON.stringify(this.props.callbacks.onGetProjectData());

    // Create the blob to download project json
    let blob = new Blob([projectJSON], {
      type: "application/json",
    });

    // Download it
    FileSaver.saveAs(blob, filename + ".json");

    // Save complete, close modal
    this.setState({ isSaveModalOpen: false });
  };

  /**
   * Callback for when users wish to load a pre-existing project.
   * @function
   */
  onLoadProject = () => {
    this.loadFileInput.click();
  };

  /**
   * Handler for when the users selects the file they wish to load.
   * @function
   * @param {Event} e
   */
  handleFileSelected = (e) => {
    // Get the file to load
    const file = this.loadFileInput.files[0];

    // If no file found, return
    if (!file) return;

    // Read the file
    this.loadFileReader.readAsText(file);

    // Make the name of the file the new saveInputValue
    const saveInputValue = file.name.replace(/(.json)$/, "");
    this.setState({ saveInputValue });

    // Reset value to empty string so that user can reload same file
    this.loadFileInput.value = "";
  };

  /**
   * Handler for reading the data from the user's selected project file.
   * @function
   * @param {Event} e
   */
  handleFileRead = (e) => {
    // Convert JSON file into JavaScript object
    const projectData = JSON.parse(e.target.result);

    // Load project into the scene
    this.props.callbacks.onLoadProjectData(projectData);
  };

  /**
   * Creates the modal for when the user is exporting to some 3D object file.
   * @function
   * @returns {JSX}
   */
  createExportModal = () => {
    return (
      <SubmitTextModal
        onClose={() => this.setState({ isExportModalOpen: false })}
        onOpen={() => this.setState({ isExportModalOpen: true })}
        open={this.state.isExportModalOpen}
        onSubmit={this.onExportObj}
        header="Export Model As..."
        submit={`Export .${this.state.exportType}`}
        placeholder="Enter export name..."
      />
    );
  };

  /**
   * Creates the modal for when the user is saving their project.
   * @function
   * @returns {JSX}
   */
  createSaveModal = () => {
    return (
      <SubmitTextModal
        onClose={() => this.setState({ isSaveModalOpen: false })}
        onOpen={() => this.setState({ isSaveModalOpen: true })}
        open={this.state.isSaveModalOpen}
        onSubmit={this.handleSaveProject}
        header="Save Project As..."
        submit="Save Project"
        placeholder="Enter project name..."
      />
    );
  };

  /**
   * Creates a sub-menu for each export option
   * @function
   * @returns {JSX}
   */
  createExportSubMenu = () => {
    return (
      <Dropdown text="Export" pointing="left" className="link item">
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() =>
              this.setState({ isExportModalOpen: true, exportType: "dae" })
            }
          >
            Collada (.dae)
          </Dropdown.Item>

          <Dropdown.Item
            onClick={() =>
              this.setState({ isExportModalOpen: true, exportType: "ply" })
            }
          >
            Stanford (.ply)
          </Dropdown.Item>

          <Dropdown.Item
            onClick={() =>
              this.setState({ isExportModalOpen: true, exportType: "stl" })
            }
          >
            Stl (.stl)
          </Dropdown.Item>

          <Dropdown.Item
            onClick={() =>
              this.setState({ isExportModalOpen: true, exportType: "obj" })
            }
          >
            Wavefront (.obj)
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  /**
   * Exports the voxel model to an Obj file.
   * @function
   * @param {string} filename Name of the exported 3D file
   */
  onExportObj = (filename) => {
    // Export the model with the given filename and export type
    this.props.callbacks.onExportObj(filename, this.state.exportType);

    // Export complete, close modal
    this.setState({ isExportModalOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        {this.createSaveModal()}
        {this.createExportModal()}
        <Dropdown text="File" pointing className="link item">
          <Dropdown.Menu>
            <Dropdown.Item onClick={this.props.callbacks.onNewProject}>
              New Project
            </Dropdown.Item>

            <Dropdown.Item
              onClick={() => this.setState({ isSaveModalOpen: true })}
            >
              Save Project
            </Dropdown.Item>

            <Dropdown.Item onClick={this.onLoadProject}>
              Load Project
            </Dropdown.Item>

            {this.createExportSubMenu()}
          </Dropdown.Menu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default File;
