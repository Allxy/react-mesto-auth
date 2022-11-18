import { memo, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, onConfirm }) {

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="confirm"
      title="Вы уверены?"
      buttonText="Да"
      onSubmit={onConfirm}
    />
  );
}

export default memo(ConfirmPopup);
