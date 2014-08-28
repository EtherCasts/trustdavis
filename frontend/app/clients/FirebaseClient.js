var Firebase = require("Firebase");

var FirebaseClient = {

    firebaseRef: new Firebase('https://flickering-heat-4989.firebaseio.com/'),

    load: function(success, failure) {
        this.firebaseRef.child('contacts').once('value', function(dataSnapshot) {
            success(dataSnapshot.val());
        }, failure);
    },

    set: function(contact, success, failure) {
        this.firebaseRef.child('contacts/' + contact.id).set(contact, function onComplete(error) {
            if (error) {
                failure(error);
            } else {
                success(contact);
            }
        });
    },

    remove: function(contact, success, failure) {
        this.firebaseRef.child('contacts/' + contact.id).remove(function onComplete(error) {
            if (error) {
                failure(error);
            } else {
                success(contact);
            }
        });
    }
};

module.exports = FirebaseClient;
