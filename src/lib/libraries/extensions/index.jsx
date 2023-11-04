import React from 'react';
import {FormattedMessage} from 'react-intl';

import sampleIconURL from './smalrubot-s1/smalrubot-s1.png';
import sampleInsetIconURL from  './smalrubot-s1/smalrubot-s1-small.png'
;
const extensions = [
/*    
    {
        name: (
            <FormattedMessage
                defaultMessage="Kanirobo1"
                description="Name for the 'Kanirobo1' extension"
                id="gui.kanirobo1.name"
            />
        ),
        extensionId: 'kanirobo1',
        iconURL: sampleIconURL,
        insetIconURL: sampleInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Kanirobo Blocks (Easy)"
                description="Description for the 'Kanirobo1' extension"
                id="gui.kanirobo1.description"
            />
        ),
        featured: true
    },
*/
    {
        name: (
            <FormattedMessage
                defaultMessage="Kanirobo2"
                description="Name for the 'Kanirobo2' extension"
                id="gui.kanirobo2.name"
            />
        ),
        extensionId: 'kanirobo2',
        iconURL: sampleIconURL,
        insetIconURL: sampleInsetIconURL,
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
                defaultMessage="Microcom"
                description="Name for the 'Micro_Computer' extension"
                id="gui.microcom.name"
            />
        ),
        extensionId: 'microcom',
        iconURL: sampleIconURL,
        insetIconURL: sampleInsetIconURL,
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
                defaultMessage="Mboard1"
                description="Name for the 'Mboard1' extension"
                id="gui.mboard1.name"
            />
        ),
        extensionId: 'mboard1',
        iconURL: sampleIconURL,
        insetIconURL: sampleInsetIconURL,
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
        iconURL: sampleIconURL,
        insetIconURL: sampleInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Matsue Board Blocks (Normal)"
                description="Description for the 'mboard2' extension"
                id="gui.mboard2.description"
            />
        ),
        featured: true
    }
];

export default extensions;
