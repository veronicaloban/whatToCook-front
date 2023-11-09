import { IModalTexts } from "./modalTexts.interface";

export type modal = 'success' | 'warning' | 'danger';

export interface IModalData {
    type: modal,
    texts: IModalTexts
}
