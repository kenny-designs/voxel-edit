import "./GUIController.css";
import React from "react";
import Viewport from "./Viewport";
import Brush from "./Brush";
import File from "./File";
//import Edit from "./Edit";
import Render from "./Render";
import Examples from "./Examples";
import GitHubLink from "./GitHubLink";
import ColorPalette from "./ColorPalette";
import {
  Modal,
  Button,
  Grid,
  Segment,
  Menu,
  Accordion,
  Header,
  Icon,
} from "semantic-ui-react";

/**
 * Handles switching between both desktop and mobile versions of the
 * UI. Whenever one of its chidlren updates, it will pass that data
 * up to its parent component.
 * @extends React.Component
 */
class GUIController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      mobile: {
        isModalOpen: false,
        modalContentType: "",
      },
      desktop: {
        brushSettings: {
          activeAccordionIndices: [0],
        },
        colorPalette: {
          activeAccordionIndices: [0],
        },
      },
    };
  }

  /**
   * Handler for screen resize events that updates whether or not the application
   * should currently be using the mobile or desktop GUI.
   */
  updateMobileState = () => {
    // If width below 768, use mobile GUI
    const isMobile = window.innerWidth < 768;

    this.setState({ isMobile });
  };

  /**
   * Toggles the accordion at the given index for the given state with a
   * activeAccordionIndices property.
   * @param {number} index - Index of accordion to toggle
   * @param {string} componentName - The state.desktop property with a activeAccordionIndices property
   */
  handleAccordionIndicesChange = (index, componentName) => {
    // Make a copy of the desktop state object
    const desktop = { ...this.state.desktop };

    // Get the active indices for that component
    const { activeAccordionIndices } = desktop[componentName];

    // Get the position of the accordion index
    const pos = activeAccordionIndices.indexOf(index);

    // Position was found, remove the index for the user is closing the accordion
    if (pos !== -1) {
      activeAccordionIndices.splice(pos, 1);
    }
    // Position not found, add the index
    else {
      activeAccordionIndices.push(index);
    }

    // Update the state of the active indices for the given component
    this.setState({ desktop });
  };

  componentDidMount() {
    // Perform initial check for mobile device
    this.updateMobileState();
    window.addEventListener("resize", this.updateMobileState);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateMobileState);
  }

  /**
   * Creates the JSX for the desktop version of the viewport.
   * @returns {JSX}
   */
  createDesktopViewport() {
    return <Viewport callbacks={this.props.callbacks.viewport} />;
  }

  /**
   * Creates the JSX for the desktop version of the brush.
   * @returns {JSX}
   */
  createDesktopBrush = () => {
    const { brushSettings } = this.state.desktop;

    return (
      <Segment.Group>
        <Segment inverted>
          <Header as="h4" inverted>
            <Icon name="paint brush" />
            <Header.Content>
              Brush Settings
              <Header.Subheader>Add, remove, or paint voxels</Header.Subheader>
            </Header.Content>
          </Header>

          <Accordion inverted fluid exclusive={false}>
            <Accordion.Title
              active={brushSettings.activeAccordionIndices.includes(0)}
              content="Brush Action"
              index={0}
              onClick={(e, titleProps) => {
                this.handleAccordionIndicesChange(
                  titleProps.index,
                  "brushSettings"
                );
              }}
            />
            <Accordion.Content
              active={brushSettings.activeAccordionIndices.includes(0)}
            >
              <Menu inverted vertical fluid>
                <Brush callbacks={this.props.callbacks.brush} />
              </Menu>
            </Accordion.Content>
          </Accordion>
        </Segment>
      </Segment.Group>
    );
  };

  /**
   * Creates the JSX for the desktop version of the color palette.
   * @returns {JSX}
   */
  createDesktopColorPalette = () => {
    const { colorPalette } = this.state.desktop;

    return (
      <Segment.Group>
        <Segment inverted>
          <Header as="h4" inverted>
            <Icon name="tint" />
            <Header.Content>
              Color Palette
              <Header.Subheader>Select a color to paint with</Header.Subheader>
            </Header.Content>
          </Header>
          <Accordion inverted fluid exclusive={false}>
            <Accordion.Title
              active={colorPalette.activeAccordionIndices.includes(0)}
              content="Color Selection"
              index={0}
              onClick={(e, titleProps) => {
                this.handleAccordionIndicesChange(
                  titleProps.index,
                  "colorPalette"
                );
              }}
            />
            <Accordion.Content
              active={colorPalette.activeAccordionIndices.includes(0)}
            >
              <ColorPalette callbacks={this.props.callbacks.colorPalette} />
            </Accordion.Content>
          </Accordion>
        </Segment>
      </Segment.Group>
    );
  };

  /**
   * Create the desktop version of the UI.
   * @returns {JSX}
   */
  createDesktopGUI() {
    return (
      <Grid padded style={{ height: "100vh" }}>
        <Grid.Row style={{ paddingTop: "0", paddingBottom: "0" }}>
          <Grid.Column>
            <Menu inverted>
              <File callbacks={this.props.callbacks.file} />
              {/*<Edit />*/}
              <Render callbacks={this.props.callbacks.render} />
              <Examples />
              <GitHubLink />
            </Menu>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row
          style={{ height: "90%", paddingTop: "0", paddingBottom: "0" }}
        >
          <Grid.Column
            width={3}
            style={{
              height: "100%",
              overflowY: "auto",
            }}
          >
            {this.createDesktopBrush()}
            {this.createDesktopColorPalette()}
          </Grid.Column>

          <Grid.Column width={13} style={{ height: "100%" }}>
            {this.createDesktopViewport()}
          </Grid.Column>

          {/* Right Panel. Empty for now.*/}
          {/* <Grid.Column width={2} style={{ height: "100%" }}></Grid.Column> */}
        </Grid.Row>
      </Grid>
    );
  }

  /**
   * Creates JSX for modals on mobile devices.
   * @returns {JSX}
   */
  createMobileModal() {
    return (
      <Modal
        className="mobileModal"
        open={this.state.mobile.isModalOpen}
        onClose={() =>
          this.setState((prevState) => ({
            mobile: { ...prevState.mobile, isModalOpen: false },
          }))
        }
        onOpen={() =>
          this.setState((prevState) => ({
            mobile: { ...prevState.mobile, isModalOpen: true },
          }))
        }
      >
        {/* Populate the modal with relevant content */}
        {this.createMobileModalContent()}

        <Modal.Actions>
          <Button
            onClick={() =>
              this.setState((prevState) => ({
                mobile: { ...prevState.mobile, isModalOpen: false },
              }))
            }
            primary
          >
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  /**
   * Populates the mobile modal with content relevant to what the user selected.
   * For example, opening the ColorPalette will fill the modal with ColorPalette
   * related JSX.
   * @returns {JSX}
   */
  createMobileModalContent() {
    const { modalContentType } = this.state.mobile;

    // Header and description of our modal
    let header, description;

    // Generate JSX based on the current modal type
    switch (this.state.mobile.modalContentType) {
      case "ColorPalette":
        header = (
          <Header as="h4">
            <Icon name="tint" />
            <Header.Content>
              Color Palette
              <Header.Subheader>Select a color to paint with</Header.Subheader>
            </Header.Content>
          </Header>
        );
        description = (
          <ColorPalette callbacks={this.props.callbacks.colorPalette} />
        );
        break;

      default:
        header = "Empty Modal";
        description = `Nothing in here. Thr current modal type is '${modalContentType}'`;
    }

    // Return JSX for the modal contents based on our header and description
    return (
      <React.Fragment>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>{description}</Modal.Description>
        </Modal.Content>
      </React.Fragment>
    );
  }

  /**
   * Create the mobile version of the UI.
   * @returns {JSX}
   */
  createMobileGUI() {
    return (
      <React.Fragment>
        {this.createMobileModal()}

        <div style={{ height: window.innerHeight }}>
          {/* Create top menu */}
          <Menu fixed="top" inverted>
            <File callbacks={this.props.callbacks.file} />
            {/*<Edit />*/}
            <Render callbacks={this.props.callbacks.render} />
            <Examples />
            <GitHubLink />
          </Menu>

          <Viewport callbacks={this.props.callbacks.viewport} />

          {/* Create bottom menu */}
          <Menu fixed="bottom" inverted style={{ overflowX: "auto" }}>
            <Brush callbacks={this.props.callbacks.brush} />

            <Menu.Item
              as="a"
              onClick={() =>
                this.setState({
                  mobile: {
                    isModalOpen: true,
                    modalContentType: "ColorPalette",
                  },
                })
              }
            >
              Color Palette
            </Menu.Item>
          </Menu>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return this.state.isMobile
      ? this.createMobileGUI()
      : this.createDesktopGUI();
  }
}

export default GUIController;
