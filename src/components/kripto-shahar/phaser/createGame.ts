import * as Phaser from "phaser";
import { WorldScene } from "./WorldScene";

export function createKriptoShaharGame(parent: HTMLElement): Phaser.Game {
  const w = Math.max(parent.clientWidth, 320);
  const h = Math.max(parent.clientHeight, 480);

  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: w,
    height: h,
    backgroundColor: "#06080d",
    physics: {
      default: "arcade",
      arcade: { gravity: { x: 0, y: 0 }, debug: false },
    },
    scene: [WorldScene],
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    input: {
      activePointers: 3,
      smoothFactor: 0,
      touch: { capture: true },
    },
    dom: {
      createContainer: false,
    },
    render: { antialias: true, roundPixels: false },
  });
}
