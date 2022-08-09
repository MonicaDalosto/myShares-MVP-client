import { RiCloseLine } from 'react-icons/ri';
import {
  BGDiv,
  CenteredDiv,
  ModalDiv,
  ModalHeader,
  Heading,
  ModalContent,
  ModalActions,
  ActionsContainer,
  CloseBtn,
  DeleteBtn,
  CancelBtn
} from '../styled';

const Modal = ({ setIsOpen, submitDeleteForm, name }) => {
  return (
    <>
      <BGDiv onClick={() => setIsOpen(false)} />
      <CenteredDiv>
        <ModalDiv>
          <ModalHeader>
            <Heading>Warning</Heading>
          </ModalHeader>
          <CloseBtn onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </CloseBtn>
          <ModalContent>
            This action can't be undo. Are you sure you want to
            <strong> delete</strong> {name}?
          </ModalContent>
          <ModalActions>
            <ActionsContainer>
              <DeleteBtn onClick={submitDeleteForm}>Delete</DeleteBtn>
              <CancelBtn onClick={() => setIsOpen(false)}>Cancel</CancelBtn>
            </ActionsContainer>
          </ModalActions>
        </ModalDiv>
      </CenteredDiv>
    </>
  );
};

export { Modal };
