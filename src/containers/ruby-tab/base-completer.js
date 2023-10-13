class BaseCompleter {
    getCompletions () {
        throw new Error('Not implemented');
    }

    getDocTooltip (item) {
        if (!item.docHTML) {
            item.docHTML = [
                '<b>', item.description || item.value, '</b>', '<hr></hr>',
                '<code>', item.value, '</code>'
            ].join('');
        }
    }
}

export default BaseCompleter;
