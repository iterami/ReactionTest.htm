function get(i){
    return document.getElementById(i)
}
function random_number(i){
    return Math.floor(Math.random()*i)
}
function reset(){
    if(confirm('Reset best?')){
        ls.removeItem('reactiontest-best');
        get('best').innerHTML=''
    }
}
function start(){
    start_time=new Date().getTime();
    change_time=999+random_number(9000);
    get('thediv').style.background='#fff';
    timer=setTimeout("get('thediv').style.background='#'+(4+random_number(5))+''+(4+random_number(5))+''+(4+random_number(5))",change_time);
    get('start_button').value='Click when the Color Changes (ESC)';
    get('start_button').onclick=function(){stop()}
}
function stop(){
    if(timer!=0){
        i=-(change_time-(new Date().getTime()-start_time));
        clearTimeout(timer);
        if(i>0&&(best==0||i<best)){
            best=i;
            ls.setItem('reactiontest-best',best);
            get('best').innerHTML='+'+best+'ms'
        }
        get('result').innerHTML=i>0?'+'+i+'ms':'Too soon :(';
        timer=0
    }
    get('start_button').value='Start Timer (H)';
    get('start_button').onclick=function(){start()}
}
var best=change_time=i=start_time=timer=0,
ls=window.localStorage;

if(ls.getItem('reactiontest-best')!==null){
    best=ls.getItem('reactiontest-best');
    get('best').innerHTML='+'+best+'ms'
}

window.onkeydown=function(e){
    i=window.event?event:e;
    i=i.charCode?i.charCode:i.keyCode;
    if(i==72){/*H*/
        stop();
        start()
    }else if(i==27){/*ESC*/
        stop()
    }
}
