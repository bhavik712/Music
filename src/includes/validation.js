import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage,
  defineRule,
  configure
} from 'vee-validate'

import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
  alpha_num as alphaNum,
  not_one_of as excluded
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('vee-form', VeeForm)
    app.component('vee-field', VeeField)
    app.component('error-message', ErrorMessage)

    // imported required rule and will use as requiredfield
    defineRule('requiredField', required)
    defineRule('minFieldLength', min)
    defineRule('maxFieldLength', max)
    defineRule('alphaSpaces', alphaSpaces)
    defineRule('validateEmail', email)
    defineRule('minFieldValue', minValue)
    defineRule('maxFieldValue', maxValue)
    defineRule('confirmPassword', confirmed)
    defineRule('alphaNum', alphaNum)
    defineRule('excluded', excluded)

    configure({
      generateMessage: (context) => {
        const messages = {
          requiredField: `${context.field} is required`,
          minFieldLength: `${context.field} length is less.`,
          maxFieldLength: `${context.field} length is more `,
          alphaSpaces: `${context.field} does not contain numbers`,
          validateEmail: `${context.field} is not valid`,
          minFieldValue: `${context.field} should be more than 18.`,
          maxFieldValue: `${context.field} should be less than 130`,
          confirmPassword: `${context.field}  should be same as above`,
          alphaNum: `${context.field} should only contains alpha and numbers`,
          excluded: `due to some reasons we are not excepting users from this country`
        }
        const message = messages[context.rule.name]
          ? messages[context.rule.name]
          : `${context.field} is invalid`

        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    })
  }
}
