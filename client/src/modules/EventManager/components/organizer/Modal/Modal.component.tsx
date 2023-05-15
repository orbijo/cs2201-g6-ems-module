import React from 'react';

interface ModalProps{
    title: string;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({title, isOpen, onClose}) => (
    <div className="modal">
        <div className="modal__overlay"/>
        <div className="modal__box">
            <div className="modal__close-btn">

            </div>
            <div className="modal__title">
                {title};
            </div>
            <div className="modal__content">
            </div>
        </div>
    </div>
);