import P5 from "p5/lib/p5.min";

let rows = null;
let cols = null;
let grid = null;
let next = null;
let res = 5;

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let fillArrayWithRandom = () => {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++ ) {
      grid[i][j] = Math.round(Math.random(2));
    }
  }
}

let runP5 = (p5) => {
  p5.setup = () => {
    var canvas = p5.createCanvas(600, 600)
    canvas.parent("p5Canvas");
    p5.frameRate(10);
    cols = p5.width / res;
    rows = p5.height / res;

    grid = make2DArray(cols, rows)
    fillArrayWithRandom()

    // console.table(grid);
  }


  p5.draw = () => {
    p5.background(0);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++ ) {
        let x = i * res;
        let y = j * res;
        if (grid[i][j] == 1){
          p5.fill(255);
          p5.stroke(255)
          p5.rect(x, y, res, res)
        }
      }
    }

    next = make2DArray(cols, rows);


    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++ ) {
        let state = grid[i][j];

        // count live neighbors
        let sum = 0 ;
        let neighbors = countNeighbors(grid, i, j)

        if (state == 0 && neighbors == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3) ) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
      }
    }

  grid = next;
}

}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row]
    }
  }
  sum -= grid[x][y];
  return sum;
}

new P5(runP5)