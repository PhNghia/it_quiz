import style from './FormLinkAccount.module.css'

class ValidateForm {
    constructor(element, callback) {
        this.element = element;
        this.callback = callback;
        this.inputs = [];
        // can be have more attributes
    }

    setupSubmit() {
        this.element.onsubmit = this.submit.bind(this)
    }

    submit(e) {
        e.preventDefault()
        let isValid = true
        for (let input of this.inputs) {
            if (!input.run()) {
                isValid = false
            }
        }
        if (isValid) {
            this.callback()
        }
    }
}

class ValidateInput {
    constructor(element, minLength) {
        this.element = element
        this.messageErrorElement = element.nextElementSibling
        this.minLength = minLength
    }

    setupQueue(queue) {
        this.queue = queue
    }

    run() {
        let isValid = true
        for (let cb of this.queue) {
            if (!cb.call(this)) {
                isValid = false
                break
            }
        }
        if (isValid) {
            this.element.classList.remove(style['error'])
            this.messageErrorElement.innerText = ""
            return true
        }
        this.element.classList.add(style['error'])
        return false
    }

    required() {
        if (this.element.value.trim()) return true
        this.messageErrorElement.innerText = "Vui lòng nhập trường này!"
        return false
    }

    email() {
        const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (this.element.value.trim().match(emailFormat)) return true
        this.messageErrorElement.innerText = "Email không hợp lệ"
        return false
    }

    password() {
        if (this.element.value.trim().length >= this.minLength) {
            if (this.passwordConfirmClass && this.passwordConfirmClass.element.value.trim()) {
                this.passwordConfirmClass.run()
            }
            return true
        }
        this.messageErrorElement.innerText = "Mật khẩu cần ít nhất " + this.minLength + " kí tự"
        return false
    }

    passwordConfirm() {
        // need set attribue password
        if (this.element.value.trim() === this.passwordClass.element.value.trim()) return true
        this.messageErrorElement.innerText = "Xác nhận mật khẩu chưa chính xác"
    }
}

export { ValidateForm, ValidateInput } 