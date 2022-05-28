/*
  0. 키보드 입력으로 모드 조작
  1. 얼굴 인식해서 점 표현(e)
  2. 마우스로 점 표현한 것 지정
  3. 지정한 점들로 도형 그리기(마우스 클릭)
  4. 도형 저장(c)
  5. ctrl z (z)
  6. 모든 도형 삭제 (d)
  7. 캡쳐 (s)
  
  ** 도형 색상은 랜덤값
*/


let sketch = function(p){
  let canvas;
  let dMouse = [];
  let closest = 0;
  let isEditMode = false;

  let fill_H_Slider, fill_S_Slider, fill_B_Slider, fill_O_Slider;
  let fill_H_Value, fill_S_Value, fill_B_Value, fill_O_Value;
  
  let shapes = [{
    fill_H : p.random(360),
    fill_S : 50,
    fill_B : 100,
    fill_O : 100,
    indices : []
  }];

  let shapeIndex = 0;
  let tParameters;
  let capture;

  p.setup = function(){
    canvas = p.createCanvas(640, 480);
    canvas.id('canvas');
    p.colorMode(p.HSB, 360, 100, 100, 100);

    fill_H_Value = p.createDiv();
    fill_H_Value.class('valueDisplay');
    fill_H_Slider = p.createSlider(0, 360, p.random(360), 5);
    fill_H_Slider.class('Slider');

    fill_S_Value = p.createDiv();
    fill_S_Value.class('valueDisplay');
    fill_S_Slider = p.createSlider(0, 100, 50, 5);
    fill_S_Slider.class('Slider');

    fill_B_Value = p.createDiv();
    fill_B_Value.class('valueDisplay');
    fill_B_Slider = p.createSlider(0, 100, 100, 5);
    fill_B_Slider.class('Slider');

    fill_O_Value = p.createDiv();
    fill_O_Value.class('valueDisplay');
    fill_O_Slider = p.createSlider(0, 100, 100, 5);
    fill_O_Slider.class('Slider');

   

    tParameters = {
      fill_H : fill_H_Slider.value(),
      fill_S : fill_S_Slider.value(),
      fill_B : fill_B_Slider.value(),
      fill_O : fill_O_Slider.value(),
    }

    capture = p.createCapture(p.VIDEO);
    capture.size(p.width, p.height);
    capture.hide();
  }

  p.draw = function(){
    p.clear();
    if(detections != undefined){
      if(detections.multiFaceLandmarks != undefined && detections.multiFaceLandmarks.length >= 1){
        p.drawShapes();
        if(isEditMode == true){
          p.faceMesh();
          p.editShapes();
        }
        p.glow();
      }
    }

  }

  p.faceMesh = function(){
    p.stroke(255);
    p.strokeWeight(3);

    p.beginShape(p.POINTS);
    for(let i=0; i<detections.multiFaceLandmarks[0].length; i++){
      let x = detections.multiFaceLandmarks[0][i].x * p.width;
      let y = detections.multiFaceLandmarks[0][i].y * p.height;
      p.vertex(x, y);

      let d = p.dist(x, y, p.mouseX, p.mouseY);
      dMouse.push(d);
    }
    p.endShape();

    let minimum = p.min(dMouse);
    closest = dMouse.indexOf(minimum);

    p.stroke(0, 100, 100);
    p.strokeWeight(10);
    p.point(
      detections.multiFaceLandmarks[0][closest].x * p.width,
      detections.multiFaceLandmarks[0][closest].y * p.height
    );

    dMouse.splice(0, dMouse.length);
  }

  p.mouseClicked = function(){
    if(p.mouseX >= 0 && p.mouseX <= p.width){
      if(p.mouseY >= 0 && p.mouseY <= p.height){
        if(isEditMode == true){
          shapes[shapeIndex].indices.push(closest);
          console.log(shapes);
        }
      }
    }
  }

  p.drawShapes = function(){
    for(let s = 0; s < shapes.length; s++){
      p.fill(
        shapes[s].fill_H,
        shapes[s].fill_S,
        shapes[s].fill_B,
        shapes[s].fill_O
      );
      p.strokeWeight(3);

      if(isEditMode == true){
        if(s == shapeIndex) p.glow('rgba(255, 255, 255, 100)');
        else p.glow('rgba(255, 255, 255, 0)');
      }else if(isEditMode == false){
        p.glow('rgba(255, 255, 255, 100)');
      }

      p.beginShape();
        for(let i = 0; i < shapes[s].indices.length; i++){
          p.vertex(
            detections.multiFaceLandmarks[0][shapes[s].indices[i]].x * p.width,
            detections.multiFaceLandmarks[0][shapes[s].indices[i]].y * p.height,
          );
        }
      p.endShape();
    }
  }

  p.editShapes = function(){
    // --- fill ---
    if(tParameters.fill_H != fill_H_Slider.value()){
      tParameters.fill_H = fill_H_Slider.value();
      shapes[shapeIndex].fill_H = fill_H_Slider.value();
    }
    if(tParameters.fill_S!= fill_S_Slider.value()){
      tParameters.fill_S = fill_S_Slider.value();
      shapes[shapeIndex].fill_S = fill_S_Slider.value();
    }
    if(tParameters.fill_B != fill_B_Slider.value()){
      tParameters.fill_B = fill_B_Slider.value();
      shapes[shapeIndex].fill_B = fill_B_Slider.value();
    }
    if(tParameters.fill_O != fill_O_Slider.value()){
      tParameters.fill_O = fill_O_Slider.value();
      shapes[shapeIndex].fill_O = fill_O_Slider.value();
    }
  }

  p.keyTyped = function(){
    if(p.key === 'e') isEditMode = !isEditMode;

    if(p.key === 'c'){
      if(shapes[shapes.length-1].indices.length > 0){
        shapes.push(
          {
            fill_H : p.random(360),
            fill_S : 50,
            fill_B : 100,
            fill_O : 100,
            indices : []
          }
        );
        shapeIndex = shapes.length-1;
      }
      console.log(shapes);
    }

    if(p.key === 'z'){
      if(shapes[shapeIndex] != undefined){
        if(shapes[shapeIndex].indices.length > 0) shapes[shapeIndex].indices.pop();
      }
      console.log(shapes[shapeIndex].indices);
    }

    if(p.key === 'd'){
      shapes = [
        {
          fill_H : p.random(360),
          fill_S : 50,
          fill_B : 100,
          fill_O : 100,
          indices : []
        }
      ];
      shapeIndex = 0;
      console.log(shapes);
    }

    if(p.key === 's'){
      p.image(capture.get(0, 0, p.width, p.height), 0, 0, p.width, p.height);
      p.drawShapes();
      p.glow();
      p.saveCanvas('screenShot', 'png');
    }
  }

  p.keyPressed = function(){
    if(p.keyCode === p.UP_ARROW){
      if(shapes[shapeIndex] != undefined){
        if(shapes[shapeIndex].indices.length == 0 && shapes.length > 1) shapes.splice(shapeIndex, 1);
        if(shapeIndex < shapes.length-1) shapeIndex++;
      }
    } else if(p.keyCode === p.DOWN_ARROW){
      if(shapes[shapeIndex] != undefined){
        if(shapes[shapeIndex].indices.length == 0 && shapes.length > 1) shapes.splice(shapeIndex, 1);
        if(shapeIndex > 0) shapeIndex--;
      }
    }
    console.log(shapeIndex);
  }

  p.glow = function(glowColor){
    p.drawingContext.shadowOffsetX = 0;
    p.drawingContext.shadowOffsetY = 0;
    p.drawingContext.shadowBlur = 20;
    p.drawingContext.shadowColor = glowColor;
  }
}

let myp5 = new p5(sketch);