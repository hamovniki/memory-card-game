import {Scene} from 'phaser';
import {SceneKeys} from './scene_keys';

export abstract class TypedScene extends Scene {
  constructor(key: SceneKeys) {
    super(key);
  }
}
