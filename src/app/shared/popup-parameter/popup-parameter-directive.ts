import {
  ComponentRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  inject,
  input,
  inputBinding,
  InputSignal,
  OnDestroy,
  Type,
  ViewContainerRef,
} from '@angular/core';
import PopupParameter from '@shared/popup-parameter/popup-parameter';

@Directive({
  selector: '[popupParameter]',
  host: {
    '(mouseenter)': 'onEnter($event)',
    '(mousemove)': 'onMove($event)',
    '(mouseleave)': 'onLeave()',
  },
})
export default class PopupParameterDirective implements OnDestroy {
  private readonly vcr: ViewContainerRef = inject(ViewContainerRef);
  private readonly env: EnvironmentInjector = inject(EnvironmentInjector);
  private readonly hostEl: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

  /** Inputs a pasar al componente PopupParameter */
  popupParameterInput: InputSignal<number> = input.required<number>();

  /** Separación respecto al cursor (px) */
  offset: InputSignal<number> = input<number>(12);

  private ref?: ComponentRef<unknown>;
  private el?: HTMLElement;

  onEnter(ev: MouseEvent | { clientX: number; clientY: number }): void {
    const Cmp: Type<PopupParameter> = PopupParameter;
    if (!Cmp || this.ref) {
      // Si ya está creado, solo reposiciona
      if (this.ref && this.el) this.positionAt(ev.clientX, ev.clientY);
      return;
    }

    this.ref = this.vcr.createComponent(Cmp, {
      environmentInjector: this.env,
      bindings: [inputBinding('id', this.popupParameterInput)],
    });
    this.el = this.ref.location.nativeElement as HTMLElement;

    // Estilos base del contenedor host del componente
    const style: CSSStyleDeclaration = this.el.style;
    style.position = 'fixed';
    style.left = '0px';
    style.top = '0px';
    style.zIndex = '10000';
    style.pointerEvents = 'none';

    // Añadir al body (evita clipping por overflow)
    document.body.appendChild(this.el);

    // Posición inicial
    this.positionAt(ev.clientX, ev.clientY);
  }

  onMove(ev: MouseEvent | { clientX: number; clientY: number }): void {
    if (!this.el) return;
    this.positionAt(ev.clientX, ev.clientY);
  }

  onLeave(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  private positionAt(x: number, y: number): void {
    if (!this.el) {
      return;
    }

    const ox: number = this.offset();
    const oy: number = this.offset();

    const vw: number = window.innerWidth;
    const vh: number = window.innerHeight;
    const rect: DOMRect = this.el.getBoundingClientRect();

    let left: number = x + ox;
    let top: number = y + oy;

    // Evitar que se salga por la derecha/abajo
    if (left + rect.width > vw) {
      left = x - rect.width - ox;
    }
    if (top + rect.height > vh) {
      top = y - rect.height - oy;
    }

    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
  }

  private destroy(): void {
    if (this.ref) {
      this.ref.destroy();
      this.ref = undefined;
    }
    if (this.el?.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
    this.el = undefined;
  }
}
