const constraints = require('./constraints');
const validate = require('validate.js');

const validator = (field, value) => {
    // Creates an object based on the field name and field value
    // e.g. let object = {email: 'email@example.com'}
    let object = {}
    object[field] = value
  
    let constraint = constraints[field]
    console.log(object, constraint)
  
    // Validate against the constraint and hold the error messages
    const result = validate(object, { [field]: constraint })
    console.log(object, constraint, result)
  
    // If there is an error message, return it!
    if (result) {
      // Return only the field error message if there are multiple
      return result[field][0]
    }
  
    return null
  }

// export default validator;
module.exports = validator;