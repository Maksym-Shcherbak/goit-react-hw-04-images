import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalContent } from './Modal.styled';

export const Modal = ({ onCloseModal, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', oncCloseByEsc);
    return window.removeEventListener('keydown', oncCloseByEsc);
  }, []);

  const oncCloseByEsc = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  const onBackdropClick = ({ target, currentTarget }) => {
    if (currentTarget === target) {
      onCloseModal();
    }
  };

  return (
    <Overlay onClick={onBackdropClick}>
      <ModalContent>{children}</ModalContent>
    </Overlay>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
