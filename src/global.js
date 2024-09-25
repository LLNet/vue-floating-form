export function allowInputEvents(attrs, type){
    const allowList = {
        text: ['onInput', 'onChange', 'onFocus', 'onBlur', 'onKeydown', 'onKeyup', 'onSelect'],
        number: ['onInput', 'onChange', 'onFocus', 'onBlur', 'onSelect'],
        textarea: ['onInput', 'onChange', 'onFocus', 'onBlur', 'onKeydown', 'onKeyup', 'onSelect', 'onPaste'],
        color: ['onInput', 'onChange'],
        date: ['onInput', 'onChange'],
    };




    return Object.keys(attrs).filter((key) => {
        return allowList[type].includes(key) || key.startsWith('input.');
    }).reduce((acc, key) => {

        if(key.startsWith('input.')){
            acc[key.replace('input.', '')] = attrs[key];
        }
        else{
            acc[key] = attrs[key];
        }

        return acc;
    }, {});
}

export function allowWrapperAttrs(attrs){
    // allow all attrs starting with wrapper.name
    return Object.keys(attrs).filter((key) => {
        return key.startsWith('wrapper.') || key === 'class';
    }).reduce((acc, key) => {
        acc[key.replace('wrapper.', '')] = attrs[key];
        return acc;
    }, {});
}