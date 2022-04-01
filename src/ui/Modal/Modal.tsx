import { Modal as ModalAnt } from 'antd';

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
    <ModalAnt
      visible={visible}
      title={title}
      okText={submitText}
      cancelText={cancelText}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      {children}
    </ModalAnt>
  );
}
