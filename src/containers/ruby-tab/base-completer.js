class BaseCompleter {
    getCompletions () {
        throw new Error('Not implemented');
    }

    getDocTooltip (item) {
        if (!item.docHTML) {
            let description = item.description;
            let code;
            if (item.type === 'snippet') {
                const snippet = this.#removeSnippetVarAroundCode(item.snippet);
                description = description || snippet;
                code = snippet;
            } else {
                description = description || item.value;
                code = item.value;
            }
            item.docHTML = [
                '<b>', this.#escapeHTML(description), '</b>', '<hr></hr>',
                '<code>', this.#escapeHTML(code), '</code>'
            ].join('');
        }
    }

    #escapeHTML = function (str) {
        return (`${str}`).replace(/&/g, '&#38;').replace(/"/g, '&#34;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&#60;');
    };

    #removeSnippetVarAroundCode = function (snippet) {
        return snippet.replace(/\$\{[0-9]+:?([^}]*?)\}/g, '$1');
    };
}

export default BaseCompleter;
