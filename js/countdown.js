var endTime=new Date();
endTime.setTime(endTime.getTime()+3600*1000);
var currentShowTimeSeconds=0;

var balls=[];
const colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload=function(){
    window_width=document.body.clientWidth||window.innerWidth||document.documentElement.clientWidth;
    window_height=document.body.clientHeight||window.innerHeight||document.documentElement.clientHeight;

    margin_left=Math.round(window_width/10);
    radius=Math.round(window_width*4/5/108)-1;

    margin_top=Math.round(window_height/5);

    var canvas=document.querySelector("#canvas");
    var context=canvas.getContext("2d");

    canvas.width=window_width;
    canvas.height=window_height;

    currentShowTimeSeconds=getCurrentShowTimeSeconds();

    setInterval(function(){
        render(context);
        update();
    },50);
}
function update(){
    var nextShowTimeSeconds=getCurrentShowTimeSeconds();

    var nextHours=parseInt(nextShowTimeSeconds/3600);
    var nextMinute=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    var nextSeconds=nextShowTimeSeconds%60;

    var currentHours=parseInt(currentShowTimeSeconds/3600);
    var currentMinute=parseInt((currentShowTimeSeconds-currentHours*3600)/60);
    var currentSeconds=currentShowTimeSeconds%60;

    if(nextSeconds!=currentSeconds){
        if(parseInt(currentHours/10)!=parseInt(nextHours/10)){
            addBalls(margin_left,margin_top,parseInt(currentHours/10));
        }
        if(parseInt(currentHours%10)!=parseInt(nextHours%10)){
            addBalls(margin_left+15*(radius+1),margin_top,parseInt(currentHours%10));
        }

        if(parseInt(currentMinute/10)!=parseInt(nextMinute/10)){
            addBalls(margin_left+39*(radius+1),margin_top,parseInt(currentMinute/10));
        }
        if(parseInt(currentMinute%10)!=parseInt(nextMinute%10)){
            addBalls(margin_left+54*(radius+1),margin_top,parseInt(currentMinute%10));
        }

        if(parseInt(currentSeconds/10)!=parseInt(nextSeconds/10)){
            addBalls(margin_left+78*(radius+1),margin_top,parseInt(currentSeconds/10));
        }
        if(parseInt(currentSeconds%10)!=parseInt(nextSeconds%10)){
            addBalls(margin_left+93*(radius+1),margin_top,parseInt(currentSeconds%10));
        }

        currentShowTimeSeconds=nextShowTimeSeconds;
    }
    updateBalls();
}
function updateBalls(){
    for(var i=0;i<balls.length;i++){
        balls[i].x+=balls[i].vx;
        balls[i].y+=balls[i].vy;
        balls[i].vy+=balls[i].g;

        if(balls[i].y>=window_height-radius){
            balls[i].y=window_height-radius;
            balls[i].vy=-balls[i].vy*0.75;
        }
    }
    var count=0;
    for(var i=0;i<balls.length;i++){
        if(balls[i].x+radius>0&&balls[i].x-radius<window_width){
            balls[count++]=balls[i];
        }
    }
    while(balls.length>Math.min(300,count)){
        balls.pop();
    }
}
function addBalls(x,y,num){
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                var aBall={
                    x:x+j*2*(radius+1)+(radius+1),
                    y:y+i*2*(radius+1)+(radius+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)]
                }
                balls.push(aBall);
            }
        }
    }
}
function getCurrentShowTimeSeconds(){
    var currentTime=new Date();
    var returnTime=endTime.getTime()-currentTime.getTime();
    returnTime=Math.round(returnTime/1000);
    return returnTime>=0?returnTime:0;
}
//时钟效果
// function getCurrentShowTimeSeconds(){
//     var currentTime=new Date();
//     var returnTime=currentTime.getHours()*3600+currentTime.getMinutes()*60+currentTime.getSeconds();
//     return returnTime;
// }
function render(context){
    context.clearRect(0,0,window_width,window_height);

    var hours=parseInt(currentShowTimeSeconds/3600);
    var minute=parseInt((currentShowTimeSeconds-hours*3600)/60);
    var seconds=currentShowTimeSeconds%60;

    renderDigit(margin_left,margin_top,parseInt(hours/10),context);
    renderDigit(margin_left+15*(radius+1),margin_top,parseInt(hours%10),context);
    renderDigit(margin_left+30*(radius+1),margin_top,10,context);
    renderDigit(margin_left+39*(radius+1),margin_top,parseInt(minute/10),context);
    renderDigit(margin_left+54*(radius+1),margin_top,parseInt(minute%10),context);
    renderDigit(margin_left+69*(radius+1),margin_top,10,context);
    renderDigit(margin_left+78*(radius+1),margin_top,parseInt(seconds/10),context);
    renderDigit(margin_left+93*(radius+1),margin_top,parseInt(seconds%10),context);

    for(var i=0;i<balls.length;i++){
        context.fillStyle=balls[i].color;
        context.beginPath();
        context.arc(balls[i].x,balls[i].y,radius,0,2*Math.PI,true);
        context.closePath();
        context.fill();
    }
}
function renderDigit(x,y,num,context){
    context.fillStyle="rgb(0,102,153)";
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                context.beginPath();
                context.arc(x+j*2*(radius+1)+(radius+1),y+i*2*(radius+1)+(radius+1),radius,0,2*Math.PI);
                context.closePath();
                context.fill();
            }
        }
    }
}
