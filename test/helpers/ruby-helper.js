const setRubyCode = function (driver, code) {
    code = code.replace(/\n/g, '\\n');
    return driver.executeScript(`ace.edit('ruby-editor').setValue('${code}');`);
};

const getRubyCode = function (driver) {
    return driver.executeScript(`return ace.edit('ruby-editor').getValue();`);
};

export {
    setRubyCode,
    getRubyCode
};
