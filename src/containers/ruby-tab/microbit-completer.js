import BaseCompleter from './base-completer';

class MicrobitCompleter extends BaseCompleter {
    getCompletions (editor, session, pos, prefix, callback) {
        const words = [
            {
                caption: 'microbit.when_button_pressed',
                value: 'microbit.when_button_pressed("A") do\n\nend\n',
                description: 'ボタン (A▼) が押されたとき'
            },
            {
                caption: 'microbit.button_pressed?',
                value: 'microbit.button_pressed?("A")',
                description: 'ボタン (A▼) が押された'
            },
            {
                caption: 'microbit.when',
                value: 'microbit.when("moved") do\n\nend\n',
                description: '(動いた▼) とき'
            },
            {
                caption: 'microbit.display_text',
                value: 'microbit.display_text("こんにちは!")',
                description: '(こんにちは!) を表示する'
            },
            {
                caption: 'microbit.display',
                value: 'microbit.display(\n  ".1.1.",\n  "1.1.1",\n  "1...1",\n  ".1.1.",\n  "..1.."\n)\n',
                description: '(♡▼) を表示する'
            },
            {
                caption: 'microbit.when_tilted',
                value: 'microbit.when_tilted("any") do\n\nend\n',
                description: '(どれかの向き▼) に傾いたとき'
            },
            {
                caption: 'microbit.tilted?',
                value: 'microbit.tilted?("any")',
                description: '(どれかの向き▼) に傾いた'
            },
            {
                caption: 'microbit.tilt_angle',
                value: 'microbit.tilt_angle("front")',
                description: '(前▼) 方向の傾き'
            },
            {
                caption: 'microbit.when_pin_connected',
                value: 'microbit.when_pin_connected(0) do\n\nend\n',
                description: 'ピン (0▼) がつながったとき'
            }
        ];
        const completions = [];
        words.forEach(w => completions.push(w));
        callback(null, completions);
    }
}

export default MicrobitCompleter;
