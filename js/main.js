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
