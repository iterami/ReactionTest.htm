'use strict';

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
      'events': {
        'start-button': {
          'onclick': start,
        },
      },
      'globals': {
        'change_time': 0,
        'start_time': 0,
        'timer': 0,
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

    core_storage_update();
}
