const os = require('os');
const _ = require('lodash');

const getCPUUsage = () => {
    let cpus = os.cpus();
    let total = _(cpus)
        .map(cpu => _(cpu.times).values().sum())
        .sum();
    let idle = _(cpus)
        .map(cpu => cpu.times['idle'])
        .sum();
    return {
        'idle': idle,
        'total': total
    };
};

const getCPUUsageDelay = (wait) => new Promise(resolve => _.delay(() => resolve(getCPUUsage()), wait));

const getCPUPercent = async () => {
    let start = getCPUUsage();
    let end = await getCPUUsageDelay(1000);

    let idle = end.idle - start.idle;
    let total = end.total - start.total;
    return 1 - idle / total;
};

const getMEMPercent = () => 1 - os.freemem() / os.totalmem();

module.exports = {
    getCPUPercent: getCPUPercent,
    getMEMPercent: getMEMPercent
};
