import {GameObjects} from 'phaser';
import {TypedScene} from '../scenes/utils/TypedScene';

type TimerProps = {
  x: number;
  y: number;
  maxTime: number;
};

export class Timer {
  private _scene: TypedScene;
  private _text: GameObjects.Text;
  private _position: {x: number; y: number};
  private _time: number;

  public onTimeIsOver: () => void;

  constructor(scene: TypedScene, props: TimerProps) {
    const {x, y, maxTime} = props;

    this._scene = scene;
    this._position = {x, y};
    this._time = maxTime;

    this._createText();
  }

  public start() {
    this._scene.time.paused = false;
    this._scene.time.addEvent({
      delay: 1000,
      callback: this._tick,
      callbackScope: this,
      loop: true,
    });
  }

  private _tick() {
    this._time--;
    this._text.text = `Time: ${this._time}`;

    if (this._time === 0) {
      this.onTimeIsOver?.();
      this.stop();
    }
  }

  public stop() {
    this._scene.time.paused = true;
  }

  private _createText() {
    const style: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '25px',
    };
    const text = `Time: ${this._time}`;
    this._text = this._scene.add.text(
      this._position.x,
      this._position.y,
      text,
      style,
    );
  }

  public updatePosition() {
    const {width} = this._scene.cameras.main;
    this._text.x = width / 2;
  }
}
