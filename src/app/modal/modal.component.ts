import { Component, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    public dialog: MatDialog
  ) {}
  
  close() {
    console.log("object");
    this.dialog.closeAll();
  }
}
