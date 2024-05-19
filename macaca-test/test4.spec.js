const { sleep } = require('app-inspector/lib/common/helper');
const { exec } = require('child_process');
var wd = require('macaca-wd');
var index = 21;
var element_length = 21;
var positon = 15;
var elements;
var remoteConfig = {
    host: 'localhost',
    port: 3456 // Macaca server 默认使用 3456 端口
};

var driver = wd.promiseChainRemote(remoteConfig);

async function runTest() {
    try {
        await driver.init({
            platformName: 'Android',
            autoAcceptAlerts: false,
            package: 'com.android.chrome',
            udid: 'a283551'
        });
        await driver.sleep(1000); // 等待应用加载

        console.log('应用已成功启动！');
        if (await driver.hasElementById('com.android.chrome:id/signin_fre_continue_button')) {
            await driver.waitForElementById('com.android.chrome:id/signin_fre_continue_button', 1000).click();
        }

        if (await driver.hasElementById('com.android.chrome:id/button_secondary')) {
            await driver.waitForElementById('com.android.chrome:id/button_secondary', 1000).click();
        }
        if (await driver.hasElementById('com.android.chrome:id/no_button')) {
            await driver.waitForElementById('com.android.chrome:id/no_button', 1000).click();
        }
        await driver.sleep(3000);
        if (await driver.hasElementById('com.android.chrome:id/ack_button')) {
            await driver.waitForElementById('com.android.chrome:id/ack_button', 1000).click();
        }
        if (await driver.hasElementById('com.android.chrome:id/button_secondary')) {
            await driver.waitForElementById('com.android.chrome:id/button_secondary', 1000).click();
        }

        var topBar = await driver.waitForElementById('com.android.chrome:id/search_box_text', 1000);

        var link = ['https://www.baidu.com'];
        for (let i = 0; i < link.length; i++) {
            if (topBar) {
                await topBar.click();
                await driver.sleep(1000);
                await driver.waitForElementById('com.android.chrome:id/url_bar', 1000).sendKeys(link[i]);
                await driver.keys('\uE007');
                console.log('网址输入完成并访问');
            } else {
                console.error('未能找到URL输入栏');
            }
            await driver.sleep(2000);
        }
        await driver.back();
        await driver.sleep(2000);

        if (index <= element_length) {
            await clash();
        }
    } catch (e) {
        console.error('启动应用时出错:', e);
        if (e.data.includes('Internal Server Error') || e.error.includes('[init({"platformName":"Android","reuse":true,"autoAcceptAlerts":false,"package":"com.android.chrome","udid":"a283551"})]')) {
            console.error('进入命令:', e.data);
            adbExec();
            console.error('执行命令:', e.data);
        }

    } finally {
        console.log('测试结束');
    }
}

async function scrollElementIntoView(driver, element) {
    if (!element) {
        throw new Error("Element is undefined");
    }
    const size = await driver.getWindowSize();
    const startX = size.width / 2;
    const startY = size.height * 3 / 4;
    const endY = size.height / 5;

    await driver.touch('drag', {
        fromX: startX,
        fromY: startY,
        toX: startX,
        toY: endY,
        duration: 1
    });
}

async function updateElements(driver, elements) {
    await driver.waitForElementByXPath('//androidx.recyclerview.widget.RecyclerView', 1000);
    let newElements = await driver.elementsByXPath('//androidx.recyclerview.widget.RecyclerView/android.view.View');

    const elementMap = new Map();
    elements.forEach((el) => {
        elementMap.set(el.value, el);
    });

    newElements.forEach((el) => {
        elementMap.set(el.value, el);
    });

    elements = Array.from(elementMap.values());
    return elements;
}

async function clash() {
    await driver.init({
        platformName: 'Android',
        reuse: 1000000,
        autoAcceptAlerts: false,
        package: 'com.github.kr328.clash',
        udid: 'a283551'
    });

    await driver.waitForElementByName('⚓ 节点选择', 1000).click();
    await driver.sleep(2000);
    await driver.waitForElementByXPath('//androidx.recyclerview.widget.RecyclerView', 1000);

    elements = await driver.elementsByXPath('//androidx.recyclerview.widget.RecyclerView/android.view.View');
    element_length = elements.length;
    var element = elements[index];

    while (element == undefined || !(await element.isDisplayed()) || index > element_length) {
        await scrollElementIntoView(driver, elements[positon]);
        await driver.sleep(1000);
        elements = await updateElements(driver, elements);
        element_length = elements.length;
        element = elements[index];
    }

    await elements[index].click();
    console.log('执行到第几个IP', index);
    await driver.sleep(1000);
    index++;
    runTest();
}

async function adbExec() {
    const adbCommand = 'adb devices';
    console.log('执行方法', exec);

    await exec(adbCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('执行 adb 命令时出错:', error.message);
            return;
        }
        if (stderr) {
            console.error('adb 命令输出错误:', stderr);
            return;
        }
        console.log('执行 devices:', stdout, driver.udid);
        if (stdout.includes(driver.udid)) {
            runTest();
        } else {
            sleep(1000);
            exec('adb kill-server', (error, stdout, stderr) => {
                if (error) {
                    console.error('执行 adb 命令时出错:', error.message);
                    return;
                }
                if (stderr) {
                    console.error('adb 命令输出错误:', stderr);
                    return;
                }
                console.log('执行 kill');
                sleep(1000);
                exec('adb start-server', (error, stdout, stderr) => {
                    if (error) {
                        console.error('执行 adb 命令时出错:', error.message);
                        return;
                    }
                    if (stderr) {
                        console.error('adb 命令输出错误:', stderr);
                        return;
                    }
                    sleep(1000);
                    adbExec();
                    console.log('执行 start');
                });
            });
        }
        console.log('adb 命令输出:', stdout);
    });
}

runTest();