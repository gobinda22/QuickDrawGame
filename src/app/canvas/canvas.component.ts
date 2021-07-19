import { analyzeAndValidateNgModules } from '@angular/compiler';
import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  

  constructor(private http:HttpClient) { }

  @ViewChild('canvas') public canvasEl?: ElementRef;

  className: string = ""

  image = ""

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
   onClick(){
    var c:any = document.getElementById("canvas");
    var ctx:any = c.getContext("2d");
    var r:number = 1; // draw radius
    ctx.lineWidth = r * 2;
    ctx.lineCap = "round";
    ctx.fillStyle = "black";
    var c:any = document.getElementById("clrw");
    ctx.clearRect(0, 0, 600, 400);
  }
  getClass(ClassName:string){
    this.className = ClassName;
    console.log(ClassName);
  }
  saveImage(){
    if (this.className.length == 0){
      console.log('Not Updated!')
      alert("No labels selected\nPlease select ");
      return;
    }
    var canvas:HTMLCanvasElement = this.canvasEl?.nativeElement;
    var date = Date.now();
    var filename = this.className + '_' + date + '.png';
    var image = canvas.toDataURL("images/png");
    console.log(image);
    this.http.post(
        environment.SERVER_URL + '/upload_canvas',
        {filename, image, className: this.className},
        {responseType:'text'}
        
        ).subscribe((res:any)=>{
          console.log(res, this.className)
          this.onClick();
        })    
      } 

  }
