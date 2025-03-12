var boxw = 20;
var boxh = 20;

var nrows = 14;
var ncols = 14;

var maxclick = 25;
var nclick = 0;

// var colors = [
//   'red',
//   'yellow',
//   '#0b0',
//   '#fc6',
//   'purple',
//   'cyan',
//   '#66f',
//   '#f0f'
// ];
// var ncolors = 6;

var grid = [];
var box = [];
var job;
var info;
var game;
var oldcolor, newcolor;

var baseColors = {
  classic: ["red", "yellow", "#0b0", "#fc6", "purple", "cyan", "#66f", "#f0f"],
  rainbow: ["red", "orange", "yellow", "green", "blue", "indigo", "violet"],
  pink: ["#FFC0CB", "#FFB6C1", "#FF69B4", "#FF1493", "#DB7093"],
  maroon: ["#800000", "#8B0000", "#A52A2A", "#B22222", "#FF6347"],
  dreamy: ["#FFD7FF", "#E6E6FA", "#CCCCFF", "#B3B3E6", "#9999CC"],
};

// Retrieve the saved theme from local storage or default to 'classic'
var themeKeys = Object.keys(baseColors);
var savedTheme = localStorage.getItem("flooditTheme");
var theme = savedTheme
  ? savedTheme
  : themeKeys[Math.floor(Math.random() * themeKeys.length)];
var colors = baseColors[theme];
var ncolors = colors.length;

function rand(n) {
  return Math.floor(Math.random() * n);
}

function drawgrid() {
  readquery();
  setopt("sz", nrows);
  setopt("nc", ncolors);
  game = document.getElementById("game");
  game.style.width = ncols * boxw + "px";
  game.style.height = nrows * boxh + "px";
  for (var i = 0; i < nrows; i++) {
    grid[i] = [];
    box[i] = [];
    for (var j = 0; j < ncols; j++) {
      var c = rand(ncolors);
      grid[i][j] = c;
      box[i][j] = makebox(i, j, colors[c]);
    }
  }
  info = document.getElementById("info");
  showinfo();
}

function showinfo() {
  var c = grid[0][0];
  var win = nclick <= maxclick;
  if (win)
    for (var i = 0; i < nrows; i++) {
      for (var j = 0; j < ncols; j++) {
        if (grid[i][j] != c) {
          win = false;
          break;
        }
      }
    }

  var html = nclick + "/" + maxclick;
  if (win) html += "<p><strong>You Win!</strong>";
  else if (nclick >= maxclick) html += "<p><strong>You Lose</strong>";
  else if (nclick == 0)
    html +=
      '<br><span style="font-size: 50%">Click cells. Fill the board with a single color.</span>';
  info.innerHTML = html;
}

function makebox(x, y, color) {
  var div = document.createElement("DIV");
  div.style.backgroundColor = color;
  div.style.position = "absolute";
  div.style.width = boxw + "px";
  div.style.height = boxh + "px";
  div.style.top = y * boxh + "px";
  div.style.left = x * boxw + "px";
  div.onclick = clickbox;
  div.xcoord = x;
  div.ycoord = y;
  game.appendChild(div);
  return div;
}

function clickbox(e) {
  var job = [0, 0];
  var oldcolor = grid[0][0];
  var newcolor = grid[this.xcoord][this.ycoord];
  if (oldcolor == newcolor) return;
  nclick++;
  paint(job, oldcolor, newcolor);
}

function paint(job, oldcolor, newcolor) {
  var newjob = [];
  while (job.length > 1) {
    var y = job.pop();
    var x = job.pop();

    if (oldcolor != grid[x][y]) continue;

    grid[x][y] = newcolor;
    box[x][y].style.backgroundColor = colors[newcolor];

    if (x < ncols - 1 && grid[x + 1][y] == oldcolor) newjob.push(x + 1, y);

    if (y < nrows - 1 && grid[x][y + 1] == oldcolor) newjob.push(x, y + 1);

    if (x > 0 && grid[x - 1][y] == oldcolor) newjob.push(x - 1, y);

    if (y > 0 && grid[x][y - 1] == oldcolor) newjob.push(x, y - 1);
  }
  if (newjob.length > 0)
    setTimeout(function () {
      paint(newjob, oldcolor, newcolor);
    }, 15);
  else showinfo();
}

function setopt(sname, sval) {
  var sel = document.getElementsByName(sname)[0];
  for (var i = 0; i < sel.options.length; i++)
    if (sel.options[i].value == sval) {
      sel.selectedIndex = i;
      break;
    }
}

function readquery() {
  var qstr = location.search;
  if (qstr == null || qstr == "" || qstr == "?") return;
  qstr = qstr.substr(1);
  var terms = qstr.split("&");
  for (var i = 0; i < terms.length; i++) {
    var z = terms[i].split("=");
    var key = z[0];
    var val = z[1];
    if (key == "sz") nrows = ncols = val - 0;
    else if (key == "nc") ncolors = val - 0;
  }
  maxclick = Math.floor((25 * ((nrows + ncols) * ncolors)) / ((14 + 14) * 6));
}

function updateTheme() {
  var themeSelect = document.getElementById("theme");
  theme = themeSelect.value;
  colors = baseColors[theme];
  ncolors = colors.length;
  localStorage.setItem("flooditTheme", theme);
  drawgrid();
}
