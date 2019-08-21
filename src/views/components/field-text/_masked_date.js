const createMaskForDate = (function() {
    const params = {
        delimiter: '.',
        dayEndPosition: 2,
        monthEndPosition: 5,
        delimiterPositions: [2, 5],
        potentialDelimiters: [44,46,47], // delimiters ,./
        className: ''
    };

    function addMaskListenerToDocument() {
        const elements = document.querySelectorAll(params.className);
        elements.forEach(addMaskEventListenersToInput);
    }

    const addMaskEventListenersToInput = (input) => {
        input.addEventListener("keypress", maskDateKeyDownEvent, false);
        input.setAttribute("maxlength", 10);
    }

    function maskDateKeyDownEvent(e) {
        e.preventDefault();
        const {delimiter, dayEndPosition, monthEndPosition, delimiterPositions, potentialDelimiters} = params;
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
            if (valueArray[0] > 2) {
                return (enteredNumber < 2) ? true : false;
            } else {
                return (enteredNumber > 0) ? true : false;;
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

    const getValidYearPart = (inputValue, enteredNumber) => {
        const yearPart = inputValue.split(params.delimiter)[2];
        return (yearPart === undefined) ? enteredNumber : yearPart + enteredNumber;
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

    const validateDelimiter = (delimiter) => {
        if (delimiter) {
            const delimiterCode = delimiter.charCodeAt();
            if (!params.potentialDelimiters.includes(delimiterCode)) {
                params.delimiter = '.';
            }
        }
    }

    return function(props) {
        Object.assign(params, props);
        validateDelimiter(props.delimiter);
        window.addEventListener("DOMContentLoaded", addMaskListenerToDocument);
    }
}) ();
export default createMaskForDate;
