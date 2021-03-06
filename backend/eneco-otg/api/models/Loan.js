/**
 * Loan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    card: {
      model: 'card',
      required: true
    },
    powerbank: {
      model: 'powerbank',
      required: true
    },
    loanedAt: {
      type: 'datetime'
    },
    returnedAt: {
      type: 'datetime'
    },
    status: {
      type: 'string',
      enum: ['inactive', 'loaned', 'returned'],
      defaultsTo: 'inactive'
    }
  },
  beforeValidate: (values, cb) => {
    if(values.hasOwnProperty('cardIdentifier')) {
      Card
        .findOne({
          identifier: values.cardIdentifier
        })
        .then(card => {
          if(!card) {
            throw new sails.NotFoundError('Card doesn\'t exist')
          }
          delete values.cardIdentifier
          values.card = card.id
          cb()
        })
        .catch(err => {
          console.error('[Loan.beforeValidate] Error: ', err)
          cb(err)
        })
    } else {
      cb()
    }
  }
};

