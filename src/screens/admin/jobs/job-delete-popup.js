import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const JobDeletePopup = (props) => {
    const {
        handleCancel,
        handleOk,
        isOpen
    } = props

    return <Modal isOpen={isOpen} className=''>
        <ModalHeader >Delete Job</ModalHeader>
        <ModalBody>
            Are you sure! You want to delete the job?
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={handleOk}>Yes</Button>{' '}
            <Button color="secondary" onClick={handleCancel}>No</Button>
        </ModalFooter>
    </Modal>
}

export default JobDeletePopup;