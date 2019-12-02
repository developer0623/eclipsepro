import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';

interface Tooltip {
  index: number;
  title: string;
  description: string;
}

@Directive({
  selector: '[appSummaryTooltip]'
})
export class SummaryTooltipDirective {
  @Input('appSummaryTooltip') tooltipContent: Tooltip;
  @Input() placement = 'bottom';
  @Input() delay = 500;
  tooltip: Element;

  offset = 10;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) { this.show(); }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) { this.hide(); }
  }

  show() {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.tooltip, 'summary-expalin-tooltip-show');
  }

  hide() {
    this.renderer.removeClass(this.tooltip, 'summary-expalin-tooltip-show');
    window.setTimeout(() => {
      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }, this.delay);
  }

  create() {
    this.tooltip = this.renderer.createElement('div');
    const tooltipContent = `
      <div class="title">${this.tooltipContent.title}</div>
      <div class="description">${this.tooltipContent.description}</div>
    `;
    this.renderer.setProperty(this.tooltip, 'innerHTML', tooltipContent);

    this.renderer.appendChild(document.body, this.tooltip);

    this.renderer.addClass(this.tooltip, 'summary-expalin-tooltip');
    this.renderer.addClass(this.tooltip, `summary-expalin-tooltip-${this.placement}`);

    // delay
    this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, '-o-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, 'transition', `opacity ${this.delay}ms`);
  }

  setPosition() {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip.getBoundingClientRect();
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top, left;

    if (this.placement === 'top') {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'bottom') {
      top = hostPos.bottom + this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'left') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - this.offset;
    }

    if (this.placement === 'right') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + this.offset;
    }

    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }

}
