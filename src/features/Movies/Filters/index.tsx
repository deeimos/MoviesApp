import { IconButton, Dialog, DialogTitle, DialogContent } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import MoviesFiltersForm from "./Form";

export default function MovieFilters() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen} aria-label="Фильтры">
        <FilterAltIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }} display="flex" alignItems="center" justifyContent="space-between">
          Фильтры
          <IconButton
            aria-label="Закрыть"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <MoviesFiltersForm onApply={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}
