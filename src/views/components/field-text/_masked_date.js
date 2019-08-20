(function() {
    const delimiter = ".";
    const dayEndPosition = 2;
    const monthEndPosition = 5;
    const delimiterPositions = [dayEndPosition, monthEndPosition];
    const potentialDelimiters = [44,46,47]; // delimiters ,./

    window.addEventListener("DOMContentLoaded", addMaskListenerToDocument);

    function addMaskListenerToDocument() {
        const elements = document.querySelectorAll('.field-text__input_masked_date');
        elements.forEach(addMaskEventListenersToInput);
    }

    const addMaskEventListenersToInput = (input) => {
        input.addEventListener("keypress", maskDateKeyDownEvent, false);
        input.setAttribute("maxlength", 10);
    }

    function maskDateKeyDownEvent(e) {
        e.preventDefault();
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
        if (cursorPosition == dayEndPosition || cursorPosition == dayEndPosition + 1) {
            return (enteredNumber < 2) ? true : false;
        } else if (valueArray[dayEndPosition + 1] == 1) {
            return (enteredNumber < 3) ? true : false;
        } else {
            return (enteredNumber != 0) ? true : false;
        }
    }

    const checkYear = (enteredNumber, inputValue) => {
        let yearPart = inputValue.split('.')[2];
        if (yearPart === undefined) {
            yearPart = enteredNumber;
        } else {
            yearPart += enteredNumber;
        }

        const yearPartLen = yearPart.length;
        const currentYear = '' + new Date().getFullYear();
        const slicedCurrentYear = currentYear.slice(0, yearPartLen);
        const minYear = '' + (currentYear - 150);
        const slicedMinYear = minYear.slice(0, yearPartLen);
        return (yearPart >= slicedMinYear && yearPart <= slicedCurrentYear) ? true : false;
    }

}());

