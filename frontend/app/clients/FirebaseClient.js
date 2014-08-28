var Firebase = require("Firebase");

var FirebaseClient = function(firebaseRef) {

    this.ref = function() {
        return _firebaseRef;
    };

    this.load = function(success, failure) {
        _firebaseRef.child('contacts').once('value', function(dataSnapshot) {
            success(dataSnapshot.val());
        }, failure);
    };

    this.set = function(contact, success, failure) {
        _firebaseRef.child('contacts/' + contact.id).set(contact, function onComplete(error) {
            if (error) {
                failure(error);
            } else {
                success(contact);
            }
        });
    };

    this.remove = function(contact, success, failure) {
        _firebaseRef.child('contacts/' + contact.id).remove(function onComplete(error) {
            if (error) {
                failure(error);
            } else {
                success(contact);
            }
        });
    };

    if (firebaseRef instanceof Firebase === false) {
        throw new Error("firebaseRef must be an instance of Firebase");
    }

    var _firebaseRef = firebaseRef;
};

module.exports = FirebaseClient;
