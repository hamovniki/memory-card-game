import {Events} from 'phaser';

export class EventsManager extends Events.EventEmitter {
  public readonly GAME_PRELOAD = Symbol('game:preload');
  public readonly GAME_START_REQUEST = Symbol('game:startRequest');
  public readonly GAME_OVER_WIN = Symbol('game:win');
  public readonly GAME_OVER_LOSE = Symbol('game:lose');

  public readonly OPEN_SETTINGS = Symbol('ui:openSettings');
  public readonly BACK_TO_MENU = Symbol('ui:backToMenu');
}
