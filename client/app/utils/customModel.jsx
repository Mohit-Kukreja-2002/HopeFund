import React, { FC } from 'react'
import { Modal, Box } from "@mui/material";

const CustomModal = ({ open, setOpen, setRoute, component: Component }) => {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60%] min-w-[250px] m-auto   800px:w-[450px] bg-white rounded-[12px] shadow p-4 outline-none"
            >
                <Component 
                setOpen={setOpen} 
                setRoute={setRoute} 
                // refetch={refetch} 
                />
            </Box>
        </Modal>
    )
}

export default CustomModal