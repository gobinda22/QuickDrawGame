import { analyzeAndValidateNgModules } from '@angular/compiler';
import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { AfterViewInit, Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  
  constructor() { }
  ngOnInit(): void {
    var c:any = document.getElementById("canvas");
    var ctx:any = c.getContext("2d");
    var r:number = 1; // draw radius
    ctx.lineWidth = r * 2;
    ctx.lineCap = "round";
    ctx.fillStyle = "black";
    var draw:boolean = false;
    var lineStart:boolean = true;
    var lastX:any, lastY:any;
   function yesDraw() {
    draw = true; lineStart = true;
   }
  function mouseMove(e:any) { 
    var bounds:any = c.getBoundingClientRect();
    var x:any = e.pageX - bounds.left - scrollX;
    var y:any = e.pageY - bounds.top - scrollY;
    if(draw && x > -r && x < c.width + r && y > -r && y < c.height + r){
    drawing(x,y);
}
  }
  
function noDraw() { 
  draw = false;
}

document.addEventListener("mousemove",mouseMove);
document.addEventListener("mousedown",yesDraw);
document.addEventListener("mouseup",noDraw);


function drawing(x:any, y:any) {
if(lineStart){
  lastX = x;
  lastY = y;
  lineStart = false;
}
ctx.beginPath();
ctx.lineTo(lastX, lastY);
ctx.lineTo(x, y);
ctx.stroke();
lastX = x;
lastY = y;
}
}   
   onClick() {
    var c:any = document.getElementById("canvas");
    var ctx:any = c.getContext("2d");
    var r:number = 1; // draw radius
    ctx.lineWidth = r * 2;
    ctx.lineCap = "round";
    ctx.fillStyle = "black";
    var c:any = document.getElementById("clrw");
    ctx.clearRect(0, 0, 600, 400);
  }

  }
