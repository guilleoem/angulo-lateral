const RT = 6371000;
var objetivo;
var objects = [];


function formatGMS(ang){
    var g, m, s, gms;
    var neg=false;

    if (ang<0){
        neg=true;
        ang=-1*ang;
    }
    g=Math.trunc(ang);
    ang= (ang-g)*60;
    m=Math.trunc(ang);
    s=(ang-m)*60;
    s=s.toFixed(2);
    gms=g + String.fromCharCode(176)+" "+m+"' "+s+'"';
    if (neg){gms="-"+gms};
    return gms;
}

function calc(){
    var drb,dvb,dve,tilt,drop,distProy,hProy,dif;

    var ho = parseFloat(txtho.value);
    var dist = parseFloat(txttz.value);
    tilt = dist/RT;
    var base = parseFloat(txtBase.value);
    var altura = parseFloat(txtAltura.value);

    dvb = Math.sqrt(Math.pow(RT,2)+Math.pow((RT+ho),2)-2*RT*(RT+ho)*Math.cos(tilt));

    dve = Math.sqrt(Math.pow((RT+altura),2)+Math.pow((RT+ho),2)-2*(RT+altura)*(RT+ho)*Math.cos(tilt));
    drb = RT * Math.sqrt(2*(1-Math.cos(tilt)));
    drop = RT*(1-Math.cos(tilt));

    hProy = Math.cos(tilt)*altura;
    dif = Math.sin(tilt)*altura;

    distProy = Math.sqrt(Math.pow(drb,2)-Math.pow(drop,2));

    originVertices[0] = new Vertex3D(-base/2, -drop-ho, distProy,1);
    originVertices[1] = new Vertex3D(base/2, -drop-ho, distProy,1);
    originVertices[2] = new Vertex3D(base/2, (hProy-drop)-ho, distProy+dif,1);
    originVertices[3] = new Vertex3D(-base/2, (hProy-drop)-ho, distProy+dif,1);

    objetivo = new faceObject(originVertices);

 
    objects[0]=objetivo;



}