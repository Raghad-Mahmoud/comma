//const emailRegularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//const phoneRegularExpression = /^\+\d{1,3}\s\d{9}$/;

// * first name validation
/*
  validate: {
    validator: function (v) {
      return /^[a-zA-Z\s]+$/.test(v) || /^[\u0621-\u064A\s]+$/.test(v);
    },
    message: 'First name can only contain English letters with a space or Arabic letters with a space',
  },
  */

// * email validator
/* 
  validate: { 
    validator: function (v) {
      return emailRegularExpression.test(v);
    },
    message: (props) => `${props.value} is not a valid email address!`,
  },
*/

// * create learner validator
/**
 * learnerSchema.pre('save', function (next) {
    const learner = this;
  
    if (!learner.isModified('password')) {
      return next();
    }
  
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
  
      bcrypt.hash(learner.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
  
        learner.password = hash;
        next();
      });
    });
  });
  learnerSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) {
        return callback(err);
      }
  
      callback(null, isMatch);
    });
  };
 */
