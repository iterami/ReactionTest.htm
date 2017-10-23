'use strict';

function div_color(){
    core_audio_start({
      'id': 'boop',
    });

    document.getElementById('box').style.background = '#' + core_random_hex();
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

    core_html_modify({
      'id': 'start-button',
      'properties': {
        'onclick': stop,
        'value': 'Stop Timer [ESC]',
      },
    });
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

    core_html_modify({
      'id': 'start-button',
      'properties': {
        'onclick': start,
        'value': 'Start Timer [H]',
      },
    });
}
