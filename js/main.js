'use strict';

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
