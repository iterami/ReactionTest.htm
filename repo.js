'use strict';

function end_timer(){
    audio_start('boop');
    core_elements.box.style.backgroundColor = '#' + core_random_hex();
}

function repo_escape(){
    audio_state_all(!core_menu_open);

    if(core_menu_open){
        reset();
    }
}

function repo_init(){
    core_repo_init({
      'events': {
        'start': {
          'onclick': start,
        },
      },
      'globals': {
        'change_time': 0,
        'start_time': 0,
      },
      'title': 'ReactionTest.htm',
      'ui_elements': [
        'box',
        'result',
        'start',
      ],
    });
}

function reset(){
    core_interval_lock_all();
    Object.assign(
      core_elements.start,
      {
        'onclick': start,
        'textContent': 'Start Timer',
      }
    );
}

function start(){
    core_escape(false);

    core_elements.box.style.backgroundColor = '#000';
    Object.assign(
      core_elements.start,
      {
        'onclick': stop,
        'textContent': 'Stop Timer',
      }
    );

    change_time = core_random_integer(9000) + 999;
    start_time = date_to_timestamp();
    core_interval_modify({
      'id': 'timer',
      'interval': change_time,
      'set': 'setTimeout',
      'todo': end_timer,
    });
}

function stop(){
    if(core_intervals.timer.paused){
        return;
    }

    reset();

    const final_time = -(change_time - (date_to_timestamp() - start_time));
    core_elements.result.textContent = final_time > 0
      ? '+' + final_time + 'ms'
      : 'Too soon!';
}
