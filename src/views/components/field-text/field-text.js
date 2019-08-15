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
        input.addEventListener("keypress", maskDateKeyDownEvent, false);
        input.setAttribute("maxlength", 10);
    }

    function maskDateKeyDownEvent(e) {
        const delimiter = ".";
        const allDelimitersCode = [188, 111, 110]; //,/.
        const delimiterPosition = [2, 5];
        const backspaceKey = 8;
        const deleteKey = 46;
        const cursorPosition = this.value.length;
        let inputValue = this.value;
        const keyCode = e.keyCode;

        const checkDelimiter = allDelimitersCode.includes(keyCode);
        const needAddDelimiter = delimiterPosition.includes(cursorPosition);

        if ( keyCode < 47 || keyCode > 57) {
            e.preventDefault();
        }


        if ( needAddDelimiter ) {
            this.value += delimiter;
            if (checkDelimiter) {
                e.preventDefault();
            }
        }

        console.log('input: ' + inputValue);
        console.log('position: ' + cursorPosition);
        console.log('key: ' + keyCode);
        console.log('length: ' + this.value.length);
    }

    window.addEventListener("DOMContentLoaded", addMaskListenerToDocument)