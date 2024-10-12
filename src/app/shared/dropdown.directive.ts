import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: true
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click', ['$event']) toggleOpen(event: MouseEvent) {
    event.stopPropagation(); 
    this.isOpen = !this.isOpen; 
  }

  @HostListener('document:click') closeDropdown() {
    this.isOpen = false; 
  }
}
