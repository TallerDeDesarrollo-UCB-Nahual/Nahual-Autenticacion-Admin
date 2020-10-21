import React, { Component, Fragment } from 'react';
import { Button, Image, Modal, Grid, GridRow, Icon, Header, Segment, Loader, Dimmer } from 'semantic-ui-react';
import '../../../public/stylesheets/Modal.css';
import axios from "axios";

class ModalExampleModal extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  obtenerEgresadeDeAPI() {
    const API_URL = `http://fathomless-falls-62194.herokuapp.com/api/estudiantes/`;
    axios
      .get(`${API_URL}${this.props.egresadeId}`)
      .then(response => {
        this.setState({
          egresade: response.data.response
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  abrirModal(estado) {
    this.setState({
      open: estado
    });
  }

  render() {
    return (
        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size={"small"}
        trigger={<Button>Show Modal</Button>}
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>
              We've found the following gravatar image associated with your e-mail
              address.
            </p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            Nope
          </Button>
          <Button
            content="Yep, that's me"
            labelPosition='right'
            icon='checkmark'
            onClick={() => setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ModalExampleModal