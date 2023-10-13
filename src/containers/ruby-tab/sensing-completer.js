import BaseCompleter from './base-completer';

class SensingCompleter extends BaseCompleter {
    getCompletions (editor, session, pos, prefix, callback) {
        const words = [
            {
                caption: 'touching?',
                value: 'touching?("_mouse_")',
                description: '(マウスのポインター▼) に触れた'
            },
            {
                caption: 'touching_color?',
                value: 'touching_color?("#571332")',
                description: '(#571332▼) 色に触れた'
            },
            {
                cation: 'color_is_touching_color?',
                value: 'color_is_touching_color?("#ce2ef7", "#6a7a0e")',
                description: '(#ce2ef7▼) 色が (#6a7a0e▼) 色に触れた'
            },
            {
                caption: 'distance',
                value: 'distance("_mouse_")',
                description: '(マウスのポインター▼) までの距離'
            },
            {
                caption: 'ask',
                value: 'ask("あなたの名前は何ですか?")',
                description: '(あなたの名前は何ですか？) と聞いて待つ'
            },
            {
                value: 'answer',
                description: '答え'
            },
            {
                value: 'Keyboard.pressed?("space")',
                description: 'スペースキーが押された'
            },
            {
                value: 'Mouse.down?',
                description: 'マウスが押された'
            },
            {
                value: 'Mouse.x',
                description: 'マウスのx座標'
            },
            {
                value: 'Mouse.y',
                description: 'マウスのy座標'
            },
            {
                value: 'self.drag_mode = "draggable"',
                description: 'ドラッグできるようにする'
            },
            {
                value: 'loudness',
                description: '音量'
            },
            {
                value: 'Timer.value',
                description: 'タイマー'
            },
            {
                value: 'Timer.reset',
                description: 'タイマーをリセット'
            },
            {
                value: 'stage.backdrop_number',
                description: 'ステージの背景#'
            },
            {
                value: 'stage.backdrop_number',
                description: 'ステージの背景#'
            },
            {
                value: 'Time.now.year',
                description: '現在の年'
            },
            {
                value: 'days_since_2000',
                description: '2000年からの日数'
            },
            {
                value: 'user_name',
                description: 'ユーザー名'
            }
        ];
        const completions = [];
        words.forEach(w => completions.push(w));
        callback(null, completions);
    }
}

export default SensingCompleter;
