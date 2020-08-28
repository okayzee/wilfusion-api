const constraints = {
    email: {
      presence: {
        message: "field cannot be blank."
      },
      email: {
        message: 'invalid. please enter a valid email address'
      }
    },
    password: {
      presence: {
        message: "field cannot be blank."
      },
      length: {
        minimum: 6,
        message: 'must be at least 6 characters.'
      }
    },
    firstName: {
        presence: {
            message: "field cannot be blank."
        },
        length: {
            minimum: 2,
            message: 'must be at least 2 characters.'
        }
    },
    lastName: {
        presence: {
            message: "field cannot be blank."
        },
        length: {
            minimum: 2,
            message: 'must be at least 2 characters.'
        }
    },
    mobile: {
        presence: {
            message: "field cannot be blank."
        },
        length: {
            minimum: 10,
            message: 'must be 10 characters.'
        }
    },
    companyName: {
        presence: {
            message: "field cannot be blank."
        },
        length: {
            minimum: 2,
            message: 'must be at least 2 characters.'
        }
    },
    streetAddress: {
        presence: {
            message: "field cannot be blank."
        },
        length: {
            minimum: 2,
            message: 'must be at least 2 characters.'
        } 
    },
    city: {
        presence: {
            message: "field cannot be blank."
        },
        length: {
            minimum: 2,
            message: 'must be at least 2 characters.'
        } 
    },
    state: {
        presence: {
            message: "field cannot be blank."
        },
        length: {
            minimum: 2,
            message: 'must be at least 2 characters.'
        } 
    },
  };

// export default constraints;
module.exports = constraints;