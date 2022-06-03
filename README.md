# Virtual-Face-Mask-System-in-Virtual-Reality-using-facemesh-model
 사용자의 얼굴에 AR을 활용한 가상 모델을 나타낼 수 있게 구현한 프로그램입니다.

# 실제 프로그램 실행해보기
[여기를 클릭하면 웹 상에서 실제 프로그램을 실행하실 수 있습니다~ :)](https://editor.p5js.org/lonelynight1026/full/JVLzczC08 "페이스메쉬모델")
***대신 웹 캠을 준비해주셔야 해요~!***

# 과제명
얼굴 그물망모델링을 활용한 가상현실 가면
Virtual Face Mask System in Virtual Reality using facemesh model
# 팀명 
블루칩 Blue Chip
# 팀장 및 참여학생 담당업무

|No|팀장/팀원|학과|이름|학년|휴대폰|담당업무|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|1|팀장|컴퓨터공학과|임지훈|3|010-3144-3485|코드 구현, 논문 작성,PPT|
|2|팀원|컴퓨터공학과|김조은|2|010-2899-5117|영상, 논문 작성|
|3|팀원|컴퓨터공학과|손정우|2|010-7566-3616|코드 구현, 영상,PPT|
|4|팀원|컴퓨터공학과|최민정|2|010-9247-6733|리플렛 작성, 논문 작성|
|5|팀원|컴퓨터공학과|최하람|2|010-7128-8669|리플렛 작성, 영상|

# 1.과제요약

 컴퓨터 비전이 발전하면서 이제는 사람을 인식하는 다양한 기술이 동원되고 있으며 머신러닝 모델도 이에 비례해서 증가하고 있는 추세이다. 인간의 얼굴을 학습한 3D 표현은 캐릭터 생성 및 애니메이션과 같은 그래픽 애플리케이션뿐만 아니라 이미지에서 3D 얼굴 추적 및 재구성 같은 컴퓨터 비전 문제 해결에 유용하다. 그러나 아직까지는 사람의 표정 변화까지 인식하는 모델은 흔하지 않다.
 Facemesh는 얼굴의 여러 지점(랜드마크)을 인식하는데 총 486개 위치를 찾을 수 있는 머신러닝 모델이다. 고차 텐서 일반화(tensor-based MPCA)를 사용하여 메시 표면과 다양한 분야의 캐릭터 모델링을 기반으로 실제 사용자의 얼굴에 가상 모델을 생성하는 모델을 구상하였으며, 결과적으로 사용자의 얼굴에 AR을 활용한 가상 모델을 나타낼 수 있게 구현 하였다.

# 2. 과제 개요


## i) 과제 배경 
 강의 시간에 학습한 내용 중 현재 다양한 분야에서 널리 사용되는 기술인 facemask 에 대해 더 탐구하고자 하였다. facemesh 기술에 대해 찾아보던 중 facemesh 에 대해 알게 되었고 강의 과정에서 학습했던 faceapi 기술을 응용한 활용 방안들을 보면서 이 기술에 흥미를 가지게 되었다. 세계 최고의 미디어 플랫폼인 ‘YOUTUBE’ 에서도 ‘버튜버’ (Virtual Youtuber) 라는 이름으로 활동하는 사람들의 수가 늘고 있는 오늘날 이러한 경쟁성 있는 기술에 능숙해 지는 것은 급변하는 소프트웨어 개발 시장에서 살아남을 수 있는 요소 중 하나라고 생각하기 때문에 facemesh 기술을 기반으로 한 웹캠 mask 인식 프로그램을 과제로 선정하였다.

## ii)과제 필요성  
 얼굴인식 그물망 모델링은 지속적인 발전을 거듭해 오늘날 다양한 분야에서 필수적인 요소로 사용되고 있다. 보험 금융 업계부터 시작해 의료 시설과 상업 시설, 스마트 홈 등등 21세기의 대표적인 기술로 불러도 어색함이 없을 정도이다.이런 시대적 배경에 앞서 본 연구에서는 다양한 얼굴인식 그물망 모델링을 적극적으로 활용하는 방향으로 팀 프로젝트를 진행하기로 했다. 
  얼굴 그물망 모델링을 사용한 가상 현실 가면은 메타버스의 AR 적인 부분과 접목시켜도 좋은 시너지를 낼 것으로 기대되며, 얼굴 인식 기술의 보안적인 부분을 보완할 것으로 기대된다. 

## iii) 과제 선택 동기 
 본 연구에서는다양하게 활용가능한 3d 그물망 모델링을 통한 얼굴 인식 및 가상가면 생성에 대해 탐구하였다. 얼굴인식 그물망 모델링은 오늘날 보안을 넘어서 의료, 스마트 홈, 외에도 블루오션 시장이라 불리는 VR이나 AR에서도 널리 사용되는 기술 중 하나이다. 동영상 미디어 플랫폼인 ‘YOUTUBE’ 에서는 사용자에 맞추어 디자인된 가상의 캐릭터와 사용자 모션 인식을 통해 ‘버얼 유튜버’(Virtual Youtuber) 라는 새로운 시장이 개척되기도 할 정도였다. 팀 ‘Blue Chip’ 은 이 점을 착안하여 사용자 얼굴의 각 부위와 모션을 인식하고, 각 부위 별로 이미지 및 캐릭터를 동적으로 할당하는 소프트웨어 프로그램에 대해 연구를 진행하게 되었다. 



# 3.과제 목표 및 내용



## i) 정량적/정성적 목표 (평가기준이 있으면 좋음)


이미지가 아닌 영상을 통해 동적으로 인식이 가능한가
인식과정 중 사용자의 얼굴 부분 중 빠뜨리는 부분은 없는가
가상 아바타가 제대로 동작하는가
예외 및 오류 등은 잘 처리되었는가

## ii) 과제의 내용

 콘텐츠 전송 네트워크(CDN.Content delivery network)와 MediaPipe 프레임 워크를 사용하여 브라우저에서 얼굴 랜드마크 감지를 허용하는 ml5 Facemesh 모델이 있다.이 모델을 이용하여 각 얼굴의 기하학을 설명하는 486개의 3D 얼굴 랜드마크를 받는다. 
 또한 모델을 이용하여 가상 현실에서의 가상 페이스 마스크 시스템을 구현하려고 한다. 가상 페이스 마스크 시스템의 주요 기능은 ‘얼굴 모양 변경(생성, 취소, 삭제)’,  ‘색상 변경’,  스크린샷, 데이터 재사용을 위한 ‘json파일 저장’ 이 있다.
 이러한 기능을 이용하여 사용자는 얼굴에 캐릭터 이미지 삽입하거나 시간에 따라 캐릭터가 바뀌도록 하는 등 사용자가 정교하게 커스터마이징 할 수 있을 것이다.



# 4. 결과물
## i) 프로그램 시현 모습
### With FaceMesh
![withFaceMesh](https://user-images.githubusercontent.com/75259783/170848006-1dad31d2-d990-4b6d-b18a-fcff19d0c76d.jpg)
### Without FaceMesh
![withoutFaceMesh](https://user-images.githubusercontent.com/75259783/170848008-1785dbc0-e105-44a6-988a-059778dd5b91.jpg)

## ii) s를 눌러 캡쳐 과정
### s 누를 시 화면
![Ctrl-S page](https://user-images.githubusercontent.com/75259783/170848004-147cc4a7-1e29-4994-a3b8-4cf89b166c43.jpg)
### 실제 스크린샷
![screenShot](https://user-images.githubusercontent.com/75259783/170848005-71df69c3-863f-41f3-891a-6dfc72e60cc0.png)

# 5. 기대효과 및 활용방안
- 사용자의 가상 아바타를 생성해 유튜브 AR플랫폼에서의 소통 시 활용됨
- AR을 활용한 게임에서의 사용자의 가상 얼굴 표현
- 소셜 미디어 플랫폼 기반 비디오 스트리밍 서비스
- 가면 꾸미기 같은 게임 구현 가능

# 6. 수행일정(도표)
![수행일정](https://user-images.githubusercontent.com/75259783/170848074-f6273938-db89-4f4f-82e3-6c79fe1e141a.png)

# 7. 참고문헌 및 자료 (멀티미디어 학회 양식 참고)

- [1] 기운 저, p5 자바스크립트와 ml5 머신러닝라이브러리, 2020년 12월 15일
- [2] Ivan Grishchenko, Artsiom Ablavatski, Yury Kartynnik, Karthik Raveendran, Matthias Grundmann, “Attention Mesh: High-fidelity Face Mesh Prediction in Real-time” Computer Vision and Pattern Recognition of Cornell University, 2020
- [3]Generating 3D Faces using Convolutional Mesh Autoencoders. https://openaccess.thecvf.com/content_ECCV_2018/html/Anurag_Ranjan_Generating_3D_Faces_ECCV_2018_paper.html. (accessed March 78, 2022).
- [4]MediaPipe Face Mesh.  https://google.github.io/mediapipe/solutions/face_mesh.html.  (accessed March 18, 2022).

# 8. 유튜브 영상

[![2022 C++ 5팀 팀프로젝트](https://youtu.be/fNhDcDRrdko.jpg)](https://youtu.be/fNhDcDRrdko=0s) 
