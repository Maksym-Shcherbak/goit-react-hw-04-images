import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalContent } from './Modal.styled';

export const Modal = ({ onCloseModal, children }) => {
  const oncCloseByEsc = useCallback(
    e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    },
    [onCloseModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', oncCloseByEsc);
    document.body.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', oncCloseByEsc);
      document.body.overflow = 'auto';
    };
  }, [oncCloseByEsc]);

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
