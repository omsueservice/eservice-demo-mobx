interface IValidationFormProps {
    value: string | number
    type?: string
    minLength?: number
    maxLength?: number
    minValue?: number
    maxValue?: number
    pattern?: string
    patternError?: string
}
export default (props: IValidationFormProps): string[] => {
    const errors: string[] = []
    const controlTypes = { TEXT: 'text', NUMBER: 'number', PASSWORD: 'password', EMAIL: 'email' }
    const templatesErrors = {
        requiredError: 'Обязательное поле!',
        minLengthError: `Поле должно содержать минимум ${props.minLength} симв!`,
        maxLengthError: `Поле должно содержать максимум ${props.maxLength} симв!`,
        minValueError: `Поле должно содержать значение не менее ${props.minValue}!`,
        maxValueError: `Поле должно содержать значение не более ${props.maxValue}!`,
        emailError: 'Поле не соответствует типу электронной почты!',
    }

    String(props.value).length === 0 && errors.push(templatesErrors.requiredError)

    if (controlTypes.EMAIL === props.type) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        !re.test(String(props.value).toLowerCase()) && errors.push(templatesErrors.emailError)
    }

    if ('text number password'.includes(props.type)) {
        props.minLength && String(props.value).length < props.minLength && errors.push(templatesErrors.minLengthError)
        props.maxLength && String(props.value).length > props.maxLength && errors.push(templatesErrors.maxLengthError)
        props.minValue && props.value < props.minValue && errors.push(templatesErrors.minValueError)
        props.maxValue && props.value > props.maxValue && errors.push(templatesErrors.maxValueError)
    }

    if (props.pattern && String(props.value).length > 0) {
        const regExp = new RegExp(props.pattern)
        regExp.test(String(props.value))

        if (!regExp.test(String(props.value))) errors.push(props.patternError)
    }

    console.log(errors)
    return errors
}
