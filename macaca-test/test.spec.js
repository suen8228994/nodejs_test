

 const fs = require('fs');
var gm = require('gm');
const path = require('path');
const cp = require('child_process');
const chai = require("chai");
const should = chai.should();
const JWebDriver = require('jwebdriver');
chai.use(JWebDriver.chaiSupportChainPromise);
const resemble = require('resemblejs-node');
resemble.outputSettings({
    errorType: 'flatDifferenceIntensity'
});

const rootPath = getRootPath();
const appPath = '{apkname}';
const platformName = 'Android';

module.exports = function () {

    var driver, testVars, selfvar;

    before(function () {
        var self = this;
        selfvar = self;
        driver = self.driver;
        testVars = self.testVars;
    });

    {privatescript}

    it('sleep', async function () {
        await driver.sleep(500);
    });

    for(var i=0; i<{dragnum};i++){
        it('drag: 388, 1425, 388, 1125, 0.25', async function(){
        await driver.sendActions('drag', {fromX: 388, fromY:1425, toX:388, toY:1025, duration: 0.25});
    
         })
     } 

    function _(str) {
        if (typeof str === 'string') {
            return str.replace(/\{\{(.+?)\}\}/g, function (all, key) {
                return testVars[key] || '';
            });
        } else {
            return str;
        }
    }

};

if (module.parent && /mocha\.js/.test(module.parent.id)) {
    runThisSpec();
}

function runThisSpec() {
    // read config
    let config = require(rootPath + '/config.json');
    let webdriverConfig = Object.assign({}, config.webdriver);
    let host = webdriverConfig.host;
    let port = {webdriverPort} || 4455;
    let testVars = config.vars;

    let specName = path.relative(rootPath, __filename).replace(/\\/g, '/').replace(/\.js$/, '');
    var device = {
        name: '{devicename}',
        udid: '{deviceudid}'
    }

    let caseName = device.name;

    describe(caseName, function () {

        this.timeout(180000);
        this.slow(1000);

        before(function () {
            let self = this;
            selfvar = self;
            let driver = new JWebDriver({
                'host': host,
                'port': port
            });
            self.driver = driver.session({
                'platformName': platformName,
                'udid': device.udid,
                'reuse': 3,
                'app': /^(\/|[a-z]:\\|https?:\/\/)/i.test(appPath) ? appPath : rootPath + '/' + appPath
            });
            self.testVars = testVars;
            let casePath = path.dirname(caseName);
            self.screenshotPath = '{relativepath}' + '/screenshots/' + casePath;
            self.caseName = caseName.replace(/.*\//g, '').replace(/\s*[:\.\:\-\s]\s*/g, '_');
            mkdirs(self.screenshotPath);
            self.stepId = 0;
            return self.driver;
        });

        module.exports();

        beforeEach(function () {
            let self = this;
            self.stepId++;
        });

        let displayed = 0;
        let hasPublicScript = {hasPublicScript};

        afterEach(async function () {
            let self = this;
            let casetitle = self.currentTest.title.replace(/.*\//g, '').replace(/\s*[:\.\,\)\:\-\s]\s*/g, '');
            let filepath = self.screenshotPath + '/' + '{imgFileName}' + '_' + self.stepId + '_' + self.currentTest.state + '_' + Date.now();
            let driver = self.driver;
            var myText = '{advertContent}';
            try {
                if (casetitle.indexOf('%NOSCREENSHOT%') < 0) {
                    let touch = {x: 0, y: 0};
                    if ({markedRedLine}) {
                        await driver.wait('TEXT_CONTAINS', myText, 1000).getScreenshot(filepath + '.png').rect().then(function (positon) {
                            console.log(myText + ' displayed');
                            displayed = displayed + 1;
                            try {
                                gm(filepath + '.png')
                                    .write(filepath + '.jpg', function (err) {
                                        if (err) {
                                            console.log(err)
                                        }
                                    });

                                gm(filepath + '.png')
                                    .fill('#FFFFFFFF')//设置颜色
                                    .stroke("#FF0000")
                                    .strokeWidth(10)
                                    .drawRectangle(positon.x, positon.y, (positon.x + positon.width) * 0.98, (positon.y + positon.height))
                                    .write(filepath + '.png', function (err) {
                                        if (err) {
                                            console.log(err)
                                        }
                                    });

                                touch.x = positon.x + positon.width * 0.5;
                                touch.y = positon.y + positon.height * 0.5;
                            } catch (ex) {
                                console.log(ex)
                            }

                        });
                    } else {
                        var elements = await driver.wait('TEXT_CONTAINS', myText, 1000);
                        if (elements.length >= 1) {
                            console.log(myText + ' displayed');
                            displayed = displayed + 1;
                            await driver.getScreenshot(filepath + '.png').rect().then(function (positon) {
                                touch.x = positon.x + positon.width * 0.5;
                                touch.y = positon.y + positon.height * 0.5;
                            });
                        }
                    }

                    if (touch.x > 0 && hasPublicScript && displayed > 1) {
                        console.log('广告清零:driver.sendActions(tap, {x:' + touch.x + ', y:' + touch.y + '})');
                        await driver.sendActions('tap', {x: touch.x, y: touch.y}).sleep(2000)
                    }
                }
            } catch (e) {
                console.log('afterEach error:' + e.message, e);
            }
        });

        after(function () {
            return this.driver.close();
        });

    });

}

function getRootPath() {
    let rootPath = path.resolve(__dirname);
    while (rootPath) {
        if (fs.existsSync(rootPath + '/config.json')) {
            break;
        }
        rootPath = rootPath.substring(0, rootPath.lastIndexOf(path.sep));
    }
    return rootPath;
}

function mkdirs(dirname) {
    try {
        if (fs.existsSync(dirname)) {
            return true;
        } else {
            if (mkdirs(path.dirname(dirname))) {
                fs.mkdirSync(dirname);
                return true;
            }
        }
    } catch (e) {
        console.log('目录已经存在');
    }
}
