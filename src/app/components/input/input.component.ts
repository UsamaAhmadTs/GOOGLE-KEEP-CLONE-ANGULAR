import {Component, ElementRef, EventEmitter, HostListener, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @ViewChild('mainNote') mainNote!: ElementRef;
  @ViewChild('dropNote') dropNote!: ElementRef;
  @ViewChild('form') form!: ElementRef;

  constructor(private _elementRef: ElementRef) {
    document.addEventListener('click', this.offClickHandler.bind(this)); // bind on doc
  }

  showDropNote() {
    this.dropNote.nativeElement.hidden = true;
    this.mainNote.nativeElement.hidden = true;
  }

  isDropdownOpen: boolean = false;
  isDropNoteOpen: boolean = false;
  isMainNoteOpen: boolean = true;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleDropNote() {
    this.isDropNoteOpen = !this.isDropNoteOpen;
  }

  showMainNote() {
    this.isMainNoteOpen = true;
  }

  offClickHandler(event: any) {
    if (!this.mainNote.nativeElement.contains(event.target)) { // check click origin
      this.dropNote.nativeElement.style.display = "block";
      this.mainNote.nativeElement.style.display = "none";
    }
  }

  public clickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(this.mainNote);
    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }

  addLabel() {
  }

}
