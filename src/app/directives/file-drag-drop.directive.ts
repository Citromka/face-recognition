import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appFileDragDrop]'
})
export class FileDragDropDirective {

  @Output() fileDropped = new EventEmitter<File[]>();

  @HostBinding('style.background-color') private background = '#f5fcff';
  @HostBinding('style.opacity') private opacity = '1';

  constructor() { }

  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8';
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

}
