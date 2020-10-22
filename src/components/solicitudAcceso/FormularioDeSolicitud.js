import React, { Component } from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'
import '../../public/Stylesheets/FormularioDeSolicitud.css'

const FormExampleFieldControlId = () => (
    <Form >
        <Form.Group widths='equal'>
            <Form.Field
                id='form-input-control-first-name'
                control={Input}
                label='Nombre completo'
                placeholder='Nombre completo'
            />
        </Form.Group>
        <Form.Field
            id='form-input-control-error-email'
            control={Input}
            label='Correo'
            placeholder='ejemplo@****.com'
            error={{
                content: 'Please enter a valid email address',
                pointing: 'below',
            }}
        />
        <Form.Field
            id='form-textarea-control-opinion'
            control={TextArea}
            label='Motivo'
            placeholder='Motivo'
        />
        <Form.Field
            className="boton_confirm"
            id='form-button-control-public'
            control={Button }
            // onClick={() => window.location = "https://nahual-8298d.web.app/"}
            onClick={() => window.location = "http://localhost:3000/"}
            content='Enviar'
        />
    </Form>
)

export default FormExampleFieldControlId