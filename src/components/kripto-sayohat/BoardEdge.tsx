"use client";

import Image from "next/image";
import { BOARD_TILES } from "@/lib/kripto-sayohat/board";
import type { BoardTile } from "@/lib/kripto-sayohat/types";
import { EDGE_BOTTOM, EDGE_LEFT, EDGE_RIGHT, EDGE_TOP } from "@/lib/kripto-sayohat/tile-layout";

interface BoardEdgeProps {
  position: number;
  awaitingTileClick: boolean;
  phase: string;
  onTileClick: (tileId: number) => void;
}

function EdgeTile({
  tile,
  isActive,
  isDone,
  canClick,
  onClick,
}: {
  tile: BoardTile;
  isActive: boolean;
  isDone: boolean;
  canClick: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={!canClick}
      onClick={onClick}
      className={[
        "ks-edge-tile",
        `zone-${tile.zone}`,
        isActive ? "active" : "",
        isDone ? "done" : "",
        canClick ? "clickable" : "",
      ].join(" ")}
      title={tile.title}
    >
      <span className="ks-edge-icon">{tile.icon}</span>
      <span className="ks-edge-num">{tile.id}</span>
      {isActive && <span className="ks-edge-ping" />}
    </button>
  );
}

function TileRow({
  ids,
  position,
  awaitingTileClick,
  phase,
  onTileClick,
  vertical,
}: {
  ids: number[];
  position: number;
  awaitingTileClick: boolean;
  phase: string;
  onTileClick: (id: number) => void;
  vertical?: boolean;
}) {
  return (
    <div className={`ks-edge-row ${vertical ? "vertical" : ""}`}>
      {ids.map((id) => {
        const tile = BOARD_TILES[id];
        if (!tile) return null;
        const isActive = id === position;
        const isDone = id < position;
        const canClick = isActive && awaitingTileClick && phase === "board";
        return (
          <EdgeTile
            key={id}
            tile={tile}
            isActive={isActive}
            isDone={isDone}
            canClick={canClick}
            onClick={() => onTileClick(id)}
          />
        );
      })}
    </div>
  );
}

export function BoardEdge({ position, awaitingTileClick, phase, onTileClick }: BoardEdgeProps) {
  const handleClick = (id: number) => {
    if (id !== position) return;
    onTileClick(id);
  };

  return (
    <div className="ks-edge-board">
      <TileRow
        ids={EDGE_TOP}
        position={position}
        awaitingTileClick={awaitingTileClick}
        phase={phase}
        onTileClick={handleClick}
      />
      <div className="ks-edge-middle">
        <TileRow
          ids={EDGE_LEFT}
          position={position}
          awaitingTileClick={awaitingTileClick}
          phase={phase}
          onTileClick={handleClick}
          vertical
        />
        <div className="ks-edge-center">
          <Image
            src="/game/kripto-sayohat/board-center.png"
            alt="Kripto-Sayohat markaz"
            width={800}
            height={600}
            className="ks-center-img"
            unoptimized
            priority
          />
          {awaitingTileClick && phase === "board" && (
            <div className="ks-tap-hint">👆 Yonib turgan katakni bosing</div>
          )}
        </div>
        <TileRow
          ids={EDGE_RIGHT}
          position={position}
          awaitingTileClick={awaitingTileClick}
          phase={phase}
          onTileClick={handleClick}
          vertical
        />
      </div>
      <TileRow
        ids={EDGE_BOTTOM}
        position={position}
        awaitingTileClick={awaitingTileClick}
        phase={phase}
        onTileClick={handleClick}
      />
    </div>
  );
}
