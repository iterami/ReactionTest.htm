'use strict';

function repo_escape(){
    stop();
}

function repo_init(){
    core_repo_init({
      'events': {
        'start-button': {
          'onclick': core_repo_reset,
        },
      },
      'globals': {
        'change_time': false,
        'running': true,
        'start_time': false,
      },
      'reset': function(){
          stop();
          start();

          if(core_menu_open){
              core_escape();
          }
      },
      'title': 'ReactionTest.htm',
    });
    audio_create({
      'audios': {
        'boop': {
          'duration': .1,
        },
      },
    });

    start();
}
