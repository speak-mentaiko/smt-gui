import BaseCompleter from './base-completer';

class MotionCompleter extends BaseCompleter {
    getCompletions (editor, session, pos, prefix, callback) {
        const words = [
            {
                caption: 'move',
                value: 'move(10)',
                description: '(10) 歩動かす'
            },
            {
                caption: 'turn_right',
                value: 'turn_right(15)',
                description: '時計回りに (15) 度回す'
            },
            {
                caption: 'turn_left',
                value: 'turn_left(15)',
                description: '反時計回りに (15) 度回す'
            },
            {
                caption: 'go_to',
                value: 'go_to("_random_")',
                description: '(どこかの場所▼) へ行く'
            },
            {
                caption: 'go_to-xy',
                value: 'go_to([0, 0])',
                description: 'x座標を (0) 、y座標を (0) にする'
            },
            {
                caption: 'glide',
                value: 'glide("_random_", secs: 1)',
                description: '(1) 秒で (どこかの場所▼) へ行く'
            },
            {
                caption: 'glide-xy',
                value: 'glide([0, 0], secs: 1)',
                description: '(1) 秒でx座標を (0) に、y座標を (0) にする'
            },
            {
                caption: 'direction=',
                value: 'self.direction = 90',
                description: '(90) 度に向ける'
            },
            {
                caption: 'point_towards',
                value: 'point_towards("_mouse_")',
                description: '(マウスのポインター▼) へ向ける'
            },
            {
                caption: 'x+=',
                value: 'self.x += 10',
                description: 'x座標を (10) ずつ変える'
            },
            {
                caption: 'x=',
                value: 'self.x = 0',
                description: 'x座標を (0) にする'
            },
            {
                caption: 'y+=',
                value: 'self.y += 10',
                description: 'y座標を (10) ずつ変える'
            },
            {
                captiono: 'y=',
                value: 'self.y = 0',
                description: 'y座標を (0) にする'
            },
            {
                value: 'bounce_if_on_edge',
                description: 'もし端についたら、跳ね返る'
            },
            {
                caption: 'rotation_style=',
                value: 'self.rotation_style = "left-right"',
                description: '回転方法を [左右のみ▼] にする'
            },
            {
                value: 'x',
                description: 'x座標'
            },
            {
                value: 'y',
                description: 'y座標'
            },
            {
                value: 'direction',
                description: '向き'
            }
        ];
        const completions = [];
        words.forEach(w => completions.push(w));
        callback(null, completions);
    }
}

export default MotionCompleter;
