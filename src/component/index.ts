import ErrorDlg from "./errorDlg.vue";
import { registryDlg } from "@/dialogUtil/DlgService";
import BaseDlg from "./baseDlg.vue";
import VarDlg from "./varDlg.vue";

export enum DIALOG_KEY {
  "ERROR_DLG" = "error_dlg",
}

export const initDialog = () => {
  registryDlg(DIALOG_KEY.ERROR_DLG, ErrorDlg);
};

export { BaseDlg, ErrorDlg, VarDlg };
