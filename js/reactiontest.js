'use strict';

function div_color(){
    core_audio_start({
      'id': 'boop',
    });

    document.getElementById('box').style.background = '#' + core_random_hex();
}

function repo_escape(){
    stop();
}

function repo_init(){
    core_repo_init({
      'audios': {
        'boop': {
          'duration': .1,
        },
      },
      'keybinds': {
        72: {
          'todo': function(){
              stop();
              start();
          },
        },
      },
      'storage': {
        'time': {
          'default': 99999999,
          'type': -1,
        },
      },
      'title': 'ReactionTest.htm',
    });

    document.getElementById('start-button').onclick = start;

    core_storage_update();
}

function start(){
    start_time = time_date_to_timestamp();
    change_time = core_random_integer({
      'max': 9000,
    }) + 999;
    timer = window.setTimeout(
      div_color,
      change_time
    );

    document.getElementById('box').style.background = '#000';

    var element = document.getElementById('start-button');
    element.onclick = stop;
    element.value = 'Stop Timer [ESC]';
}

function stop(){
    if(timer !== 0){
        var final_time = -(change_time - (time_date_to_timestamp() - start_time));
        clearTimeout(timer);

        if(final_time > 0){
            core_storage_data['time'] = final_time;
            core_storage_save();
            core_storage_update();
        }

        document.getElementById('result').innerHTML = final_time > 0
          ? '+' + final_time + 'ms'
          : 'Too soon :(';
        timer = 0;
    }

    var element = document.getElementById('start-button');
    element.onclick = start;
    element.value = 'Start Timer [H]';
}

var change_time = 0;
var start_time = 0;
var timer = 0;
