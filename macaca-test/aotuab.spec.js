const { sleep } = require('helper');
const { exec } = require('child_process');
const { log } = require('console');
const chai = require("chai");
const should = chai.should();
const JWebDriver = require('jwebdriver');
chai.use(JWebDriver.chaiSupportChainPromise);
var wd = require('macaca-wd');
const { E } = require('macaca-android/lib/key-map');
var index = 25;
var element_length = 25;
var positon = 15;
var count = 1;
var elements;
var webDriver;


var remoteConfig = {
  host: 'localhost',
  port: 3456 // Macaca server 默认使用 3456 端口
};
var driver = wd.promiseChainRemote(remoteConfig);
var topBar;
var link;
async function runTest() {
  try {
    await driver.init({
      platformName: 'Android',
      autoAcceptAlerts: false,
      reuse:0,
      package: 'org.mozilla.firefox',
      // udid: '192.168.1.199:5555'
      udid:'192.168.1.198:5555'
    });

    console.log('应用已成功启动！');
    for (let i = 0; i < 4; i++) {
      try {
        if (await driver.hasElementByXPath('//*[@text="暂时不要"]')) {
          await driver.waitForElementByXPath('//*[@text="暂时不要"]', 100).click();
        }
      } catch (e) {

      }

    }
    if (await driver.hasElementById('org.mozilla.firefox:id/toolbar')) {
      await driver.elementById('org.mozilla.firefox:id/toolbar').click();
    }
    topBar = await driver.elementById('org.mozilla.firefox:id/mozac_browser_toolbar_edit_url_view');

    link = ['https://haodersese.com/']
    if (topBar) {
      await topBar.sendKeys(link[0]);
      await driver.keys('\uE007');
      console.log('网址输入完成并访问'+Date());
    } else {
      console.error('未能找到URL输入栏');
    }

    await clickAB();
    await startWuji();
    await clickWeiBa();
  } catch (e) {
    console.error('启动应用时出错:', e);
    if (e.message.includes('Internal Server Error') || e.message.includes('[init({"platformName":"Android","reuse":true,"autoAcceptAlerts":false')) {
      console.error('进入命令:', e.data);
      adbExec();
      console.error('执行命令:', e.data);
    }
    count = 1;
    await startWuji();
    await clickWeiBa();
  } finally {
    count = 1;
    runTest();

  }
}


// 定义 scrollElementIntoView 函数
async function scrollElementIntoView(driver, element) {
  if (!element) {
    throw new Error("Element is undefined");
  }
  const size = await driver.getWindowSize();
  const startX = size.width / 2;
  const startY = size.height * 3 / 4; // 从屏幕下方四分之三的位置开始
  const endY = size.height / 10; // 滑动到屏幕上方四分之一的位置

  // if (location.y > endY) {
  await driver.touch('drag', {
    fromX: startX,
    fromY: startY,
    toX: startX,
    toY: endY,
    duration: 1
  });
  // }
}

