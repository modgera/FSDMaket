const params = {
    mask: '',
    delimiter:'',
    delimiterPosition:'',
    className: ''
};
const allowedDelimiters = ['.','/','-'];

const createMaskForDate = (props) => {
    console.log(props);
    if (validateProps(props)) {
        window.addEventListener("DOMContentLoaded", addMaskListenerToDocument);
    }
}
export default createMaskForDate;

const validateProps = (props) =>  propsExists(props) && setParams(props);

const propsExists = (props) => {
    if (!props) {
        console.error('Params is not defined');
        return false;
    }
    return true;
}

const setParams = ({mask = 'XX.XX.XXXX', className}) => {
    if (className === undefined || !className) {
        console.error('Class name for masking is not found');
        return false;
    }

    const delimiterInfo = getDelimiterInfo(mask);
    if (!delimiterInfo) {
        return false;
    }

    params.className = getClassSelector(className);
    params.mask = mask;
    Object.assign(params, delimiterInfo);
    return true;
}

const getClassSelector = (className) => (className.slice(0,1) === '.') ? className : '.' + className;

const getDelimiterInfo = (mask) => {
    const maskArray = mask.split('');
    const delimiter = findDelimiter(maskArray);
    if (!delimiter) {
        console.error("Delimiter is incorrect");
        return false;
    }
    const delimiterPosition = findDelimiterPositions(maskArray, delimiter);
    return {
        delimiter,
        delimiterPosition
    }
}

const findDelimiter = (mask) => {
    const delimitersArray = mask.filter( (elem) => allowedDelimiters.includes(elem) )
    if (delimitersArray.length > 0) {
        const uniqueDelimiters = [...new Set(delimitersArray)];
        if (uniqueDelimiters.length == 1) {
            return uniqueDelimiters[0];
        }
    }
    return null;
}

const findDelimiterPositions = (mask, delimiter) => {
    return mask.reduce( (pos, elem, i) => elem === delimiter ? pos.concat(i) : pos, []);
}


function addMaskListenerToDocument() {
    const elementsNodes = document.querySelectorAll(params.className);
    const elements = Array.from(elementsNodes);
    elements.forEach(addMaskEventListenersToInput);
}

const addMaskEventListenersToInput = (input) => {
    input.addEventListener("input", maskDateInput, false);
}

function maskDateInput(e) {
    const cursorPosition = this.selectionEnd;
    this.value = getFormatedInput(this.value);
    this.selectionEnd = cursorPosition + 1;
}

const getFormatedInput = (inputValue) => {
    const maskLength = params.mask.length;
    return  inputValue
                    .replace(/\D/g,'')
                    .split('')
                    .reduce(setDelimiters(),[])
                    .join('')
                    .slice(0, maskLength)
}

const setDelimiters = () => {
    const {delimiterPosition, delimiter} = params;
    return (res, elem) => delimiterPosition.includes(res.length)
                                            ? res.concat(delimiter).concat(elem)
                                            : res.concat(elem)
}



/// #if includeCodeForTests
    createMaskForDate.setParams = setParams;
    createMaskForDate.propsExists = propsExists;
    createMaskForDate.validateProps = validateProps;
    createMaskForDate.getClassSelector = getClassSelector;
    createMaskForDate.getDelimiterInfo = getDelimiterInfo;
    createMaskForDate.findDelimiter = findDelimiter;
    createMaskForDate.findDelimiterPositions = findDelimiterPositions;
    createMaskForDate.getFormatedInput = getFormatedInput;
/// #endif