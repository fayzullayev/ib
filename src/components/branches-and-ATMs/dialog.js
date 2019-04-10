import React from 'react';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import BranchMap from './branchMap';

const CustomDialog = ({data = {}, open, handleClose}) => {
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            onClose={() => handleClose()}
        >
            <DialogTitle
                id="alert-dialog-title">{data.name}</DialogTitle>
            <DialogContent>
                {data.filial_code}
                <BranchMap/>
            </DialogContent>
        </Dialog>
    )
};
export default CustomDialog