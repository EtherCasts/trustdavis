var Firebase = require("Firebase");

var utils = require("../utils");

var FirebaseClient = function(firebaseRef) {

    this.loadTrades = function(success, failure) {
        _firebaseRef.child('trade').once('value', function(data) {
            var trades = data.val() || {};
            success(trades);
        }, failure);
    };

    this.setTrade = function(trade, success, failure) {
        _firebaseRef.child('trade').child(trade.id)
                    .set(trade, this._onComplete(trade, success, failure));
    };

    this.loadReferences = function(success, failure) {
        var uid = this.UID();
        _firebaseRef.child('reference').child(uid).once('value', function(data) {
            var references = data.val() || {};
            success(references);
        }, failure);
    };

    this.setReference = function(reference, success, failure) {
        var uid = this.UID();
        _firebaseRef.child('reference').child(uid).child(reference.id)
                    .set(reference, this._onComplete(reference, success, failure));
    };

    this.removeReference = function(reference, success, failure) {
        var uid = this.UID();
        _firebaseRef.child('reference').child(uid).child(reference.id)
                    .remove(this._onComplete(reference, success, failure));
    };

    this.loadContacts = function(success, failure) {
        var uid = this.UID();
        _firebaseRef.child('contact').child(uid).once('value', function(data) {
            var contacts = data.val() || {};
            success(contacts);
        }, failure);
    };

    this.addContact = function(contact, success, failure) {
        var uid = this.UID();
        _firebaseRef.child('contact').child(uid).child(contact.id)
                    .set(true, this._onComplete(contact, success, failure));
    };

    this.removeContact = function(contactId, success, failure) {
        var uid = this.UID();
        _firebaseRef.child('contact').child(uid).child(contactId)
                    .remove(this._onComplete(contactId, success, failure));
    };

    this.UID = function() {
        /* global localStorage */
        var uidKey = 'trustdavis:uid';
        var uid = localStorage.getItem(uidKey);
        if (!uid) {
            uid = utils.randomId();
            localStorage.setItem(uidKey, uid);
        }
        return(uid);
    };

    this.loadUsers = function(success, failure) {
        _firebaseRef.child('user').once('value', function(data) {
            var users = data.val() || {};
            success(users);
        }, failure);
    };

    this.listenCurrentUser = function(callback) {
        var uid = this.UID();
        _firebaseRef.child('user').child(uid).on('value', function(data) {
            var user = data.val();
            if (!user.id) {
                user.id = uid;
            }
            callback(user);
        });
    };

    this.setUserName = function(name, success, failure) {
        var uid = this.UID();
        _firebaseRef.child('user').child(uid)
                    .update({name: name}, this._onComplete(name, success, failure));
    };

    this.depositUser = function(amount, success, failure) {
        var uid = this.UID();
        _firebaseRef.child('user').child(uid).child('deposit').transaction(function(currentDeposit) {
            return currentDeposit += amount;
        }, this._onComplete(amount, success, failure));
    };

    this.withdrawUser = function(amount, success, failure) {
        var uid = this.UID();
        _firebaseRef.child('user').child(uid).child('deposit').transaction(function(currentDeposit) {
            if (amount > currentDeposit) {
                return currentDeposit;
            }
            return currentDeposit -= amount;
        }, this._onComplete(amount, success, failure));
    };

    this.ref = function() {
        return _firebaseRef;
    };

    this._onComplete = function(item, success, failure) {
        return function(error) {
            if (error) {
                failure(error);
            } else {
                success(item);
            }
        };
    };

    if (firebaseRef instanceof Firebase === false) {
        throw new Error("firebaseRef must be an instance of Firebase");
    }

    var _firebaseRef = firebaseRef;
};

module.exports = FirebaseClient;
