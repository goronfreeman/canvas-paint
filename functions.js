var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// set canvas dimensions
ctx.canvas.width = window.innerWidth - 150;
ctx.canvas.height = window.innerHeight - 50;

var myCanvas = $('#canvas');

myCanvas.mousedown(function(e) {
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(mouseX, mouseY);
  redraw();
});

myCanvas.mousemove(function(e) {
  if(paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

myCanvas.mouseup(function(e) {
  paint = false;
});

myCanvas.mouseleave(function(e) {
  paint = false;
});

var clickX = [];
var clickY = [];
var clickDrag = [];
var paint;

function addClick(x, y, dragging) {
  var color = $('#picker').val();

  {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);

    if (curTool == 'eraser') {
      clickColor.push('white')
    } else {
      clickColor.push(curColor);
    }

    clickSize.push(curSize);
  }
}

var colorPurple = '#cb3594';
var colorGreen = '#659b41';
var colorYellow = '#ffcf33';
var colorBrown = '#986928';

var small = 2;
var normal = 5;
var large = 8;

// var curColor = colorPurple;
var curColor = $('#picker').val();
var curTool = 'pencil';
var curSize = 10;
var clickColor = [];
var clickSize = [];

function redraw() {
  // clear the canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  ctx.lineJoin = 'round';

  for (var i = 0; i < clickX.length; i++) {
    ctx.beginPath();
    if (clickDrag[i] && i) {
      ctx.moveTo(clickX[i-1], clickY[i-1]);
    } else {
      ctx.moveTo(clickX[i], clickY[i]);
    }
    ctx.lineTo(clickX[i], clickY[i]);
    ctx.closePath();
    ctx.strokeStyle = clickColor[i];
    ctx.lineWidth = curSize;
    ctx.stroke();
  }
}

var colorList = [colorPurple, colorGreen, colorYellow, colorBrown].slice(0,4);

$('.colors').click(function() {
  $this = $(this);
  curColor = $this.css('background-color');

  $('.colors').css('border', 'none');

  if ($this.css('background-color') == curColor) {
    $this.css({
      'border-color': '#fff',
      'border-width': '2px',
      'border-style': 'solid'
    });
  }
});

updateColors();

$('.tools').click(function() {
  $this = $(this);

  $('.tools').removeClass('active');
  $this.addClass('active');

  curTool = $this.attr('id');
});

$('#picker').change(function() {
  curColor = $(this).val();

  colorList.unshift(curColor);
  $('#color').css('background-color', curColor);

  updateColors();
});

$('#dropper').click(function(e) {
  e.preventDefault();
  $('#picker').click();
});

function updateColors() {
  $('.colors').each(function(i) {
    $(this).css('background-color', colorList[i]);
  });
}
