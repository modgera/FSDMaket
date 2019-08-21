const params = {
    delimiter: '.',
    dayEndPosition: 2,
    monthEndPosition: 5,
    delimiterPositions: [2, 5],
    className: ''
};

const potentialDelimiters = [44,45,46,47]; // delimiters ,-./

const createMaskForDate = (props) => {
    Object.assign(params, props); //{...params, ...props}
    validateDelimiter(props.delimiter);
    window.addEventListener("DOMContentLoaded", addMaskListenerToDocument);
    return params;
}
export default createMaskForDate;



const validateDelimiter = (delimiter) => {
    if (delimiter) {
        const delimiterCode = delimiter.charCodeAt();
        if (!potentialDelimiters.includes(delimiterCode)) {
            params.delimiter = '.';
        }
    }
}


const addMaskListenerToDocument = () => {
    const elements = document.querySelectorAll(params.className);
    elements.forEach(addMaskEventListenersToInput);
}

const addMaskEventListenersToInput = (input) => {
    input.addEventListener("keypress", maskDateKeyDownEvent, false);
    input.setAttribute("maxlength", 10);
}

function maskDateKeyDownEvent(e) {
    e.preventDefault();
    const {delimiter, dayEndPosition, monthEndPosition, delimiterPositions} = params;
    let inputValue = this.value;
    const cursorPosition = this.selectionStart;
    const keyCode = e.keyCode;

    if (potentialDelimiters.includes(keyCode) && delimiterPositions.includes(cursorPosition)) {
        inputValue += delimiter;
        this.value = inputValue.slice(0, 10);
        return true;
    }

    if ( keyCode > 47 && keyCode < 58) {
        const enteredNumber = String.fromCharCode(keyCode);
        const checkValue = checkInputValue(cursorPosition, inputValue, enteredNumber);

        if (checkValue) {
            inputValue = inputValue.slice(0, cursorPosition) + enteredNumber + inputValue.slice(cursorPosition);
            inputValue = inputValue.split(delimiter).join('');

            if (inputValue.length > dayEndPosition) {
                inputValue = inputValue.slice(0, dayEndPosition) + delimiter + inputValue.slice(dayEndPosition);
            }

            if (inputValue.length > monthEndPosition) {
                inputValue = inputValue.slice(0, monthEndPosition) + delimiter + inputValue.slice(monthEndPosition);
            }

            this.value = inputValue.slice(0, 10);
            this.selectionStart = cursorPosition + 2;
            this.selectionEnd = cursorPosition + 2;
            return true;
        }
    }
    return false;
}

const checkInputValue = (cursorPosition, inputValue, enteredNumber) => {
    const {dayEndPosition, monthEndPosition} = params;
    const valueArray = inputValue.split('');
    if (cursorPosition < dayEndPosition) {
        return checkDay(enteredNumber, cursorPosition, valueArray);
    }

    if (cursorPosition <= monthEndPosition && cursorPosition >= dayEndPosition) {
        return checkMonth(enteredNumber, cursorPosition, valueArray);
    }

    if (cursorPosition >= monthEndPosition) {
        return checkYear(enteredNumber, inputValue);
    }
}

const checkDay = (enteredNumber, cursorPosition, valueArray) => {
    if (cursorPosition == 0) {
        return (enteredNumber < 4) ? true : false;
    } else {
        const firstNumber = valueArray[0];
        if (firstNumber == 3) {
            return (enteredNumber < 2) ? true : false;
        } else {
            return ( (enteredNumber == 0 && firstNumber > 0) || enteredNumber > 0 ) ? true : false;
        }
    }
}
const checkMonth = (enteredNumber, cursorPosition, valueArray) => {
    const dayEndPosition = params.dayEndPosition;
    if (cursorPosition == dayEndPosition || cursorPosition == dayEndPosition + 1) {
        return (enteredNumber < 2) ? true : false;
    } else if (valueArray[dayEndPosition + 1] == 1) {
        return (enteredNumber < 3) ? true : false;
    } else {
        return (enteredNumber != 0) ? true : false;
    }
}

const checkYear = (enteredNumber, inputValue) => {
    const validYearPart = getValidYearPart(inputValue, enteredNumber);
    const yearPartLen = validYearPart.length;
    const currentYear = '' + new Date().getFullYear();
    const slicedCurrentYear = currentYear.slice(0, yearPartLen);
    const minYear = '' + (currentYear - 150);
    const slicedMinYear = minYear.slice(0, yearPartLen);
    return (validYearPart >= slicedMinYear && validYearPart <= slicedCurrentYear) ? true : false;
}

const getValidYearPart = (inputValue, enteredNumber) => {
    const yearPart = inputValue.split(params.delimiter)[2];
    return (yearPart === undefined) ? enteredNumber : yearPart + enteredNumber;
}

/// #if includeCodeForTests
    createMaskForDate.checkDay = checkDay;
    createMaskForDate.checkMonth = checkMonth;
    createMaskForDate.checkYear = checkYear;
    createMaskForDate.getValidYearPart = getValidYearPart;
    createMaskForDate.validateDelimiter = validateDelimiter;
    createMaskForDate.checkInputValue = checkInputValue;
/// #endif