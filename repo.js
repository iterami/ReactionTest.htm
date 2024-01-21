'use strict';

function end_timer(){
    if(core_storage_data['audio']){
        audio_start({
          'id': 'boop',
        });
    }

    document.getElementById('box').style.backgroundColor = '#' + core_random_hex();
}

function repo_escape(){
    reset();
}

function repo_init(){
    core_repo_init({
      'events': {
        'start-button': {
          'onclick': start,
        },
      },
      'globals': {
        'change_time': false,
        'running': true,
        'start_time': false,
      },
      'storage': {
        'audio': true,
      },
      'storage-menu': '<table><tr><td><input id=audio type=checkbox><td>Audio</table>',
      'title': 'ReactionTest.htm',
    });
    audio_create({
      'audios': {
        'boop': {
          'duration': .1,
        },
      },
    });
}

function reset(){
    core_interval_pause_all();
    running = false;
    core_html_modify({
      'id': 'start-button',
      'properties': {
        'onclick': start,
        'textContent': 'Start Timer',
      },
    });
}

function start(){
    start_time = date_to_timestamp();
    running = true;
    change_time = core_random_integer({
      'max': 9000,
    }) + 999;
    core_interval_modify({
      'id': 'timer',
      'interval': change_time,
      'set': 'setTimeout',
      'todo': end_timer,
    });

    document.getElementById('box').style.backgroundColor = '#000';

    core_html_modify({
      'id': 'start-button',
      'properties': {
        'onclick': stop,
        'textContent': 'Stop Timer',
      },
    });
}

function stop(){
    if(!running){
        return;
    }

    reset();

    const final_time = -(change_time - (date_to_timestamp() - start_time));
    document.getElementById('result').textContent = final_time > 0
      ? '+' + final_time + 'ms'
      : 'Too soon!';
}
