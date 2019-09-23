var canvas = new fabric.Canvas('game');
canvas.selection = false;
var lineHorOffset = 0;
var lineVerOffset = 0;
var rectPosX = 0;
var rectPosY = 0;
var objectsClickedCount = 0;
var availableFields = 0;

// Creation of clickable fields 

for(let i=0;i<100;i++){
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

for(let i=0;i<11;i++){
    var lineX = new fabric.Line([0, 0, 1000, 0], {
        left: 0,
        top: lineVerOffset,
        stroke: '#eee',
        selectable: false,
        evented: false
    });
    lineVerOffset += (1000 - 1) / 10;

    var lineY = new fabric.Line([0, 0, 0, 1000], {
        left: lineHorOffset,
        top: 0,
        stroke: '#eee',
        selectable: false,
        evented: false
    });
    lineHorOffset += (1000 - 1) / 10;

    canvas.add(lineX);
    canvas.add(lineY);
}

// Creation of events

canvas.on('mouse:down', function(e) {
    var clickedObject = e.target;

    if(clickedObject !== null) {
        var coord = [
            {x: clickedObject.left, y: clickedObject.top - 300},
            {x: clickedObject.left + 200, y: clickedObject.top - 200},
            {x: clickedObject.left + 300, y: clickedObject.top},
            {x: clickedObject.left + 200, y: clickedObject.top + 200},
            {x: clickedObject.left, y: clickedObject.top + 300},
            {x: clickedObject.left - 200, y: clickedObject.top + 200},
            {x: clickedObject.left - 300, y: clickedObject.top},
            {x: clickedObject.left - 200, y: clickedObject.top - 200},
        ];
        objectsClickedCount++;
        availableFields = 0;
        
        canvas.forEachObject(function(object) {
            if(object.type == "rect") {
                if(clickedObject == object) {
                    object.set('fill', '#276b68');
                    object.evented = false;
                } else {
                    var exists = false;

                    for(let i=0; i<coord.length; i++) {
                        if(object.left == coord[i].x && object.top == coord[i].y){
                            exists = true;
                            break;
                        }
                    }
                    if(exists) {
                        if(!(object.get('fill') === '#276b68')) {
                            object.set('fill', '#d0d765');
                            object.evented = true;
                            availableFields++;
                        }
                    } else {
                        if(!(object.get('fill') === '#276b68')) {
                            object.set('fill', '#fbfcf2');
                            object.evented = false;
                        }
                    }
                }
            }
        });

        if(availableFields == 0) {
            if(objectsClickedCount == 100) {
                var endgame = confirm("You Won! Do you want to play another game?");
                if(endgame == true) {
                    window.location.reload();
                }
            }
            else {
                var endgame = confirm("End Game! Do you want to play another game?");
                if(endgame == true) {
                    window.location.reload();
                }
            }
        }
    }
});
