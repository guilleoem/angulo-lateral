class Vertex3D {
    constructor(x, y, z, w) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.z = parseFloat(z);
        this.w = parseFloat(w);
    }
}

class Vertex2D {
    constructor(x, y) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
    }
}

var originVertices = [];
var vertices = [];
var projectedVertices = [];
//-----------------------------------------------------------------------------
//-------------------------------Matrix---------------------------------
//-----------------------------------------------------------------------------



function matMul(A,B){
    var C = [];
    var nfil = A.length, ncol = B[0].length;
    for (var i = 0; i < nfil; i++){
        C[i] = new Array(4);
        for (var j = 0; j < ncol; j++){
            C[i][j] = 0;
            for (var k = 0; k < ncol; k++){
                C[i][j] = C[i][j] + (A[i][k] * B[k][j]);
            }
        }
    }
    return C;
}

//-----------------------------------------------------------------------------
//-------------------------------Objects constructors---------------------------------
//-----------------------------------------------------------------------------


class faceObject {
    constructor(originVertices) {


        this.vertices = originVertices;
        

        this.faces = [
            [this.vertices[0], this.vertices[1],this.vertices[2], this.vertices[3]]
        ];

        this.composTMatrix = [[1,0,0,0],
                                [0,1,0,0],
                                [0,0,1,0],
                                [0,0,0,1]
        ];
    }
}



//-----------------------------------------------------------------------------
//-------------------------------Transformations---------------------------------
//-----------------------------------------------------------------------------
var transformation=[];

function transformPoint(P,M){
    var pvector =[[]];
    pvector[0]=[P.x,P.y,P.z,P.w];
    //console.log("vector punto: ");console.log(pvector);
    pvector = matMul(pvector,M);
    //console.log("vector punto multiplicado: ");console.log(pvector);
    return new Vertex3D(pvector[0][0],pvector[0][1],pvector[0][2],pvector[0][3]);
}   

function project(M) {
 
    //relación entre el tamaño del canvas y el tamaño del sensor
    //canvas 640x480, sensor 36x24(35 mm full frame) = 20
    var f=parseFloat(sldF.value)*20;

    var px,py;
    if (M.z<=0){
        px = f;
    } else {
        px = f/ M.z;
    }

    return new Vertex2D(px * M.x, px * M.y);
}


function rotate_camX(rcx){
    rcx = -rcx * Math.PI/180;
    transformation = [[1,0,0,0],
                        [0,Math.cos(rcx),-Math.sin(rcx),0],
                        [0,Math.sin(rcx),Math.cos(rcx),0],
                        [0,0,0,1]];
    objects[0].composTMatrix=matMul(objects[0].composTMatrix,transformation);
}
function rotate_camY(rcy){
    rcy = rcy * Math.PI/180;
    transformation = [[Math.cos(rcy),0,Math.sin(rcy),0],
                        [0,1,0,0],
                        [-Math.sin(rcy),0,Math.cos(rcy),0],
                        [0,0,0,1]];
    objects[0].composTMatrix=matMul(objects[0].composTMatrix,transformation);
}
function rotate_camZ(rcz){
    rcz = rcz * Math.PI/180;
    transformation = [[Math.cos(rcz),-Math.sin(rcz),0,0],
                        [Math.sin(rcz),Math.cos(rcz),0,0],
                        [0,0,1,0],
                        [0,0,0,1]];
    objects[0].composTMatrix=matMul(objects[0].composTMatrix,transformation);
}



//-----------------------------------------------------------------------------
//-------------------------------Render engine---------------------------------
//-----------------------------------------------------------------------------
var V;
function render() {
    var P = [];
    vertices = [];
    projectedVertices = [];

    var difx,dify,angW;
    // Clear canvas
    ctx.clearRect(0, 0, 2*dx, 2*dy);
        
    //objects style
    ctx.strokeStyle = 'rgba(0, 0, 255,0.1)';
    ctx.fillStyle = 'rgba(40,40, 40,0.5)';
    
    // For each object
    for (var i = 0, n_obj = objects.length; i < n_obj; ++i) {
        
        //objects style
        ctx.strokeStyle = objects[i].strkeStyle;
        var faces = objects[i].faces;

        // For each face    
        for (var j = 0; j < faces.length; ++j) {    
            // Current face
            var face = faces[j];
            // Draw the first Vertex3D
            P = face[0];//console.log("Punto asignado:");console.log(P);
            P = transformPoint(P, objects[i].composTMatrix);//console.log("Punto transformado:");console.log(P);
            vertices[j] = new Vertex3D(P.x,P.y,P.z);
            P = project(P); //console.log("Punto proyectado:");console.log(P);
            projectedVertices[j] = new Vertex2D(P.x,P.y);  
            ctx.beginPath();
            ctx.moveTo(P.x + dx, -P.y + dy);
            
            // Draw the other vertices
            for (var k = 1, n_vertices = face.length; k < n_vertices; ++k) {

                P = face[k];

                
                //P = transform(P, objects[i].center);
                P = transformPoint(P, objects[i].composTMatrix);
                vertices[j+k] = new Vertex3D(P.x,P.y,P.z);
                P = project(P);
                projectedVertices[j+k] = new Vertex2D(P.x,P.y);
                ctx.lineTo(P.x + dx, -P.y + dy);
            }

            // Close the path and draw the face
            
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }
    }
    //data
    
    
    ctx.clearRect(1000,0,1200,480);
    ctx.fillStyle = 'rgba(0,255, 255)';
    ctx.fillRect(1000,0,1200,480);

    ctx.fillStyle="black";
    ctx.fillText("vértices transformados",900,10);

    difx = projectedVertices[3].x -  projectedVertices[0].x;
    dify = projectedVertices[3].y -  projectedVertices[0].y;
    angW = Math.atan(difx/dify);
    
    var line = 0;
    var tf = 2;
    for (var i=line; i < vertices.length; i++){
        P = vertices[i];
        ctx.fillText("x: " + P.x.toFixed(tf) + " , y: " + P.y.toFixed(tf) + " , z: " + P.z.toFixed(tf),900,(i+1)*10+10);
        line = i;
    }

    ctx.fillText("vértices proyectados",900,(line+5)*10);
    for (var i=0; i < projectedVertices.length; i++){
        P = projectedVertices[i];
        ctx.fillText("x: " + P.x + "    y: " + P.y,900,(i+line+5)*10+10);
    }

    ctx.fillText("ángulo lateral: " + angW*180/Math.PI,900,150);
    ctx.fillText("ángulo lateral (GMS): " + formatGMS(angW*180/Math.PI),900,160);
}

//-----------------------------------------------------------------------------
//-------------------------------Code---------------------------------
//-----------------------------------------------------------------------------
 var transformedVertices = [];
 var canvas = document.getElementById('graph');
 var dx = (canvas.width) / 2;
 var dy = canvas.height / 2;
 var constObjects=[];
 // Objects style
 var ctx = canvas.getContext('2d');
 
 
 // Create the objetcs

 calc();
 // First render
 render();
 
 
