import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function DeleteModal({handleConfirm, showDeleteModal, handleClose}){
    return (
        <Modal 
            className='modal-delete'
            show={showDeleteModal} 
            onHide={handleClose} 
            centered>
            <Modal.Header className='border border-bottom-0 px-4 pt-4 pb-0'>
                <Modal.Title>Delete comment</Modal.Title>
            </Modal.Header>
            <Modal.Body className='px-4'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</Modal.Body>
            <Modal.Footer className='border border-top-0 px-4 pb-4'>
                <Button 
                    className='btn-cancel col text-uppercase border-0'
                    onClick={handleClose}>
                    No, Cancel
                </Button>
                <Button
                    className='btn-delete col text-uppercase border-0' 
                    onClick={handleConfirm}>
                    Yes, Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal