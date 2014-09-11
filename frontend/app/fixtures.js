var fixtures = {
    user: {
        id: "1a73636d",
        name: "Mike",
        deposit: 12
    },
    trades: {
        'f70097659f329a09': {
            id: 'f70097659f329a09',
            type: 'buy',
            description: 'Garden gnome',
            price: 12,
            buyerId: '1a73636d',
            sellerId: '91c24063',
            state: 'NEW',
            expiration: '31/12/2014',
            escrowPct: 100.0,
            insurancePct: 50.0,
            references: [{
                id: 'f7009765',
                insurerId: 'f7009765',
                liability: 6,
                premiumPct: 10.0
            }]
        },
        'e92113a5cb209c12': {
            id: 'e92113a5cb209c12',
            type: 'sell',
            description: 'Lawnmower',
            price: 66,
            sellerId: '1a73636d',
            state: 'NEW',
            expiration: '15/10/2014',
            escrowPct: 100.0,
            insurancePct: 50.0,
            references: [{
                id: 'f7009765',
                insurerId: 'f7009765',
                liability: 6,
                premiumPct: 10.0
            }]
        }
    },
    referencesList: [
    {
        id: 'f7009765',
        traderId: '91c24063',
        maxLiability: 12,
        premiumPct: 10,
        lockedLiability: 6
    },
    {
        id: '812d3340',
        traderId: '12345678',
        maxLiability: 0,
        premiumPct: 0,
        lockedLiability: 0
    }],
    contacts: {
        '91c24063': {
            id: '91c24063',
            name: 'Andrew'
        },
        'f7009765': {
            id: 'f7009765',
            name: 'John'
        }
    }
};

module.exports = fixtures;
