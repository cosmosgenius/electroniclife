import blessed from 'blessed';

import Wall from './wall';
import Critter from './critter';
import World from './world';

const plan = [
    '###########################',
    '#      #    #     o      ##',
    '#                         #',
    '#          #####          #',
    '##         #   #   ##     #',
    '###           ##    #     #',
    '#           ###     #     #',
    '#   ####                  #',
    '#   ##       o            #',
    '# o  #         o      ### #',
    '#    #                    #',
    '###########################'
];

const plan2 = [
    '#########################################################',
    '#      #    #     o      #   ######           o #  #    #',
    '#                                                       #',
    '#          #####                        #               #',
    '##         #   #   ##                   #               #',
    '###           ##    #                   #################',
    '#                   #                   #               #',
    '#     ##                                #               #',
    '#            o                                          #',
    '# o            o      ###                               #',
    '#                                ##                     #',
    '#                                ##                     #',
    '#                                                ########',
    '#                               o                #   o  #',
    '#######################                          #      #',
    '#                                                #      #',
    '#                                                #      #',
    '#                                                #      #',
    '#      ###           ##               ##                #',
    '#      ###           ##               ##                #',
    '#             o      ##       ##########                #',
    '#                    ##               ##                #',
    '#                    ##                                 #',
    '#                    ##               ##                #',
    '#########################################################'
];

const legend = {
    '#': Wall,
    'o': Critter
};

const wor = new World(plan2, legend);

const screen = blessed.screen({
    smartCSR: true
});

const box = blessed.box({
    top: 'center',
    left: 'center',
    width: wor.grid.width + 3,
    height: wor.grid.height + 2,
    content: wor.toString(),
    tags: true,
    border: {
        type: 'line'
    },
    style: {
        fg: 'white',
        bg: 'magenta',
        border: {
            fg: '#f0f0f0'
        },
        hover: {
            bg: 'green'
        }
    }
});
screen.append(box);

screen.key(['escape', 'q', 'C-c'], function() {
    return process.exit(0);
});

function startrender() {
    box.setContent(wor.toString());
    screen.render();
    render();
}

function render() {
    wor.turn();
    box.setContent(wor.toString());
    screen.render();
    setTimeout(render, 80);
}

startrender();
