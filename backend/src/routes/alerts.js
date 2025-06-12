import express from 'express';

const router = express.Router();

const alerts = [];

router.post('/', (req, res) => {
    const {userId, symbol, threshold, direction} = req.body;
    if (!userId || !symbol || !threshold || !direction) {
        return res.status(400).json({message: 'Missing fields'});
    }
    alerts.push({userId, symbol, threshold, direction});
    res.status(201).json({message: 'Alert created'});
});


router.get('/', (req, res) => {
    res.json(alerts);
});


router.delete('/:symbol/:threshold/:direction', (req, res) => {
    const {symbol, threshold, direction} = req.params;
    const index = alerts.findIndex(a =>
        a.symbol === symbol &&
        a.threshold === parseFloat(threshold) &&
        a.direction === direction
    );

    if (index !== -1) {
        alerts.splice(index, 1);
        return res.status(200).json({message: 'Alarm gelöscht'});
    }

    res.status(404).json({message: 'Nicht gefunden'});
});

export {router, alerts};
