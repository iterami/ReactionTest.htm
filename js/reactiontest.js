'use strict';

function div_color(){
    audio_start({
      'id': 'boop',
    });

    document.getElementById('box').style.background =
      '#'
      + (4 + random_integer(5))
      + (4 + random_integer(5))
      + (4 + random_integer(5));
}

function reset(){
    if(bests_reset()){
        document.getElementById('best').innerHTML = '';
    }
}

function start(){
    start_time = new Date().getTime();
    change_time = random_integer(9000) + 999;
    timer = window.setTimeout(
      div_color,
      change_time
    );

    document.getElementById('box').style.background = '#000';

    document.getElementById('start-button').onclick = stop;
    document.getElementById('start-button').value = 'Stop Timer [ESC]';
}

function stop(){
    if(timer !== 0){
        var final_time = -(change_time - (new Date().getTime() - start_time));
        clearTimeout(timer);

        if(final_time > 0){
            bests_update({
              'key': 'time',
              'value': final_time,
            });
            document.getElementById('best').innerHTML = '+' + bests_bests['time'] + 'ms';
        }

        document.getElementById('result').innerHTML = final_time > 0
          ? '+' + final_time + 'ms'
          : 'Too soon :(';
        timer = 0;
    }

    document.getElementById('start-button').onclick = start;
    document.getElementById('start-button').value = 'Start Timer [H]';
}

var change_time = 0;
var start_time = 0;
var timer = 0;

window.onload = function(e){
    bests_init({
      'bests': {
        'time': {
          'default': 0,
          'less': true,
        },
      },
      'prefix': 'ReactionTest.htm-',
    });
    input_init(
      {
        27: {
          'todo': stop,
        },
        72: {
          'todo': function(){
              stop();
              start();
          },
        },
      }
    );
    audio_init();
    audio_create({
      'id': 'boop',
      'properties': {
        'duration': .1,
        'volume': .1,
      },
    });

    // Setup best.
    if(bests_bests['time'] !== 0){
        document.getElementById('best').innerHTML = '+' + bests_bests['time'] + 'ms';
    }

    document.getElementById('reset').onclick = reset;
    document.getElementById('start-button').onclick = start;
};
