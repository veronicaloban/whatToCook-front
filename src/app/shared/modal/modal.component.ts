import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { IModalData } from "../../interfaces/IModalData.interfaces";

@Component({
    selector: 'app-modal',
    imports: [CommonModule],
    styleUrls: ['./modal.component.scss'],
    templateUrl: './modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
    public type: 'success' | 'warning' | 'danger';

    constructor(
        public dialogRef: DialogRef<boolean>,
        @Inject(DIALOG_DATA) public data: IModalData
    ) {
        this.type = this.data.type;
    }
}
