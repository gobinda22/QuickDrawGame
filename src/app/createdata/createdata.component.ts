import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-createdata',
  templateUrl: './createdata.component.html',
  styleUrls: ['./createdata.component.css']
})
export class CreatedataComponent implements OnInit {

  constructor(private http:HttpClient) { }

  @ViewChild('canvas') public canvasEl?: ElementRef;

  className: string = ""

  image = ""
  result = ''
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
document.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  e.preventDefault();
  e.stopPropagation();
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  document.dispatchEvent(mouseEvent);
}, false);
document.addEventListener("touchstart", function (e) {
  var touch = e.touches[0];
  e.preventDefault();
  e.stopPropagation();
  var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  document.dispatchEvent(mouseEvent);
}, false)

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
  test(){
    var canvas:HTMLCanvasElement = this.canvasEl?.nativeElement;
    var date = Date.now();
    var filename = this.className + '_' + date + '.png';
    var image = canvas.toDataURL("images/png");
    this.http.post(
        environment.SERVER_URL + '/testing',
        {image, className: this.className},
        {responseType:'text'}
        ).subscribe((res: any)=>{
          console.log('result =', res)
          this.result = 'It is a ' +res;
          this.onClick();
        })    
  } 
 
  
    
}