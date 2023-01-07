/* global Opal */
import _ from 'lodash';
import Variable from 'scratch-vm/src/engine/variable';
import {KeyOptions} from './constants';

const GreaterThanMenu = [
    'LOUDNESS',
    'TIMER'
];

/**
 * Event converter
 */
const EventConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) &&
            name === 'when' &&
            args.length >= 1 && args[0].type === 'sym' &&
            rubyBlockArgs && rubyBlockArgs.length === 0 &&
            rubyBlock) {
            switch (args[0].value) {
            case 'flag_clicked':
            case 'clicked':
                if (args.length === 1) {
                    let opcode;
                    switch (args[0].value) {
                    case 'flag_clicked':
                        opcode = 'event_whenflagclicked';
                        break;
                    case 'clicked':
                        if (this._context.target && this._context.target.isStage) {
                            opcode = 'event_whenstageclicked';
                        } else {
                            opcode = 'event_whenthisspriteclicked';
                        }
                        break;
                    }
                    block = this._createBlock(opcode, 'hat');
                    this._setParent(rubyBlock, block);
                }
                break;
            case 'key_pressed':
                if (args.length === 2 && this._isString(args[1]) && KeyOptions.indexOf(args[1].toString()) >= 0) {
                    block = this._createBlock('event_whenkeypressed', 'hat');
                    this._addField(block, 'KEY_OPTION', args[1]);
                    this._setParent(rubyBlock, block);
                }
                break;
            case 'backdrop_switches':
                if (args.length === 2 && this._isString(args[1])) {
                    block = this._createBlock('event_whenbackdropswitchesto', 'hat');
                    this._addField(block, 'BACKDROP', args[1]);
                    this._setParent(rubyBlock, block);
                }
                break;
            case 'greater_than':
                if (args.length === 3 &&
                    this._isString(args[1]) && GreaterThanMenu.indexOf(args[1].toString().toUpperCase()) >= 0 &&
                    this._isNumberOrBlock(args[2])) {
                    block = this._createBlock('event_whengreaterthan', 'hat');
                    this._addField(block, 'WHENGREATERTHANMENU', args[1].toString().toUpperCase());
                    this._addNumberInput(block, 'VALUE', 'math_number', args[2], 10);
                    this._setParent(rubyBlock, block);
                }
                break;
            case 'receive':
                if (args.length === 2 && this._isString(args[1])) {
                    const broadcastMsg = this._lookupOrCreateBroadcastMsg(args[1]);
                    block = this._createBlock('event_whenbroadcastreceived', 'hat');
                    this._addField(block, 'BROADCAST_OPTION', broadcastMsg.name, {
                        id: broadcastMsg.id,
                        variableType: Variable.BROADCAST_MESSAGE_TYPE
                    });
                    this._setParent(rubyBlock, block);
                }
                break;
            }
        }

        return block;
    },

    register: function (converter) {
        converter.registerCallMethodWithBlock('self', 'when_flag_clicked', 0, 0, params => {
            const {rubyBlock} = params;

            const block = converter.createBlock('event_whenflagclicked', 'hat');
            converter.setParent(rubyBlock, block);
            return block;
        });

        converter.registerCallMethodWithBlock('self', 'when_key_pressed', 1, 0, params => {
            const {args, rubyBlock} = params;

            if (!converter.isString(args[0])) return null;
            if (KeyOptions.indexOf(args[0].toString()) < 0) return null;

            const block = converter.createBlock('event_whenkeypressed', 'hat');
            converter.addField(block, 'KEY_OPTION', args[0]);
            converter.setParent(rubyBlock, block);
            return block;
        });

        converter.registerCallMethodWithBlock('sprite', 'when_clicked', 0, 0, params => {
            const {rubyBlock} = params;

            const block = converter.createBlock('event_whenthisspriteclicked', 'hat');
            converter.setParent(rubyBlock, block);
            return block;
        });

        converter.registerCallMethodWithBlock('stage', 'when_clicked', 0, 0, params => {
            const {rubyBlock} = params;

            const block = converter.createBlock('event_whenstageclicked', 'hat');
            converter.setParent(rubyBlock, block);
            return block;
        });

        converter.registerCallMethodWithBlock('self', 'when_backdrop_switches', 1, 0, params => {
            const {args, rubyBlock} = params;

            if (!converter.isString(args[0])) return null;

            const block = converter.createBlock('event_whenbackdropswitchesto', 'hat');
            converter.addField(block, 'BACKDROP', args[0]);
            converter.setParent(rubyBlock, block);
            return block;
        });

        converter.registerCallMethodWithBlock('self', 'when_greater_than', 2, 0, params => {
            const {args, rubyBlock} = params;

            if (!converter.isString(args[0])) return null;
            const args0 = args[0].toString().toUpperCase();
            if (GreaterThanMenu.indexOf(args0) < 0) return null;
            if (!converter.isNumberOrBlock(args[1])) return null;

            const block = converter.createBlock('event_whengreaterthan', 'hat');
            converter.addField(block, 'WHENGREATERTHANMENU', args0);
            converter.addNumberInput(block, 'VALUE', 'math_number', args[1], 10);
            converter.setParent(rubyBlock, block);
            return block;
        });

        converter.registerCallMethodWithBlock('self', 'when_receive', 1, 0, params => {
            const {args, rubyBlock} = params;

            if (!converter.isString(args[0])) return null;

            const broadcastMsg = converter.lookupOrCreateBroadcastMsg(args[0]);
            const block = converter.createBlock('event_whenbroadcastreceived', 'hat');
            converter.addField(block, 'BROADCAST_OPTION', broadcastMsg.name, {
                id: broadcastMsg.id,
                variableType: Variable.BROADCAST_MESSAGE_TYPE
            });
            converter.setParent(rubyBlock, block);
            return block;
        });

        const createBroadcastBlockFunc = (params, opcode) => {
            const {args, rubyBlock} = params;

            if (!converter.isStringOrBlock(args[0])) return null;

            const menuBlock = converter.createBlock('event_broadcast_menu', 'value', {
                shadow: true
            });
            let broadcastMsg;
            let inputBlock;
            let shadowBlock;
            if (converter.isString(args[0])) {
                broadcastMsg = converter.lookupOrCreateBroadcastMsg(args[0]);
                inputBlock = menuBlock;
                shadowBlock = menuBlock;
            } else {
                broadcastMsg = converter.defaultBroadcastMsg();
                inputBlock = args[0];
                shadowBlock = menuBlock;
            }
            converter.addField(menuBlock, 'BROADCAST_OPTION', broadcastMsg.name, {
                id: broadcastMsg.id,
                variableType: Variable.BROADCAST_MESSAGE_TYPE
            });

            const block = converter.createBlock(opcode, 'statement');
            converter.addInput(block, 'BROADCAST_INPUT', inputBlock, shadowBlock);
            return block;
        };
        converter.registerCallMethod('self', 'broadcast', 1,
            params => createBroadcastBlockFunc(params, 'event_broadcast'));
        converter.registerCallMethod('self', 'broadcast_and_wait', 1,
            params => createBroadcastBlockFunc(params, 'event_broadcastandwait'));
    }
};

export default EventConverter;
