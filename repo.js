'use strict';

function end_timer(){
    if(core_storage_data['audio']){
        audio_start('boop');
    }

    core_elements['box'].style.backgroundColor = '#' + core_random_hex();
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
        'start_time': false,
      },
      'storage': {
        'audio': true,
      },
      'storage-menu': '<table><tr><td><input id=audio type=checkbox><td>Audio</table>',
      'title': 'ReactionTest.htm',
      'ui-elements': [
        'box',
        'result',
        'start-button',
      ],
    });
}

function reset(){
    core_interval_pause_all();
    Object.assign(
      core_elements['start-button'],
      {
        'onclick': start,
        'textContent': 'Start Timer',
      }
    );
}

function start(){
    start_time = date_to_timestamp();
    change_time = core_random_integer(9000) + 999;
    core_interval_modify({
      'id': 'timer',
      'interval': change_time,
      'set': 'setTimeout',
      'todo': end_timer,
    });

    core_elements['box'].style.backgroundColor = '#000';

    Object.assign(
      core_elements['start-button'],
      {
        'onclick': stop,
        'textContent': 'Stop Timer',
      }
    );
}

function stop(){
    if(core_intervals['timer']['paused']){
        return;
    }

    reset();

    const final_time = -(change_time - (date_to_timestamp() - start_time));
    core_elements['result'].textContent = final_time > 0
      ? '+' + final_time + 'ms'
      : 'Too soon!';
}
