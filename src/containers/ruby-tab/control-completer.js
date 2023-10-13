import BaseCompleter from './base-completer';

class ControlCompleter extends BaseCompleter {
    getCompletions (editor, session, pos, prefix, callback) {
        const words = [
            {
                caption: 'sleep',
                value: 'sleep(1)',
                description: '(1) 秒待つ'
            },
            {
                caption: 'times',
                value: '10.times do\n\nend\n',
                description: '(10) 回繰り返す'
            },
            {
                caption: 'loop',
                value: 'loop do\n\nend\n',
                description: 'ずっと'
            },
            {
                caption: 'if',
                value: 'if false\n\nend\n',
                description: 'もし < > なら'
            },
            {
                caption: 'if-else',
                value: 'if false\n\nelse\n\nend\n',
                description: 'もし < > なら、でなければ'
            },
            {
                caption: 'wait-until',
                value: 'wait until false',
                description: '< > まで待つ'
            },
            {
                caption: 'until',
                value: 'until false\n\nend\n',
                description: '< > まで繰り返す'
            },
            {
                caption: 'stop-all',
                value: 'stop("all")',
                description: '[すべてを止める▼]'
            },
            {
                caption: 'stop-this',
                value: 'stop("this script")',
                description: '[このスクリプトを止める▼]'
            },
            {
                caption: 'stop-other',
                value: 'stop("other scripts in sprite")',
                description: '[スプライトの他のスクリプトを止める▼]'
            },
            {
                caption: 'when_start_as_a_clone',
                value: 'when_start_as_a_clone do\n\nend\n',
                description: 'クローンされたとき'
            },
            {
                caption: 'create_clone',
                value: 'create_clone("_myself_")',
                description: '(自分自身▼) のクローンを作る'
            },
            {
                caption: 'delete_this_clone',
                value: 'delete_this_clone',
                description: 'このクローンを削除する'
            }
        ];
        const completions = [];
        words.forEach(w => completions.push(w));
        callback(null, completions);
    }
}

export default ControlCompleter;
