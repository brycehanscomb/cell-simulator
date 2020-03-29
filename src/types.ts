export enum CellValue {
  DEAD,
  ALIVE
}

export type BoardState = Array<CellValue>;

export interface GameState {
  boardState: BoardState;
  rows: number;
  cols: number;
}
