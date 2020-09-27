import React from 'react';
import Modal from '../Modal/Modal';
import CircularLoader from './CircularLoader';

const ModalLoader = ({ ...props }) => {
    return (
        <Modal {...props}>
            <CircularLoader {...props} />
        </Modal>
    );
};

export default ModalLoader;