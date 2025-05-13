import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {AttachmentService} from '../../../../services/attachment.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-upload-image',
  imports: [
    NgIf
  ],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css'
})
export class UploadImageComponent {
  @Output() fileSelected = new EventEmitter<File>();

  isDragging = false;
  previewUrl: string | null = null;
  fileName: string = '';

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave() {
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const file = event.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.setFile(file);
    }
  }

  onFileInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.setFile(file);
    }
  }

  private setFile(file: File) {
    this.fileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);

    this.fileSelected.emit(file);
  }
}
