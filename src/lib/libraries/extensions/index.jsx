import React from 'react';
import {FormattedMessage} from 'react-intl';

import menu1IconURL from './smt/kani.png';
import menu1InsetIconURL from './smt/kani-small.png';
import menu2IconURL from './smt/mboard.png';
import menu2InsetIconURL from './smt/mboard-small.png';
import menu3IconURL from './smt/microcom.png';
import menu3InsetIconURL from './smt/microcom-small.png';

const extensions = [
    {
        name: (
            <FormattedMessage
                defaultMessage="Kanirobo1"
                description="Name for the 'Kanirobo1' extension"
                id="gui.kanirobo1.name"
            />
        ),
        extensionId: 'kanirobo1',
        iconURL: menu1IconURL,
        insetIconURL: menu1InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Kanirobo Blocks (Easy)"
                description="Description for the 'Kanirobo1' extension"
                id="gui.kanirobo1.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Kanirobo2"
                description="Name for the 'Kanirobo2' extension"
                id="gui.kanirobo2.name"
            />
        ),
        extensionId: 'kanirobo2',
        iconURL: menu1IconURL,
        insetIconURL: menu1InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Kanirobo Blocks (Normal)"
                description="Description for the 'Kanirobo2' extension"
                id="gui.kanirobo2.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Tools"
                description="Name for the 'Tools' extension"
                id="gui.tools.name"
            />
        ),
        extensionId: 'tools',
        iconURL: menu1IconURL,
        insetIconURL: menu1InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Tools (output, etc.)"
                description="Description for the 'tools' extension"
                id="gui.tools.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Mboard1"
                description="Name for the 'Mboard1' extension"
                id="gui.mboard1.name"
            />
        ),
        extensionId: 'mboard1',
        iconURL: menu2IconURL,
        insetIconURL: menu2InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Matsue Board Blocks (Easy)"
                description="Description for the 'mboard1' extension"
                id="gui.mboard1.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Mboard2"
                description="Name for the 'Mboard2' extension"
                id="gui.mboard2.name"
            />
        ),
        extensionId: 'mboard2',
        iconURL: menu2IconURL,
        insetIconURL: menu2InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Matsue Board Blocks (Normal)"
                description="Description for the 'mboard2' extension"
                id="gui.mboard2.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Mboard3"
                description="Name for the 'Mboard3' extension"
                id="gui.mboard3.name"
            />
        ),
        extensionId: 'mboard3',
        iconURL: menu2IconURL,
        insetIconURL: menu2InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Matsue Board Blocks"
                description="Description for the 'mboard3' extension"
                id="gui.mboard3.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Microcom"
                description="Name for the 'Micro_Computer' extension"
                id="gui.microcom.name"
            />
        ),
        extensionId: 'microcom',
        iconURL: menu3IconURL,
        insetIconURL: menu3InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Micro Computer Blocks"
                description="Description for the 'Microcom' extension"
                id="gui.microcom.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="M5stack"
                description="Name for the 'M5stack' extension"
                id="gui.m5stack.name"
            />
        ),
        extensionId: 'm5stack',
        iconURL: menu3IconURL,
        insetIconURL: menu3InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="M5stack Blocks"
                description="Description for the 'M5stack' extension"
                id="gui.m5stack.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Sensor"
                description="Name for the 'Sensor' extension"
                id="gui.sensor.name"
            />
        ),
        extensionId: 'sensor',
        iconURL: menu3IconURL,
        insetIconURL: menu3InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sensor (peripherals)"
                description="Description for the 'sensor' extension"
                id="gui.sensor.description"
            />
        ),
        featured: true
    }
];

export default extensions;