async function clickAB() {
  if (driver.defaultCapabilities.browserName == 'firefox') {
    console.log('进入点击--count==' + count);

    try {
      await driver.sleep(40000);
      if(driver.hasElementByXPath('//*[@resource-id="app"]/android.view.View[1]')){
        try{
          await driver.waitForElementByXPath('//*[@resource-id="app"]/android.view.View[1]',500);
        }catch(e){
          throw new Error('没加载出来');
        }

      }
      try {
        if (count == 1 && driver.hasElementByXPath('//*[@text="AdZone v2014.9.4 for haoder (https://haodersese.com/) SiteID: 298673 ZoneID: 1057966 | 8.12 -->"]/android.widget.GridView[1]/android.view.View[1]"]')) {
          await driver.waitForElementByXPath('//*[@text="AdZone v2014.9.4 for haoder (https://haodersese.com/) SiteID: 298673 ZoneID: 1057966 | 8.12 -->"]/android.widget.GridView[1]/android.view.View[1]', 1000).click();
          console.log('//*[@text="AdZone v2014.9.4 for haoder (https://haodersese.com/) SiteID: 298673 ZoneID: 1057966 | 8.12 -->"]/android.widget.GridView[1]/android.view.View[1]');
          count = 2;
          await driver.sleep(20000);
          driver.back();
          await driver.sleep(2000);
          try {
            await driver.waitForElementByXPath('//*[@text="AdZone v2014.9.4 for haoder (https://haodersese.com/) SiteID: 298673 ZoneID: 1057966 | 8.12 -->"]/android.widget.GridView[1]/android.view.View[1]', 100);
          } catch (e) {
            driver.back();
            await driver.sleep(2000);
          }

        } else {
          count = 2;
          console.log('count=' + count);
        }
      } catch (e) {
        count = 2;
        console.log('count=' + count);
        let topBarClick = await driver.waitForElementById('org.mozilla.firefox:id/mozac_browser_toolbar_url_view', 100);
        topBarClick.click();
        await driver.sleep(500);
        link = ['https://haodersese.com/']
        topBar = await driver.waitForElementById('org.mozilla.firefox:id/mozac_browser_toolbar_edit_url_view', 100);
        if (topBar) {
          await topBar.sendKeys(link[0]);
          await driver.keys('\uE007');
          console.log('网址输入完成并访问');
        } else {
          console.error('未能找到URL输入栏');
        }
        await driver.sleep(40000);
      }

      try {
        if (count == 2 && driver.hasElementByXPath('//*[@resource-id="atContainer-2b43c61ba5fd8dcd4c9ceb17be5c58f7"]')) {

          await driver.waitForElementByXPath('//*[@resource-id="atContainer-2b43c61ba5fd8dcd4c9ceb17be5c58f7"]', 1000).click();
          console.log('//*[@resource-id="atContainer-2b43c61ba5fd8dcd4c9ceb17be5c58f7"]');
          count = 3;
          await driver.sleep(20000);
          driver.back();
          await driver.sleep(2000);

        } else {
          count = 3;
          console.log('count=' + count);
        }
      } catch (e) {
        count = 3;
        console.log('count=' + count);
        let topBarClick = await driver.waitForElementById('org.mozilla.firefox:id/mozac_browser_toolbar_url_view', 100);
        topBarClick.click();
        await driver.sleep(500);
        link = ['https://haodersese.com/']
        topBar = await driver.waitForElementById('org.mozilla.firefox:id/mozac_browser_toolbar_edit_url_view', 100);
        if (topBar) {
          await topBar.sendKeys(link[0]);
          await driver.keys('\uE007');
          console.log('网址输入完成并访问');
        } else {
          console.error('未能找到URL输入栏');
        }

        await driver.sleep(40000);
      }


      try {
        if (count == 3 && driver.hasElementByXPath('//*[@resource-id="banner5"]/android.view.View[1]')) {

          await driver.waitForElementByXPath('//*[@resource-id="banner5"]/android.view.View[1]', 1000).click();
          console.log('//*[@resource-id="banner5"]/android.view.View[1]');
          count = 4;
          await driver.sleep(20000);
          driver.back();
          await driver.sleep(2000);

        } else {
          count = 4;
          console.log('count=' + count);
        }
      } catch (e) {
        count = 4;
        console.log('count=' + count);
        let topBarClick = await driver.waitForElementById('org.mozilla.firefox:id/mozac_browser_toolbar_url_view', 100);
        topBarClick.click();
        await driver.sleep(500);
        link = ['https://haodersese.com/']
        topBar = await driver.waitForElementById('org.mozilla.firefox:id/mozac_browser_toolbar_edit_url_view', 100);
        if (topBar) {
          await topBar.sendKeys(link[0]);
          await driver.keys('\uE007');
          console.log('网址输入完成并访问');
        } else {
          console.error('未能找到URL输入栏');
        }

        await driver.sleep(40000);
        throw new Error('没有加载出来');
      }



      try {
        if (count == 4 && driver.hasElementByXPath('//*[@resource-id="banner6"]/android.view.View[1]/android.widget.Image[1]')) {

          await driver.waitForElementByXPath('//*[@resource-id="banner6"]/android.view.View[1]/android.widget.Image[1]', 1000).click();
          console.log('//*[@resource-id="banner6"]/android.view.View[1]/android.widget.Image[1]');
          count = 5;
          await driver.sleep(20000);
          driver.back();
          await driver.sleep(2000);

        } else {
          count = 5;
          console.log('count=' + count);
        }
      } catch (e) {
        count = 5;
        console.log('count=' + count);
        let topBarClick = await driver.waitForElementById('org.mozilla.firefox:id/mozac_browser_toolbar_url_view', 100);
        topBarClick.click();
        await driver.sleep(500);
        link = ['https://haodersese.com/']
        topBar = await driver.waitForElementById('org.mozilla.firefox:id/mozac_browser_toolbar_edit_url_view', 100);
        if (topBar) {
          await topBar.sendKeys(link[0]);
          await driver.keys('\uE007');
          console.log('网址输入完成并访问');
        } else {
          console.error('未能找到URL输入栏');
        }
        await driver.sleep(40000);
      }



      try {
        if (count == 5 && driver.hasElementByXPath('//*[@resource-id="banner2"]/android.view.View[1]/android.view.View[1]')) {

          await driver.waitForElementByXPath('//*[@resource-id="banner2"]/android.view.View[1]/android.view.View[1]', 1000).click();
          console.log('//*[@resource-id="banner2"]/android.view.View[1]/android.view.View[1]');
          count = 1;
          await driver.sleep(20000);
          driver.back();
          await driver.sleep(2000);

        } else {
          count = 1;
          console.log('count=' + count);
        }
      } catch (e) {
        count = 1;
        console.log('count=' + count);
        let topBarClick = await driver.waitForElementById('org.mozilla.firefox:id/mozac_browser_toolbar_url_view', 100);
        topBarClick.click();
        await driver.sleep(500);
        link = ['https://haodersese.com/']
        topBar = await driver.waitForElementById('org.mozilla.firefox:id/mozac_browser_toolbar_edit_url_view', 100);
        if (topBar) {
          await topBar.sendKeys(link[0]);
          await driver.keys('\uE007');
          console.log('网址输入完成并访问');
        } else {
          console.error('未能找到URL输入栏');
        }
        await driver.sleep(40000);
      }
    } catch (e) {
      console.error(`这里报错了---Error on iteration:`, e);
      count = 1;
      // await startWuji();
      // await clickWeiBa();
    }

  }

}
async function startWuji() {
  await driver.init({
    platformName: 'Android',
    reuse: 1000000, // 重用现有会话
    autoAcceptAlerts: false,
    package: 'org.wuji',
    // udid: '192.168.1.199:5555'
    udid:'192.168.1.198:5555'
  });
  await driver.sleep(1000);
  let xpath = 'org.wuji:id/change_ip';
  if (driver.hasElementById(xpath)) {
    driver.waitForElementById(xpath, 1000).click();
    await driver.sleep(5000);
  }

}

