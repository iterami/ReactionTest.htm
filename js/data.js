'use strict';

function div_color(){
    audio_start({
      'id': 'boop',
    });

    document.getElementById('box').style.background = '#' + core_random_hex();
}

function start(){
    running = true;
    start_time = core_date_to_timestamp();
    change_time = core_random_integer({
      'max': 9000,
    }) + 999;
    core_interval_modify({
      'clear': 'clearTimeout',
      'id': 'timer',
      'interval': change_time,
      'set': 'setTimeout',
      'todo': div_color,
    });

    document.getElementById('box').style.background = '#000';

    core_html_modify({
      'id': 'start-button',
      'properties': {
        'onclick': stop,
        'value': 'Stop Timer [ESC]',
      },
    });
}

function stop(){
    if(!running){
        return;
    }

    running = false;
    let final_time = -(change_time - (core_date_to_timestamp() - start_time));
    core_interval_pause_all();

    document.getElementById('result').innerHTML = final_time > 0
      ? '+' + final_time + 'ms'
      : 'Too soon!';

    core_html_modify({
      'id': 'start-button',
      'properties': {
        'onclick': start,
        'value': 'Start Timer [H]',
      },
    });
}
