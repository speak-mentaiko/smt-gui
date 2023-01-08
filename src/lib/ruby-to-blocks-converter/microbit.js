const MicroBit = 'microbit';

const ButtonsMenu = [
    'A',
    'B',
    'any'
];

const GesturesMenu = [
    'moved',
    'shaken',
    'jumped'
];

const TiltDirectionAnyMenu = [
    'front',
    'back',
    'left',
    'right',
    'any'
];

const TiltDirectionMenu = TiltDirectionAnyMenu.slice(0, 4);

/**
 * MicroBit converter
 */
const MicroBitConverter = {
    register: function (converter) {
        const createMicrobitBlock = node => converter.createRubyExpressionBlock(MicroBit, node);

        converter.registerCallMethod('self', 'microbit', 0, params => {
            const {node} = params;

            return createMicrobitBlock(node);
        });

        converter.registerCallMethodWithBlock('microbit', 'when_button_pressed', 1, 0, params => {
            const {receiver, args, rubyBlock} = params;

            if (!converter.isStringOrBlock(args[0])) return null;
            if (converter.isString(args[0]) && ButtonsMenu.indexOf(args[0].toString()) < 0) return null;

            const block = converter.changeRubyExpressionBlock(receiver, 'microbit_whenButtonPressed', 'hat');
            converter.addFieldInput(block, 'BTN', 'microbit_menu_buttons', 'buttons', args[0], 'A');
            converter.setParent(rubyBlock, block);
            return block;
        });

        converter.registerCallMethod('microbit', 'button_pressed?', 1, params => {
            const {receiver, args} = params;

            if (!converter.isStringOrBlock(args[0])) return null;
            if (converter.isString(args[0]) && ButtonsMenu.indexOf(args[0].toString()) < 0) return null;

            const block = converter.changeRubyExpressionBlock(receiver, 'microbit_isButtonPressed', 'value_boolean');
            converter.addFieldInput(block, 'BTN', 'microbit_menu_buttons', 'buttons', args[0], 'A');
            return block;
        });

        converter.registerCallMethodWithBlock('microbit', 'when', 1, 0, params => {
            const {receiver, args, rubyBlock} = params;

            if (!converter.isStringOrBlock(args[0])) return null;
            if (converter.isString(args[0]) && GesturesMenu.indexOf(args[0].toString()) < 0) return null;

            const block = converter.changeRubyExpressionBlock(receiver, 'microbit_whenGesture', 'hat');
            converter.addFieldInput(block, 'GESTURE', 'microbit_menu_gestures', 'gestures', args[0], 'moved');
            converter.setParent(rubyBlock, block);
            return block;
        });

        converter.registerCallMethod('microbit', 'display', 5, params => {
            const {receiver, args} = params;

            if (!args.every(x => converter.isString(x))) return null;

            const block = converter.changeRubyExpressionBlock(receiver, 'microbit_displaySymbol', 'statement');

            let matrix = '';
            for (const arg of args) {
                matrix += arg;
            }
            matrix = matrix.replace(/[1-9]/g, '1').replace(/[^1-9]/g, '0');
            converter.addFieldInput(block, 'MATRIX', 'matrix', 'MATRIX', matrix, null);
            return block;
        });

        converter.registerCallMethod('microbit', 'display_text', 1, params => {
            const {receiver, args} = params;

            if (!converter.isStringOrBlock(args[0])) return null;

            const block = converter.changeRubyExpressionBlock(receiver, 'microbit_displayText', 'statement');
            converter.addTextInput(block, 'TEXT', args[0], 'Hello!');
            return block;
        });

        converter.registerCallMethod('microbit', 'clear_display', 0, params => {
            const {receiver} = params;

            return converter.changeRubyExpressionBlock(receiver, 'microbit_displayClear', 'statement');
        });

        converter.registerCallMethodWithBlock('microbit', 'when_tilted', 1, 0, params => {
            const {receiver, args, rubyBlock} = params;

            if (!converter.isStringOrBlock(args[0])) return null;
            if (converter.isString(args[0]) && TiltDirectionAnyMenu.indexOf(args[0].toString()) < 0) return null;

            const block = converter.changeRubyExpressionBlock(receiver, 'microbit_whenTilted', 'hat');
            converter.addFieldInput(
                block, 'DIRECTION', 'microbit_menu_tiltDirectionAny', 'tiltDirectionAny', args[0], 'any'
            );
            converter.setParent(rubyBlock, block);
            return block;
        });

        converter.registerCallMethod('microbit', 'tilted?', 1, params => {
            const {receiver, args} = params;

            if (!converter.isStringOrBlock(args[0])) return null;
            if (converter.isString(args[0]) && TiltDirectionAnyMenu.indexOf(args[0].toString()) < 0) return null;

            const block = converter.changeRubyExpressionBlock(receiver, 'microbit_isTilted', 'value_boolean');
            converter.addFieldInput(
                block, 'DIRECTION', 'microbit_menu_tiltDirectionAny', 'tiltDirectionAny', args[0], 'any'
            );
            return block;
        });

        converter.registerCallMethod('microbit', 'tilt_angle', 1, params => {
            const {receiver, args} = params;

            if (!converter.isStringOrBlock(args[0])) return null;
            if (converter.isString(args[0]) && TiltDirectionMenu.indexOf(args[0].toString()) < 0) return null;

            const block = converter.changeRubyExpressionBlock(receiver, 'microbit_getTiltAngle', 'value');
            converter.addFieldInput(
                block, 'DIRECTION', 'microbit_menu_tiltDirection', 'tiltDirection', args[0], 'front'
            );
            return block;
        });

        converter.registerCallMethodWithBlock('microbit', 'when_pin_connected', 1, 0, params => {
            const {receiver, args, rubyBlock} = params;

            if (!converter.isNumberOrBlock(args[0])) return null;
            if (converter.isNumber(args[0]) && (args[0].value < 0 || args[0].value > 2)) return null;

            const block = converter.changeRubyExpressionBlock(receiver, 'microbit_whenPinConnected', 'hat');
            converter.addFieldInput(block, 'PIN', 'microbit_menu_touchPins', 'touchPins', args[0], '0');
            converter.setParent(rubyBlock, block);
            return block;
        });

        // backward compatibility
        converter.registerCallMethodWithBlock('self', 'when', 2, 0, params => {
            const {args} = params;

            if (args[0].type !== 'sym') return null;

            switch (args[0].value) {
            case 'microbit_button_pressed':
                return converter.callMethod(
                    createMicrobitBlock(params.node), 'when_button_pressed', params.args.slice(1),
                    params.rubyBlockArgs, params.rubyBlock, params.node
                );
            case 'microbit_gesture':
                return converter.callMethod(
                    createMicrobitBlock(params.node), 'when', params.args.slice(1),
                    params.rubyBlockArgs, params.rubyBlock, params.node
                );
            case 'microbit_tilted':
                return converter.callMethod(
                    createMicrobitBlock(params.node), 'when_tilted', params.args.slice(1),
                    params.rubyBlockArgs, params.rubyBlock, params.node
                );
            case 'microbit_pin_connected':
                return converter.callMethod(
                    createMicrobitBlock(params.node), 'when_pin_connected', params.args.slice(1),
                    params.rubyBlockArgs, params.rubyBlock, params.node
                );
            }

            return null;
        });
    }
};

export default MicroBitConverter;
