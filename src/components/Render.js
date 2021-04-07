import React from "react";
import SubmitTextModal from "./SubmitTextModal";
import { Dropdown } from "semantic-ui-react";

/**
 * Allows the user to perform rendering related actions. Mostly, saving
 * their work to a .png file.
 *
 * @property {number} maxNameLength - Max chars a user can enter for their render file name
 * @extends React.Component
 */
class Render extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExportModalOpen: false,
    };
  }

  /**
   * Exports current frame of canvas to an image and closes the export modal.
   * @function
   * @param {string} filename What to name the saved image
   */
  onExportImage = (filename) => {
    // Prevent empty filenames
    if (filename.length === 0) return;

    // Export the image
    this.props.callbacks.onExportImage(filename);

    // Close the modal
    this.setState({ isExportModalOpen: false });
  };

  /**
   * Creates the SubmitTextModal for the export image method.
   * @function
   * @returns {JSX}
   */
  createExportImageModal = () => {
    return (
      <SubmitTextModal
        onClose={() => this.setState({ isExportModalOpen: false })}
        onOpen={() => this.setState({ isExportModalOpen: true })}
        open={this.state.isExportModalOpen}
        onSubmit={this.onExportImage}
        header="Export Image As..."
        submit="Export Image"
        placeholder="Enter image name..."
      />
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.createExportImageModal()}
        <Dropdown text="Render" pointing className="link item">
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => this.setState({ isExportModalOpen: true })}
            >
              Export Scene to Image
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default Render;
