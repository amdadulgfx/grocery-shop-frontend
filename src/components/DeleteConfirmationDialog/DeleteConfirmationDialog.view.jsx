import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

const DeleteConfirmationDialog = (props) => {
    const {deleteConfirmationOpen, setDeleteConfirmationOpen, confirmDelete, deleteTitle} = props;
    return (
        <Dialog
            open={deleteConfirmationOpen}
            onClose={() => setDeleteConfirmationOpen(false)}
        >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this {deleteTitle}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDeleteConfirmationOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={confirmDelete} color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;