import BaseCompleter from './base-completer';

class MeshCompleter extends BaseCompleter {
    getCompletions (editor, session, pos, prefix, callback) {
        const words = [
            {
                caption: 'mesh.sensor_value',
                value: 'mesh.sensor_value(" ")',
                description: '( ▼) センサーの値'
            }
        ];
        const completions = [];
        words.forEach(w => completions.push(w));
        callback(null, completions);
    }
}

export default MeshCompleter;