async function clickWeiBa() {

  await driver.init({
    platformName: 'Android',
    reuse: 1000000, // 重用现有会话
    autoAcceptAlerts: false,
    package: 'com.miui.miuibbs',
    // udid: '192.168.1.199:5555'
    udid:'192.168.1.198:5555'

  });
  await driver.sleep(1000);
  if (driver.hasElementByXPath('//android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.RelativeLayout[1]/android.webkit.WebView[1]/android.webkit.WebView[1]/android.view.View[1]/android.view.View[4]/android.view.View[1]/android.view.View[2]/android.widget.Button[1]')) {
    driver.waitForElementByXPath('//android.widget.FrameLayout[1]/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.widget.RelativeLayout[1]/android.webkit.WebView[1]/android.webkit.WebView[1]/android.view.View[1]/android.view.View[4]/android.view.View[1]/android.view.View[2]/android.widget.Button[1]', 1000).click();
  }

  await checkTextInWebView();
  await driver.sleep(5000);

}

async function checkTextInWebView() {

  await driver.sleep(2000);
  let isConfirm = false;
  const text = 'Firefox';
  while (!isConfirm) {
    await driver.touch('drag', {
      fromX: 388,
      fromY: 1400,
      toX: 388,
      toY: 100,
      duration: 1
    });
    try {
      let element = driver.waitForElementByXPath('//*[@text="Firefox"]', 100);
      // 检查元素是否存在
      if (element) {
        console.log('元素已找到:', await element.text());
        element.click();
        await element.sleep(1000);
        driver.waitForElementByXPath('//*[@text="确定"]', 100).click();
        isConfirm = true;
      } else {
        console.log('未找到包含指定文案的元素');
      }
    } catch (err) {
      console.error('测试运行失败:', err);
    }
  }
  await driver.sleep(4000);
  await driver.back();
  await driver.waitForElementByXPath('//*[@text=" 一键改机"]', 2000).click();
  console.log('返回当前页点击一件改机');
  await driver.waitForElementByXPath('//*[@text="伪装成新设备"]', 3000).click();
  console.log('点击伪装');
}



async function adbExec() {
  // 定义要执行的 adb 命令
  const adbCommand = 'adb devices';
  console.log('执行方法', exec);
  // 执行 adb 命令
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
      driver.sleep(1000);
      exec('adb connect ' + driver.udid, (error, stdout, stderr) => {
        if (error) {
          console.error('执行 adb 命令时出错:', error.message);
          return;
        }
        if (stderr) {
          console.error('adb 命令输出错误:', stderr);
          return;
        }
        console.log('执行 connect');
        driver.sleep(1000);
        runTest();
      });
    }
    // 打印 adb 命令的输出结果
    console.log('adb 命令输出:', stdout);
  });
}

runTest();
