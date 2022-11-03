const { spawn } = require("child_process");

async function runAtop() {
    return new Promise((resolve, reject) => {
        const com = spawn("atop", []);

        const extract_comman = (data) => {
            //console.log(data);
            let mainInfo = data[0];
            let restData = data.splice(1);
            let result = {};
            restData.forEach(element => {
                let key = ' ';
                let value = ' ';
                if (element[1] !== ' ') {
                    for (let i = 1; i < element.length; i++) {
                        if (element[i] === ' ') {
                            key = element.slice(1, i + 1).trim();
                            value = element.slice(i).trim();
                            var k = i + 1;
                            break;
                        }
                    }
                }
                else {
                    if (element !== ' ') {
                        value = element.trim();
                    }
                }
                if (element !== '') {
                    result[key] = value;
                }
            });
            //console.log('data', result);
            return { key: mainInfo, value: result };
        }

        let extractCommanData = (data) => {
            let result = {};
            function data_Process(data) {
                let list = data.split(" |");
                res = extract_comman(list);
                //console.log(res.value);
                result[res.key] = result[res.key] === undefined ? [res.value] : [...result[res.key], res.value];
                return result;
            }
            data.forEach(data_Process);
            return result
        }

        let extractMainData = (data) => {
            let result = [];
            // console.log("length",data.length);
            let list = data.split('\n');
            let heading = list[1].split(' ').filter((value) => {
                return value !== '';
            })
            for (let i = 2; i < list.length; i++) {
                let lis = list[i].split(' ').filter((value) => {
                    return value !== '';
                });
                if (lis.length > 0) {
                    let temp = {}
                    for (let j = 0; j < lis.length; j++) {
                        temp[heading[j]] = lis[j];
                    }
                    result.push(temp);
                }
                //console.log(lis);
            }
            return result;
        }
        let primeData;
        function store(list) {
            primeData = primeData == undefined ? list : Buffer.concat([primeData, list], primeData.length + list.length);
        }

        com.stdout.on("data", data => {
            if (data.length > 1) {
                store(data);
            }
        });
        setTimeout(() => {
            com.kill();
        }, 100);

        com.stderr.on("data", data => {
            console.log(`error: ${data}`);
        });

        com.on('error', error => {
            console.log(`error:${error}`);
        });

        com.on('close', code => {
            console.log(`code: ${code}`);
            let list = primeData.toString().split("|\n");
            //console.log(list);
            let commanData = list.slice(0, -1);
            let head = commanData[0].split('\n')[0];
            commanData[0] = commanData[0].replace(head + '\n', '')
            let mainData = list.slice(-1)[0];
            let commanInfo = extractCommanData(commanData);
            let mainInfo = extractMainData(mainData);
            //console.log("list", result);
            if (commanInfo && mainInfo) {
                resolve({ commanInfo, mainInfo });
            }
            else {
                reject("fail");
            }
        });
    })
}

module.exports = {runAtop}

//runAtop().then((r) => { console.log(r) })
//setInterval(()=>{com.send('hello')},1000);