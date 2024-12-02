import { registryDlg } from "@/dialogUtil/DlgService";
import ErrorDlg from "./errorDlg.vue";
import BaseDlg from "./baseDlg.vue";
import VarDlg from "./varDlg.vue";
import InnerDlg from "./inner.vue";

export { BaseDlg, ErrorDlg, VarDlg };

export enum DIALOG_KEY {
  "ERROR_DLG" = "error_dlg",
  "INNER_DLG" = "inner_dlg"
}

export const initDialog = () => {
  registryDlg(DIALOG_KEY.ERROR_DLG, ErrorDlg);
  registryDlg(DIALOG_KEY.INNER_DLG, InnerDlg);
};
