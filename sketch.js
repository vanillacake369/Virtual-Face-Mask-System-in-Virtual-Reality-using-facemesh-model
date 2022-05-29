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
  // ---------------------- 전역 변수 선언 ----------------------
  // 캔버스 담당
  let canvas;
  // 마우스 포인트 담당
  let dMouse = [];
  let closest = 0;
  // 편집 모드 여부 확인 담당
  let isEditMode = false;
  /* slider 변수
		1. fill_H_Slider : fill hue 
		2. fill_S_Slider : fill saturation: 
		3. fill_B_Slider : fill brightness: 
		4. fill_O_Slider : fill opacity: 
		5. stroke_H_Slider : stroke hue 
		6. stroke_S_Slider : stroke saturation: 
		7. stroke_B_Slider : stroke brightness: 
		8. stroke_O_Slider : stroke opacity: 
  */
  let fill_H_Slider, fill_S_Slider, fill_B_Slider, fill_O_Slider;
  let fill_H_Value, fill_S_Value, fill_B_Value, fill_O_Value;
  let stroke_H_Slider, stroke_S_Slider, stroke_B_Slider, stroke_O_Slider;
  let stroke_H_Value, stroke_S_Value, stroke_B_Value, stroke_O_Value;

  // shapes 담당
  let shapes = [{
    fill_H : p.random(360),
    fill_S : 50,
    fill_B : 100,
    fill_O : 100,
    stroke_H : p.random(360),
    stroke_S : 50,
    stroke_B : 100,
    stroke_O : 100,
    indices : []
  }];
  let shapeIndex = 0;
  let tParameters;
  
  // capture 담당
  let capture;
  // ---------------------- 전역 변수 선언 ----------------------

  // ---------------------- 전체적인 사전작업 ----------------------
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

    stroke_H_Value = p.createDiv();
    stroke_H_Value.class('valueDisplay');
    stroke_H_Slider = p.createSlider(0, 360, p.random(360), 5);
    stroke_H_Slider.class('Slider');

    stroke_S_Value = p.createDiv();
    stroke_S_Value.class('valueDisplay');
    stroke_S_Slider = p.createSlider(0, 100, 50, 5);
    stroke_S_Slider.class('Slider');

    stroke_B_Value = p.createDiv();
    stroke_B_Value.class('valueDisplay');
    stroke_B_Slider = p.createSlider(0, 100, 100, 5);
    stroke_B_Slider.class('Slider');

    stroke_O_Value = p.createDiv();
    stroke_O_Value.class('valueDisplay');
    stroke_O_Slider = p.createSlider(0, 100, 100, 5);
    stroke_O_Slider.class('Slider');

    tParameters = {
      fill_H : fill_H_Slider.value(),
      fill_S : fill_S_Slider.value(),
      fill_B : fill_B_Slider.value(),
      fill_O : fill_O_Slider.value(),
      stroke_H : stroke_H_Slider.value(),
      stroke_S : stroke_S_Slider.value(),
      stroke_B : stroke_B_Slider.value(),
      stroke_O : stroke_O_Slider.value()
    }

    capture = p.createCapture(p.VIDEO);
    capture.size(p.width, p.height);
    capture.hide();
  }
  // ---------------------- 전체적인 사전작업 ----------------------

  // ------------------------ draw 작업 ------------------------
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

    fill_H_Value.html("fill hue: " + fill_H_Slider.value());
    fill_S_Value.html("fill saturation: " + fill_S_Slider.value());
    fill_B_Value.html("fill brightness: " + fill_B_Slider.value());
    fill_O_Value.html("fill opacity: " + fill_O_Slider.value());

    stroke_H_Value.html("stroke hue: " + stroke_H_Slider.value());
    stroke_S_Value.html("stroke saturation: " + stroke_S_Slider.value());
    stroke_B_Value.html("stroke brightness: " + stroke_B_Slider.value());
    stroke_O_Value.html("stroke opacity: " + stroke_O_Slider.value());
  }
  // ------------------------ draw 작업 ------------------------
  
  
  // ------------------------ FaceMesh 모델 ------------------------
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
  // ------------------------ FaceMesh 모델 ------------------------

  // ------------------------ 모델 위에 마우스로 포인트 지정 ------------------------
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
  // ------------------------ 모델 위에 마우스로 포인트 지정 ------------------------

  // ------------------------ shapes의 각 원소들에 대한 fill,stroke,vertex,glow ------------------------
  p.drawShapes = function(){
    for(let s = 0; s < shapes.length; s++){
      p.fill(
        shapes[s].fill_H,
        shapes[s].fill_S,
        shapes[s].fill_B,
        shapes[s].fill_O
      );
      p.stroke(
        shapes[s].stroke_H,
        shapes[s].stroke_S,
        shapes[s].stroke_B,
        shapes[s].stroke_O
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
  // ------------------------ shapes의 각 원소들에 대한 fill,stroke,vertex,glow ------------------------

  // ------------------------ 사용자 지정 슬라이더 값 가져오기 ------------------------
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

    // --- stroke ---
    if(tParameters.stroke_H != stroke_H_Slider.value()){
      tParameters.stroke_H = stroke_H_Slider.value();
      shapes[shapeIndex].stroke_H = stroke_H_Slider.value();
    }
    if(tParameters.stroke_S != stroke_S_Slider.value()){
      tParameters.stroke_S = stroke_S_Slider.value();
      shapes[shapeIndex].stroke_S = stroke_S_Slider.value();
    }
    if(tParameters.stroke_B != stroke_B_Slider.value()){
      tParameters.stroke_B = stroke_B_Slider.value();
      shapes[shapeIndex].stroke_B = stroke_B_Slider.value();
    }
    if(tParameters.stroke_O != stroke_O_Slider.value()){
      tParameters.stroke_O = stroke_O_Slider.value();
      shapes[shapeIndex].stroke_O = stroke_O_Slider.value();
    }
  }
  // ------------------------ 사용자 지정 슬라이더 값 가져오기 ------------------------
  
  // ------------------------ 사용자 편집 모드 ------------------------
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
            stroke_H : p.random(360),
            stroke_S : 50,
            stroke_B : 100,
            stroke_O : 100,
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
          stroke_H : p.random(360),
          stroke_S : 50,
          stroke_B : 100,
          stroke_O : 100,
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

  // ------------------------ p에 대한 glow 정의 ------------------------
  p.glow = function(glowColor){
    p.drawingContext.shadowOffsetX = 0;
    p.drawingContext.shadowOffsetY = 0;
    p.drawingContext.shadowBlur = 20;
    p.drawingContext.shadowColor = glowColor;
  }
  // ------------------------ p에 대한 glow 정의 ------------------------
}

// sketch 그리기 위한 생성자를 사용하여 객체 myp5 생성
let myp5 = new p5(sketch);
