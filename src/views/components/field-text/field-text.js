    function addMaskListenerToDocument() {
        const elementsNodes = document.querySelectorAll('.field-text__input_masked_date');
        const elements = Array.from(elementsNodes);
        //add mask listener to each element
        elements.forEach( addMaskEventListenersToInput );
    }
    
    const addMaskEventListenersToInput = (input) => {
        //input.addEventListener("input", mask, false);
        //input.addEventListener("focus", mask, false);
        //input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", maskDateKeyDownEvent, false)
    }

    function maskDateKeyDownEvent(e) {
        const delimiter = ".";
        const delimiterPosition = [2, 5];
        const backspaceKey = 8;
        const deleteKey = 46;
        const cursorPosition = this.selectionStart;
        let inputValue = this.value;
        const enteredSymbol = e.keyCode;
        if (enteredSymbol == backspaceKey) {
            const nextSymbol = inputValue.slice(cursorPosition-2, cursorPosition-1);
            console.log("next: " + nextSymbol);
            if (nextSymbol == delimiter) {
                inputValue = inputValue.slice(0, cursorPosition-2) + inputValue.slice(cursorPosition);
                console.log("newinput: " + inputValue);
            }
        }
        if ( delimiterPosition.includes(cursorPosition) ) {
            //add delimiter to input result
        }

        console.log('input: ' + inputValue);
        console.log('position: ' + cursorPosition);
        console.log('key: ' + enteredSymbol);
        return inputValue.slice(0, 10);
    }

    window.addEventListener("DOMContentLoaded", addMaskListenerToDocument)