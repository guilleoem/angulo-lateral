var inc; //guarda el cambio en los controles (incremento o decremento)

var sldho = document.getElementById("sldho");
var sldBase=document.getElementById("sldBase");
var sldAltura=document.getElementById("sldAltura");
var sldtz=document.getElementById("sldtz");
var sldF=document.getElementById("sldF");

var txtho = document.getElementById("txtho");
var txtBase=document.getElementById("txtBase");
var txtAltura=document.getElementById("txtAltura");
var txttz=document.getElementById("txttz");
var txtF=document.getElementById("ZoomF");

sldho.oninput=function(){

    txtho.value=sldho.value;
    calc();
    render();
}
txtho.onchange= function(){

    sldho.value = txtho.value;
    txtho.blur();
    calc();
    render();
}
sldBase.oninput=function(){

    txtBase.value=sldBase.value;
    calc();
    render();
}
txtBase.onchange= function(){

    sldBase.value = txtBase.value;
    txtBase.blur();
    calc();
    render();
}
sldAltura.oninput=function(){

    txtAltura.value=sldAltura.value;
    calc();
    render();
}
txtAltura.onchange= function(){

    sldAltura.value = txtAltura.value;
    txtAltura.blur();
    calc();
    render();
}
sldtz.oninput=function(){

    txttz.value=sldtz.value;
    calc();
    render();
}
txttz.onchange= function(){
 
    sldtz.value = txttz.value;
    txttz.blur();
    calc();
    render();
}
sldF.oninput=function(){
    txtF.value=sldF.value;
    render(objects, dx, dy);
}
txtF.onchange= function(){
    sldF.value = txtF.value;
    txtF.blur();
    render();
}



//rotate cam
var sldrcx=document.getElementById("sldrcx");
var sldrcy=document.getElementById("sldrcy");
var sldrcz=document.getElementById("sldrcz");

var txtrcx=document.getElementById("txtrcx");
var txtrcy=document.getElementById("txtrcy");
var txtrcz=document.getElementById("txtrcz");

sldrcx.oninput=function(){
    inc=parseFloat(sldrcx.value)-parseFloat(txtrcx.value);
    txtrcx.value=sldrcx.value;
    rotate_camX(inc);
    render();
}
txtrcx.onchange= function(){
    inc=parseFloat(txtrcx.value)-parseFloat(sldrcx.value);
    sldrcx.value = txtrcx.value;
    txtrcx.blur();
    rotate_camX(inc);
    render();
}
sldrcy.oninput=function(){
    inc=parseFloat(sldrcy.value)-parseFloat(txtrcy.value);
    txtrcy.value=sldrcy.value;
    rotate_camY(inc);
    render();
}
txtrcy.onchange= function(){
    inc=parseFloat(txtrcy.value)-parseFloat(sldrcy.value);
    sldrcy.value = txtrcy.value;
    txtrcy.blur();
    rotate_camY(inc);
    render();
}
sldrcz.oninput=function(){
    inc=parseFloat(sldrcz.value)-parseFloat(txtrcz.value);
    txtrcz.value=sldrcz.value;
    rotate_camZ(inc);
    render();
}
txtrcz.onchange= function(){
    inc=parseFloat(txtrczy.value)-parseFloat(sldrcz.value);
    sldrcz.value = txtrcz.value;
    txtrcz.blur();
    rotate_camZ(inc);
    render();
}

