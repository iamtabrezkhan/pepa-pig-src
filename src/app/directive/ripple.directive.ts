import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appRipple]'
})
export class RippleDirective {

  hostEl;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.hostEl = el.nativeElement;
  }

  @HostListener('click', ['$event'])
    onclick(e: MouseEvent) {
      let ink, d, x, y;
      this.hostEl.style.position = 'relative';
      this.hostEl.style.overflow = 'hidden';
      if(this.hostEl.querySelector('.ink') === null) {
        ink = this.renderer.createElement('span');
        this.renderer.addClass(ink, 'ink');
        this.renderer.appendChild(this.hostEl, ink);
      }
      ink = this.hostEl.querySelector('.ink');
      this.renderer.appendChild(this.hostEl, ink);
      this.renderer.removeClass(ink, 'animate');

      if (!ink.offsetHeight && !ink.offsetWidth) {
        d = Math.max(this.hostEl.offsetWidth, this.hostEl.offsetHeight);
        this.renderer.setStyle(ink, 'width', d + 'px');
        this.renderer.setStyle(ink, 'height', d + 'px');
      }
  
      x = e.pageX - this.hostEl.offsetLeft - ink.offsetWidth / 2;
      y = e.pageY - this.hostEl.offsetTop - ink.offsetHeight / 2;
  
      this.renderer.setStyle(ink, 'top', y + 'px');
      this.renderer.setStyle(ink, 'left', x + 'px');
      this.renderer.addClass(ink, 'animate');

    }

}
