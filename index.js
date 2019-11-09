const q = require('daskeyboard-applet');
const util = require('./util');

const colors = [
    '#00FF00', '#00FF00', '#00FF00', '#00FF00', '#FFFF00',
    '#FFFF00', '#FF0000', '#FF0000', '#FF0000', '#FF0000'
];

class Usage extends q.DesktopApp {
    constructor() {
        super();
        this.pollingInterval = 3000;
    }

    async run() {
        let percent = 0;
        switch (this.config.displayType) {
            case 'CPU':
                percent = await util.getCPUPercent();
                break;
            case 'RAM':
                percent = util.getMEMPercent();
                break
        }
        return new q.Signal({
            points: [this.generatePoints(percent)],
            isMuted: true
        });
    }

    generatePoints(percent) {
        const numberOfKeys = 10;
        const numberOfKeysToLight = Math.round(numberOfKeys * percent);

        let points = [];
        for (let i = 0; i < numberOfKeys; i++) {
            points.push(new q.Point(this.getColor(i, numberOfKeysToLight)));
        }
        return points;
    }

    getColor(zoneIndex, numberOfKeysToLight) {
        if (zoneIndex >= numberOfKeysToLight) {
            return '#000000';
        } else {
            return colors[zoneIndex];
        }
    }
}

const usage = new Usage();
