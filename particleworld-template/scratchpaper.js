function setup() {
    createCanvas(800, 600)
}
function draw() {
    background(0)
    fill('grey')
    beginShape()
    curveVertex(350, 125)
    curveVertex(350, 125)
    curveVertex(340,150)
    curveVertex(330,200)
    curveVertex(300,200)
    curveVertex(315,250)
    curveVertex(290,250)
    curveVertex(305,275)

    curveVertex(280,290)
    
    curveVertex(295,325)
    curveVertex(270,350)
    curveVertex(285,375)
    curveVertex(230,400)//260
    curveVertex(255,425)
    curveVertex(235, 450)

    curveVertex(210,450)
    curveVertex(200,480)
    curveVertex(190,460)
    curveVertex(180,480)
    curveVertex(170,470)
    curveVertex(160,480)
    curveVertex(150,480)
    curveVertex(140,490)
    curveVertex(130,490)
    curveVertex(120,490)
    curveVertex(101,500)
    curveVertex(100,500)
    // curveVertex(90,510)
    // curveVertex(80,500)
    // curveVertex(70,520)
    // curveVertex(50,530)


    curveVertex(20, 530)
    curveVertex(250, 510)

    curveVertex(350, 450)
    curveVertex(380, 400)
    curveVertex(430, 270)
    curveVertex(420, 180)
    curveVertex(420, 180)
    endShape()
    //头
    beginShape()
    curveVertex(350,125)
    curveVertex(350,125)
    curveVertex(390,110)
    curveVertex(420,120)
    curveVertex(430,140)
    curveVertex(420, 180)
    curveVertex(420, 180)
    endShape()
    //mouth
    beginShape()
    curveVertex(410,140)
    curveVertex(410,140)
    curveVertex(440,140)
    curveVertex(437,159)
    curveVertex(410,160)
    curveVertex(410,160)
    endShape()
    beginShape()
    curveVertex(410,160)
    curveVertex(410,160)

    curveVertex(430,180)
    curveVertex(410,179)
    curveVertex(410,179)

    endShape()
    //eye
    triangle(395,130,398,135,420,140)
    //legs
    beginShape()
    curveVertex(300,425)
    curveVertex(300,425)
    curveVertex(330,410)
    curveVertex(370,435)
    curveVertex(370,600)
    curveVertex(300,590)
    curveVertex(300,590)

    endShape(CLOSE)
    //arm
    beginShape()
    curveVertex(330,300)
    curveVertex(330,300)

    curveVertex(440,450)
    curveVertex(445,430)
    curveVertex(420,340)
    curveVertex(390,260)
    curveVertex(380,275)
    curveVertex(380,275)
    endShape(CLOSE)

}
