"use client";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";

const UploadModal = () => {
    const uploadModal = useUploadModal();

    const onChange = (open: boolean) => {
        if (!open) {
            uploadModal.onClose();
        }
    }

    return (
        <Modal
            title="Add Songs to Playlist"
            description="Upload an audio MP3 song file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}

        >
            Content
        </Modal>
    );
}

export default UploadModal;