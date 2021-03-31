import React from "react";
import Viewport from "./Viewport";
import Brush from "./Brush";
import ColorPalette from "./ColorPalette";
import "./GUIController.css";
import {
  Modal,
  Button,
  Grid,
  Sidebar,
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
      isColorModalOpen: false,
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
   * Handles opening/closing accordions on the desktop GUI.
   * @param {*} e
   * @param {*} titleProps
   */
  handleAccordionIndicesChange = (e, titleProps) => {
    // Get the index of the accordion and the name of the component it belongs to
    const { index, componentname } = titleProps;

    // Make a copy of the desktop state object
    const desktop = { ...this.state.desktop };

    // Get the active indices for that component
    const { activeAccordionIndices } = desktop[componentname];

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
    return (
      <Sidebar.Pushable
        as={Segment}
        style={{ border: "none", borderRadius: "0" }}
      >
        <Sidebar as={Menu} inverted direction="top" visible width="very thin">
          <Menu.Item as="a">Button 1</Menu.Item>
          <Menu.Item as="a">Button 2</Menu.Item>
        </Sidebar>
        <Viewport onCanvasCreation={this.props.onCanvasCreation} />
      </Sidebar.Pushable>
    );
  }

  /**
   * Create the desktop version of the UI.
   * @returns {JSX}
   */
  createDesktopGUI() {
    const { brushSettings, colorPalette } = this.state.desktop;

    return (
      <Grid className={"desktopGrid"}>
        <Grid.Row>
          <Grid.Column
            width={3}
            style={{
              height: "100vh",
              overflowY: "auto",
              marginTop: "1em",
            }}
          >
            <Accordion as={Menu} inverted vertical fluid exclusive={false}>
              <Menu.Item header>
                Brush Settings
                <Icon name="paint brush" />
              </Menu.Item>
              <Menu.Item>
                <Accordion.Title
                  active={brushSettings.activeAccordionIndices.includes(0)}
                  content="Voxel Actions"
                  index={0}
                  componentname="brushSettings"
                  onClick={this.handleAccordionIndicesChange}
                />
                <Accordion.Content
                  active={brushSettings.activeAccordionIndices.includes(0)}
                >
                  <Brush onBrushChange={this.props.onBrushChange} />
                </Accordion.Content>
              </Menu.Item>
            </Accordion>

            <Segment.Group>
              <Segment inverted>
                <Header as="h4" inverted>
                  <Icon name="tint" />
                  <Header.Content>
                    Color Palette
                    <Header.Subheader>
                      Select a color to paint with
                    </Header.Subheader>
                  </Header.Content>
                </Header>
                <Accordion inverted fluid exclusive={false}>
                  <Accordion.Title
                    active={colorPalette.activeAccordionIndices.includes(0)}
                    content="Color Selection"
                    index={0}
                    componentname="colorPalette"
                    onClick={this.handleAccordionIndicesChange}
                  />
                  <Accordion.Content
                    active={colorPalette.activeAccordionIndices.includes(0)}
                  >
                    <ColorPalette
                      onGetColorData={this.props.onGetColorData}
                      onSelectedColorChange={this.props.onSelectedColorChange}
                      onNewSelectedColor={this.props.onNewSelectedColor}
                    />
                  </Accordion.Content>
                </Accordion>
              </Segment>
            </Segment.Group>
          </Grid.Column>

          <Grid.Column width={11} style={{ padding: "0" }}>
            {this.createDesktopViewport()}
          </Grid.Column>

          <Grid.Column width={2}>
            <h1>Right Panel</h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  /**
   * Create the mobile version of the UI.
   * @returns {JSX}
   */
  createMobileGUI() {
    return (
      <div style={{ height: window.innerHeight }}>
        <Sidebar.Pushable
          as={Segment}
          style={{ border: "none", borderRadius: "0" }}
        >
          <Sidebar as={Menu} inverted direction="top" visible width="very thin">
            <Menu.Item
              as="a"
              onClick={() => this.setState({ isColorModalOpen: true })}
            >
              Color Palette
            </Menu.Item>
            <Menu.Item as="a">Edit</Menu.Item>
            <Menu.Item as="a">Camera</Menu.Item>
            <Menu.Item as="a">Project</Menu.Item>
          </Sidebar>

          {/* Color Selection Modal */}
          <Modal
            open={this.state.isColorModalOpen}
            onClose={() => this.setState({ isColorModalOpen: false })}
            onOpen={() => this.setState({ isColorModalOpen: true })}
          >
            <Modal.Header>Color Palette</Modal.Header>
            <Modal.Content scrolling>
              <Modal.Description>
                <ColorPalette
                  onGetColorData={this.props.onGetColorData}
                  onSelectedColorChange={this.props.onSelectedColorChange}
                  onNewSelectedColor={this.props.onNewSelectedColor}
                />
              </Modal.Description>
            </Modal.Content>

            <Modal.Actions>
              <Button
                onClick={() => this.setState({ isColorModalOpen: false })}
                primary
              >
                Close
              </Button>
            </Modal.Actions>
          </Modal>

          <Sidebar as={Menu} inverted direction="bottom" visible width="thin">
            <Brush onBrushChange={this.props.onBrushChange} />
          </Sidebar>

          <Viewport onCanvasCreation={this.props.onCanvasCreation} />
        </Sidebar.Pushable>
      </div>
    );
  }

  render() {
    // TODO: Change from arbitrary number
    return this.state.isMobile
      ? this.createMobileGUI()
      : this.createDesktopGUI();
  }
}

export default GUIController;
