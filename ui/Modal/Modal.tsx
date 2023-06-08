import {
  Modal as ModalChakra,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { Button } from '../Button';

export function Modal({
  visible,
  children,
  title,
  submitText,
  cancelText,
  handleSubmit,
  handleCancel,
}) {
  return (
    <ModalChakra isOpen={visible} onClose={handleCancel}>
      <ModalOverlay />
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter display="flex" gap={4}>
          <Button variant="outline" onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button onClick={handleSubmit}>{submitText}</Button>
        </ModalFooter>
      </ModalContent>
    </ModalChakra>
  );
}
