var fixtures = {
    user: {
        id: "1a73636d",
        name: "Mike",
        deposit: 12
    },
    tradeList : [{
        id: 'f70097659f329a09',
        type: 'buy',
        category: 'product',
        description: 'Garden gnome',
        price: 12,
        buyer: { id: '1a73636d', name: 'Mike' },
        seller: { id: '91c24063', name: 'Andrew' },
        status: 'new',
        expiration: '31/12/2014',
        escrowPct: 100.0,
        insurancePct: 50.0,
        statusText: 'awaiting insurance',
        references: [{
            id: 'f7009765',
            insurer: { id: 'f7009765', name: 'John' },
            liability: 6,
            premiumPct: 10.0
        }]
    }, {
        id: 'e92113a5cb209c12',
        type: 'sell',
        category: 'product',
        description: 'Lawnmower',
        price: 66,
        seller: { id: '1a73636d', name: 'Mike' },
        status: 'new',
        expiration: '15/10/2014',
        escrowPct: 100.0,
        insurancePct: 50.0,
        statusText: 'awaiting insurance',
        references: [{
            id: 'f7009765',
            insurer: { id: 'f7009765', name: 'John' },
            liability: 6,
            premiumPct: 10.0
        }]
    }],
    referencesList: [{
        id: 'f7009765',
        trader: { id: '91c24063', name: 'Andrew' },
        maxLiability: 12,
        premiumPct: 10,
        lockedLiability: 6
    }],
    contactList: [{
        id: '91c24063',
        name: 'Andrew'
    }, {
        id: 'f7009765',
        name: 'John'
    }]
};

module.exports = fixtures;
