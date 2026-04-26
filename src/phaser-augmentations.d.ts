import {SceneKeys} from './game/scenes/utils/scene_keys';

declare module 'phaser' {
  namespace Scenes {
    interface ScenePlugin {
      start(key: SceneKeys, data?: object): this;
      launch(key: SceneKeys, data?: object): this;
      run(key: SceneKeys, data?: object): this;
      switch(key: SceneKeys): this;
    }
  }
}
