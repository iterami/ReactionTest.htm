function div_color(){
    get('thediv').style.background = '#' + (4 + random_number(5)) + (4 + random_number(5)) + (4 + random_number(5));
}

function get(i){
    return document.getElementById(i);
}

function random_number(i){
    return Math.floor(Math.random() * i);
}

function reset(){
    if(confirm('Reset best?')){
        window.localStorage.removeItem('reactiontest-best');
        get('best').innerHTML = '';
    }
}

function start(){
    start_time = new Date().getTime();
    change_time = 999 + random_number(9000);
    timer = setTimeout('div_color()', change_time);

    get('thediv').style.background = '#fff';

    get('start_button').value = 'Click when the Color Changes (ESC)';
    get('start_button').onclick = function(){
        stop();
    };
}

function stop(){
    if(timer !== 0){
        var i = -(change_time - (new Date().getTime() - start_time));
        clearTimeout(timer);

        if(i > 0 && (best === 0 || i < best)){
            best = i;
            window.localStorage.setItem(
                'reactiontest-best',
                best
            );
            get('best').innerHTML = '+' + best + 'ms';
        }

        get('result').innerHTML = i > 0 ? '+' + i + 'ms' : 'Too soon :(';
        timer = 0;
    }

    get('start_button').value = 'Start Timer (H)';
    get('start_button').onclick = function(){
        start();
    };
}

var best = 0;
var change_time = 0;
var start_time = 0;
var timer = 0;

// fetch best from localStorage, if it exists
if(window.localStorage.getItem('reactiontest-best') !== null){
    best = window.localStorage.getItem('reactiontest-best');
    get('best').innerHTML = '+' + best + 'ms';
}

window.onkeydown = function(e){
    var key = window.event ? event : e;
    key = key.charCode ? key.charCode : key.keyCode;

    if(key === 72){// H
        stop();
        start();

    }else if(key === 27){// ESC
        stop();
    }
}
