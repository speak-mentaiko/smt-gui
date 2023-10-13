import BaseCompleter from './base-completer';

class SoundCompleter extends BaseCompleter {
    getCompletions (editor, session, pos, prefix, callback) {
        const words = [
            {
                value: 'play_until_done("ニャー")',
                description: '終わるまでニャーの音を鳴らす'
            },
            {
                value: 'play("ニャー")',
                description: 'ニャーの音を鳴らす'
            },
            {
                value: 'stop_all_sounds',
                description: 'すべての音を止める'
            },
            {
                value: 'change_sound_effect_by("PITCH",10)',
                description: 'ピッチの効果を10ずつ変える'
            },
            {
                value: 'set_sound_effect("PITCH", 100)',
                description: 'ピッチの効果を100にする'
            },
            {
                value: 'clear_sound_effects',
                description: '音の効果をなくす'
            },
            {
                value: 'self.volume += -10',
                description: '音量を-10ずつ変える'
            },
            {
                value: 'self.volume =100',
                description: '音量を100%にする'
            },
            {
                value: 'volume',
                description: '音量'
            }
        ];
        const completions = [];
        words.forEach(w => completions.push(w));
        callback(null, completions);
    }
}

export default SoundCompleter;
