import BaseCompleter from './base-completer';

class LooksCompleter extends BaseCompleter {
    getCompletions (editor, session, pos, prefix, callback) {
        const words = [
            {
                caption: 'say-for',
                value: 'say("こんにちは!", 2)',
                description: '(こんにちは!) と (2) 秒言う'
            },
            {
                caption: 'say',
                value: 'say("こんにちは!")',
                description: '(こんにちは!) と言う'
            },
            {
                caption: 'think-for',
                value: 'think("うーん...", 2)',
                description: '(うーん...) と (2) 秒考える'
            },
            {
                caption: 'think',
                value: 'think("うーん...")',
                description: '(うーん...) と考える'
            }
        ];
        const completions = [];
        words.forEach(w => completions.push(w));
        callback(null, completions);
    }
}

export default LooksCompleter;
