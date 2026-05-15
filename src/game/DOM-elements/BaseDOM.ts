export abstract class BaseDOM {
  protected element: HTMLElement;

  constructor(template: string) {
    const wrapper = document.getElementById('menu-wrapper') as HTMLElement;
    wrapper.insertAdjacentHTML('beforeend', template);

    this.element = wrapper.lastElementChild as HTMLElement;
  }

  public show(): void {
    this.element.style.visibility = 'visible';
  }

  public hide(): void {
    this.element.style.visibility = 'hidden';
  }

  protected bindButton(selector: string, handler: () => void): void {
    const button = this.element.querySelector(selector) as HTMLButtonElement;
    if (button) {
      button.onclick = handler;
    }
  }

  protected setText(selector: string, text: string): void {
    const element = this.element.querySelector(selector) as HTMLElement;
    if (element) {
      element.innerText = text;
    }
  }

  protected setStyle(selector: string, property: string, value: string): void {
    const element = document.querySelector(selector) as HTMLElement;

    if (element) {
      element.style[property as any] = value;
    }
  }
}
