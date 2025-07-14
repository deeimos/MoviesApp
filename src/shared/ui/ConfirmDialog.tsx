import { observer } from "mobx-react-lite";
import { useStore } from "@/shared/hooks/useStore";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

function ConfirmDialog() {
  const { ConfirmModalStore } = useStore();
  const { show, title, text, closeModal, confirm } = ConfirmModalStore;
  return (
    <Dialog open={show} onClose={closeModal}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Отмена</Button>
        <Button onClick={confirm} autoFocus>
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default observer(ConfirmDialog);
