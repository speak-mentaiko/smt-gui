import BaseCompleter from './base-completer';

class EventsCompleter extends BaseCompleter {
    getCompletions (editor, session, pos, prefix, callback) {
        const words = [
            {
                caption: 'when_flag_clicked',
                value: 'when_flag_clicked do\n\nend\n',
                description: '旗が押されたとき'
            },
            {
                caption: 'when_key_pressed',
                value: 'when_key_pressed("space") do\n\nend\n',
                description: '[スペース▼] キーが押されたとき'
            },
            {
                caption: 'when_clicked',
                value: 'when_clicked do\n\nend\n',
                description: 'このスプライトが押されたとき'
            },
            {
                caption: 'when_backdrop_switches',
                value: 'when_backdrop_switches("背景1") do\n\nend\n',
                description: '背景が [背景1▼] になったとき'
            },
            {
                caption: 'when_greater_than',
                value: 'when_greater_than("loudness", 10) do\n\nend\n',
                description: '[音量▼] > (10) のとき'
            },
            {
                caption: 'when_receive',
                value: 'when_receive("メッセージ1") do\n\nend\n',
                description: '[メッセージ1▼] を受け取ったとき'
            },
            {
                caption: 'broadcast',
                value: 'broadcast("メッセージ1")',
                description: '(メッセージ1) を送る'
            },
            {
                caption: 'broadcast_and_wait',
                value: 'broadcast_and_wait("メッセージ1")',
                description: '(メッセージ1) を送って待つ'
            }
        ];
        const completions = [];
        words.forEach(w => completions.push(w));
        callback(null, completions);
    }
}

export default EventsCompleter;
