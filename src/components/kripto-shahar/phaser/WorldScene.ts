import * as Phaser from "phaser";
import {
  BUILDINGS,
  MAP_WIDTH,
  MAP_HEIGHT,
  TILE_SIZE,
  FIELD_BOUNDS,
} from "@/lib/kripto-shahar/buildings";
import {
  BUILDING_SPRITES,
  TREE_PROPS,
  MASCOT_TARGET_PX,
  getAllAssetPaths,
  mascotTextureKey,
  scaleToHeight,
  type SpriteDef,
} from "@/lib/kripto-shahar/assets";
import { getFieldById } from "@/lib/kripto-shahar/fields";
import { useKriptoShaharStore } from "@/lib/kripto-shahar/game-store";
import type { BuildingId } from "@/lib/kripto-shahar/types";

const WORLD_W = MAP_WIDTH * TILE_SIZE;
const WORLD_H = MAP_HEIGHT * TILE_SIZE;
const SPAWN_X = 13 * TILE_SIZE;
const SPAWN_Y = 9 * TILE_SIZE;
const MASCOT_HIT_RADIUS = 110;

export class WorldScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private buildingZones: { id: BuildingId; zone: Phaser.GameObjects.Zone }[] = [];
  private mascotKey = "mascot_idle";
  private mascotScale = 0.12;
  private isDragging = false;
  private dragGlow!: Phaser.GameObjects.Ellipse;
  private loadingText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "WorldScene" });
  }

  preload() {
    this.loadingText = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "Maydon yuklanmoqda...", {
        fontFamily: "Rajdhani, sans-serif",
        fontSize: "14px",
        color: "#f4b942",
      })
      .setOrigin(0.5)
      .setScrollFactor(0);

    getAllAssetPaths().forEach(({ key, path }) => {
      if (!this.textures.exists(key)) this.load.image(key, path);
    });
  }

  create() {
    this.loadingText?.destroy();
    const state = useKriptoShaharStore.getState();
    this.mascotKey = mascotTextureKey(state.player.avatarType);

    this.buildFieldBackground(state.selectedField);
    this.placeTrees();
    this.placeBuildings();
    this.createMascot(
      this.clampX(state.player.x || SPAWN_X),
      this.clampY(state.player.y || SPAWN_Y)
    );
    this.setupCamera();
    this.setupDragControls();
  }

  private clampX(x: number) {
    return Phaser.Math.Clamp(x, FIELD_BOUNDS.minX, FIELD_BOUNDS.maxX);
  }

  private clampY(y: number) {
    return Phaser.Math.Clamp(y, FIELD_BOUNDS.minY, FIELD_BOUNDS.maxY);
  }

  private isPointerOnMascot(pointer: Phaser.Input.Pointer) {
    return (
      Phaser.Math.Distance.Between(
        pointer.worldX,
        pointer.worldY,
        this.player.x,
        this.player.y
      ) <= MASCOT_HIT_RADIUS
    );
  }

  private buildFieldBackground(fieldId: string) {
    const field = getFieldById(fieldId as Parameters<typeof getFieldById>[0]);
    const cx = WORLD_W / 2;
    const cy = WORLD_H / 2;
    const frame = this.textures.get(field.bgKey).get();
    const cover = Math.max(WORLD_W / frame.width, WORLD_H / frame.height);

    const bg = this.add.image(cx, cy, field.bgKey);
    bg.setScale(cover * field.bgScale);
    bg.setDepth(0);
  }

  private addShadow(x: number, y: number, w: number, h: number) {
    this.add.ellipse(x, y + h * 0.38, w * 0.5, h * 0.08, 0x000000, 0.18).setDepth(1);
  }

  private placeSprite(def: SpriteDef, x: number, y: number, depth: number) {
    const targetH = MASCOT_TARGET_PX * def.heightMultiplier;
    const scale = scaleToHeight(this.textures.get(def.key).get().height, targetH);
    this.addShadow(x, y, targetH, targetH);
    const img = this.add.image(x, y + (def.yOffset ?? 0), def.key);
    img.setScale(scale);
    img.setDepth(depth);
    return img;
  }

  private placeTrees() {
    TREE_PROPS.forEach((tree) => {
      this.placeSprite(tree, tree.x * TILE_SIZE, tree.y * TILE_SIZE, 2);
    });
  }

  private placeBuildings() {
    BUILDINGS.forEach((b) => {
      const spriteDef = BUILDING_SPRITES[b.id];
      const px = b.tileX * TILE_SIZE + (b.width * TILE_SIZE) / 2;
      const py = b.tileY * TILE_SIZE + (b.height * TILE_SIZE) / 2;
      const targetH = MASCOT_TARGET_PX * spriteDef.heightMultiplier;
      const scale = scaleToHeight(this.textures.get(spriteDef.key).get().height, targetH);

      this.addShadow(px, py, targetH, targetH);

      const sprite = this.add.image(px, py + (spriteDef.yOffset ?? 0), spriteDef.key);
      sprite.setScale(scale);
      sprite.setDepth(4);

      const labelY = py - sprite.displayHeight * 0.48;
      const labelBg = this.add.graphics();
      labelBg.fillStyle(0x000000, 0.65);
      labelBg.fillRoundedRect(px - 50, labelY - 4, 100, 20, 6);
      labelBg.setDepth(5);

      this.add
        .text(px, labelY + 6, b.nameUz, {
          fontFamily: "Rajdhani, sans-serif",
          fontSize: "10px",
          fontStyle: "bold",
          color: "#f4b942",
        })
        .setOrigin(0.5)
        .setDepth(6);

      const zoneW = Math.max(sprite.displayWidth * 0.55, 72);
      const zoneH = Math.max(sprite.displayHeight * 0.4, 60);
      const zone = this.add.zone(px, py + sprite.displayHeight * 0.08, zoneW, zoneH);
      this.physics.add.existing(zone, true);
      this.buildingZones.push({ id: b.id, zone: zone as Phaser.GameObjects.Zone });
    });
  }

  private createMascot(x: number, y: number) {
    this.mascotScale = scaleToHeight(this.textures.get(this.mascotKey).get().height, MASCOT_TARGET_PX);

    this.player = this.physics.add.sprite(x, y, this.mascotKey);
    this.player.setScale(this.mascotScale);
    this.player.setDepth(8);
    this.player.setCollideWorldBounds(true);
    this.player.body?.setCircle(32);

    this.dragGlow = this.add.ellipse(x, y + 20, 50, 14, 0xf4b942, 0.25);
    this.dragGlow.setDepth(7);
    this.dragGlow.setVisible(false);
  }

  private movePlayerTo(worldX: number, worldY: number) {
    const x = this.clampX(worldX);
    const y = this.clampY(worldY);
    this.player.setPosition(x, y);
    const body = this.player.body as Phaser.Physics.Arcade.Body | null;
    body?.updateFromGameObject();
    body?.setVelocity(0, 0);
    this.dragGlow.setPosition(x, y + 20);
  }

  private setupDragControls() {
    const beginDrag = () => {
      if (this.isDragging) return;
      this.isDragging = true;
      this.cameras.main.stopFollow();
      this.player.setScale(this.mascotScale * 1.1);
      this.dragGlow.setVisible(true);
      this.tweens.add({
        targets: this.player,
        angle: { from: -4, to: 4 },
        duration: 140,
        yoyo: true,
        repeat: -1,
      });
    };

    const endDrag = () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.player.setScale(this.mascotScale);
      this.player.setAngle(0);
      this.tweens.killTweensOf(this.player);
      this.dragGlow.setVisible(false);
      this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
      useKriptoShaharStore.getState().updatePlayerPosition(this.player.x, this.player.y);
    };

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (!this.isPointerOnMascot(pointer)) return;
      beginDrag();
      this.movePlayerTo(pointer.worldX, pointer.worldY);
    });

    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if (!this.isDragging || !pointer.isDown) return;
      this.movePlayerTo(pointer.worldX, pointer.worldY);
    });

    this.input.on("pointerup", endDrag);
    this.input.on("pointerupoutside", endDrag);
  }

  private setupCamera() {
    this.cameras.main.setBounds(0, 0, WORLD_W, WORLD_H);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1.05);
    this.physics.world.setBounds(
      FIELD_BOUNDS.minX,
      FIELD_BOUNDS.minY,
      FIELD_BOUNDS.maxX - FIELD_BOUNDS.minX,
      FIELD_BOUNDS.maxY - FIELD_BOUNDS.minY
    );
  }

  update() {
    if (useKriptoShaharStore.getState().phase !== "world") return;

    if (!this.isDragging) {
      this.dragGlow.setPosition(this.player.x, this.player.y + 20);
    }

    let nearId: BuildingId | null = null;
    let minDist = Infinity;
    for (const { id, zone } of this.buildingZones) {
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, zone.x, zone.y);
      const threshold = Math.max(zone.width, zone.height) * 0.5;
      if (dist < threshold && dist < minDist) {
        minDist = dist;
        nearId = id;
      }
    }
    const prev = useKriptoShaharStore.getState().nearBuilding;
    if (prev !== nearId) useKriptoShaharStore.getState().setNearBuilding(nearId);
  }

  refreshMascot(avatarType: string) {
    this.mascotKey = mascotTextureKey(avatarType);
    this.mascotScale = scaleToHeight(this.textures.get(this.mascotKey).get().height, MASCOT_TARGET_PX);
    this.player.setTexture(this.mascotKey);
    this.player.setScale(this.mascotScale);
  }
}
