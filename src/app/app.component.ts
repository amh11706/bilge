import { Component } from '@angular/core';

export interface BilgeTile {
  x: number;
  y: number;
  color: keyof typeof TypeColors;
}

const TypeColors = [
  'red', 'green', 'blue', 'yellow', 'orange', 'purple',
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly HEIGHT = 12;
  readonly WIDTH = 6;
  colors = TypeColors;
  // private tilemap used for looking up tiles by their coordinates
  private tileMap: BilgeTile[][] = [];
  // public tiles used for rendering the html with transitions
  tiles: BilgeTile[] = [];

  cursor = { x: 0, y: 0 };

  constructor() {
    this.buildTiles();

    document.addEventListener('keydown', this.handleKey);
  }

  private handleKey = (e: KeyboardEvent) => {
    switch (e.key) {
      case ' ': return this.swapTiles();
      case 'w':
        if (this.cursor.y > 0) {
          this.cursor.y--;
        }
        break;
      case 'a':
        if (this.cursor.x > 0) {
          this.cursor.x--;
        }
        break;
      case 's':
        if (this.cursor.y < this.HEIGHT - 1) {
          this.cursor.y++;
        }
        break;
      case 'd':
        if (this.cursor.x < this.WIDTH - 2) {
          this.cursor.x++;
        }
        break;
    }
  }

  buildTiles(): void {
    this.tileMap = [];
    this.tiles = [];
    for (let y = 0; y < this.HEIGHT; y++) {
      const row: BilgeTile[] = [];
      for (let x = 0; x < this.WIDTH; x++) {
        row.push({ x, y, color: Math.floor(Math.random() * (this.colors.length)) });
      }
      this.tileMap.push(row);
      this.tiles.push(...row);
    }
  }

  hoverTile(t: BilgeTile): void {
    this.cursor.y = t.y;
    if (t.x > this.cursor.x + 1) {
      this.cursor.x = t.x - 1;
    } else if (t.x < this.cursor.x) {
      this.cursor.x = t.x;
    }
  }

  swapTiles(): void {
    const row = this.tileMap[this.cursor.y];
    const tile1 = row[this.cursor.x];
    const tile2 = row[this.cursor.x + 1];

    [tile1.x, tile1.y, tile2.x, tile2.y] = [tile2.x, tile2.y, tile1.x, tile1.y];
    row[tile1.x] = tile1;
    row[tile2.x] = tile2;
  }

}
