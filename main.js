var canvas = new fabric.Canvas('game');
canvas.selection = false;
var lineHorOffset = 0;
var lineVerOffset = 0;
var rectPosX = 0;
var rectPosY = 0;

// Creation of clickable fields 

for(i=0;i<100;i++){
    if(i !== 0 && i%10 == 0) {
        rectPosX = 0;
        rectPosY += 100;
    }
    var rect = new fabric.Rect({
        width: 100,
        height: 100,
        top: rectPosX,
        left: rectPosY,
        fill: '#fbfcf2',
        selectable: false
    });
    canvas.add(rect);
    
    rectPosX += 100;
}

// Creation of line separators

for(i=0;i<11;i++){
    var lineX = new fabric.Line([0, 0, 1000, 0], {
        left: 0,
        top: lineVerOffset,
        stroke: '#eee',
        selectable: false
    });
    lineVerOffset += (1000 - 1) / 10;

    var lineY = new fabric.Line([0, 0, 0, 1000], {
        left: lineHorOffset,
        top: 0,
        stroke: '#eee',
        selectable: false
    });
    lineHorOffset += (1000 - 1) / 10;

    canvas.add(lineX);
    canvas.add(lineY);
}

// Creation of events

canvas.on('mouse:down', function(e) {
    var clickedObject = e.target;

    canvas.forEachObject(function(object) {
        if(clickedObject == object) {
            object.set('fill', '#276b68');
            object.evented = false;
        } else {
            object.set('fill', '#fbfcf2');
            object.evented = false;
        }
    });
});
