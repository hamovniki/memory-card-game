export abstract class BaseDOM {
  constructor(template: string, insertMethod: 'append' | 'replace' = 'append') {
    if (insertMethod === 'append') {
      this._append(template);
    } else {
      this._render(template);
    }
    this.hide();
  }

  public abstract get elementDOM(): HTMLElement;

  private _render(template: string) {
    const wrapper = document.getElementById('menu-wrapper') as HTMLElement;

    wrapper.innerHTML = template;
  }

  private _append(template: string) {
    const wrapper = document.getElementById('menu-wrapper') as HTMLElement;
    wrapper.insertAdjacentHTML('beforeend', template);
  }

  public abstract show(): void;
  public abstract hide(): void;
  public abstract runAction(): void;
}
