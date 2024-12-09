import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const Popup = ({ title, onShow, onHide, onSubmit, editBtnText, fields }) => {
    const [formData, setFormData] = useState({});
    const [imageFile, setImageFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setFormData((prevData) => ({ ...prevData, image: file }));
    };

    const handleFormSubmit = () => {
        const productData = { ...formData };

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = () => {
                productData.image = reader.result;
                onSubmit(productData);
                onHide();
            };
            reader.readAsDataURL(imageFile);
        } else {
            onSubmit(productData);
            onHide();
        }
    };

    return (
        <Dialog open={onShow} onClose={onHide} fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {fields.map((field) =>
                    field.type === 'file' ? (
                        <TextField
                            key={field.name}
                            fullWidth
                            margin="dense"
                            name={field.name}
                            label={field.label}
                            type="file"
                            onChange={handleImageChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    ) : (
                        <TextField
                            key={field.name}
                            fullWidth
                            margin="dense"
                            name={field.name}
                            label={field.label}
                            placeholder={field.placeholder}
                            type={field.type || 'text'}
                            onChange={handleInputChange}
                            variant="outlined"
                        />
                    )
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onHide} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleFormSubmit} color="primary" variant="contained">
                    {editBtnText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Popup;
