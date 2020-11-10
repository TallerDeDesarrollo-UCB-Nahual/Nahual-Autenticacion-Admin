import React from 'react'
import { Button, Modal, Image } from 'semantic-ui-react'
import LogoNahual from '../../public/imagenes/logo-proyecto-nahual.webp'
import FormAcceso from "./FormAcceso"

const CuerpoModal = ({cerrarModal}) => {
  return (
    <>
      <Modal.Header >
        <Image src={LogoNahual} size='small' />
      </Modal.Header>
      <Modal.Content scrolling>
        <FormAcceso cerrarModal={cerrarModal}></FormAcceso>
      </Modal.Content>
    </>
  )
}

export default CuerpoModal;