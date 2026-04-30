type MenuRenderProps = {
  type: 'start' | 'end';
  isWin?: boolean;
};

export class MemoDOM {
  private _elementDOM: HTMLElement;

  public onStartGame: () => void;
  public onRestartGame: () => void;

  public render({type, isWin}: MenuRenderProps) {
    const wrapper = document.createElement('div');

    wrapper.innerHTML =
      type === 'start' ? this._startTemplate() : this._restartTemplate(isWin);

    this._elementDOM = wrapper.firstElementChild as HTMLElement;

    const buttonDOM = this._elementDOM.querySelector(
      'button',
    ) as HTMLButtonElement;

    buttonDOM.onclick = () => {
      this._elementDOM.remove();

      type === 'start' ? this.onStartGame?.() : this.onRestartGame?.();
    };

    document.body.append(this._elementDOM);
  }

  private _startTemplate = () => /*html*/ `
    <div class='menu'>
        <span>ИГРА</span>
        <button>НАЧАТЬ</button>
    </div>
    `;

  private _restartTemplate = (isWin?: boolean) => /*html*/ `
    <div class='menu'>
        <span>${isWin ? 'ПОБЕДА' : 'ПОРАЖЕНИЕ'}</span>
        <button>НАЧАТЬ ЗАНОВО</button>
    </div>
    `;
}
