var fixtures = {
    user: {
        id: "1a73636d",
        name: "Mike"
    },
    tradeList : [{
        id: 'f70097659f329a09',
        type: 'buy',
        category: 'product',
        description: 'Garden gnome',
        price: 12,
        counterparty: { id: '91c24063', name: 'Andrew' },
        status: 'new',
        expiration: '31/12/2014'
    }, {
        id: 'e92113a5cb209c12',
        type: 'sell',
        category: 'product',
        description: 'Lawnmower',
        price: 66,
        counterparty: undefined,
        status: 'new',
        expiration: '15/10/2014'
    }],
    tradeDetails: {
        id: 'f70097659f329a09',
        type: 'buy',
        buyer: { id: '1a73636d', name: 'Mike' },
        seller: { id: '91c24063', name: 'Andrew' },
        category: 'product',
        description: 'Garden gnome',
        price: 12.0,
        expiration: '31/12/2014',
        escrowPct: 100.0,
        insurancePct: 50.0,
        statusText: 'awaiting insurance'
    },
    tradeReferenceList: [{
        id: 'f7009765',
        insurer: { id: 'f7009765', name: 'John' },
        liability: 6,
        premiumPct: 10.0
    }],
    references: {
        maxLiabilities: 12,
        lockedLiabilities: 6,
        insuredTrades: 15,
        claims: 3,
        profit: 8,
        deposit: 12
    },
    referencesList: [{
        id: 'f7009765',
        trader: { id: '91c24063', name: 'Andrew' },
        maxLiability: 6,
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
