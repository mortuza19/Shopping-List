import { Directive, ElementRef, HostListener, Renderer2, HostBinding } from '@angular/core';

@Directive({
    selector : '[appDropdown]'
})

export class DropdownDirective{
    @HostBinding('class.open') isOpen : boolean = false;
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.eleRef.nativeElement.contains(event.target) ? !this.isOpen : false;
      }
    constructor(private eleRef : ElementRef,private renderer : Renderer2){}

    // @HostListener('mouseenter') openDropdown(){
    //     if(this.eleRef.nativeElement.className==='dropdown'){
    //         this.renderer.addClass(this.eleRef.nativeElement,'open');
    //     }
    // }

    // @HostListener('mouseleave') closedropdown(){
    //     this.renderer.removeClass(this.eleRef.nativeElement,'open');
    // }

    // @HostListener('click') onToggle(){
    //     this.isOpen = !this.isOpen;
    // }
    
}