const { sleep } = require('app-inspector/lib/common/helper');
const { exec } = require('child_process');
var wd = require('macaca-wd');
var index=25;
var element_length=25;
var positon=15;
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
            udid:'a283551'
            
        });
        await driver.sleep(1000); // 等待应用加载

        console.log('应用已成功启动！');
        if(await driver.hasElementById('com.android.chrome:id/signin_fre_continue_button')){
          await driver.waitForElementById('com.android.chrome:id/signin_fre_continue_button',1000).click();
        }
            
        if(await driver.hasElementById('com.android.chrome:id/button_secondary')){
          await driver.waitForElementById('com.android.chrome:id/button_secondary',1000).click();
        }
        if(await driver.hasElementById('com.android.chrome:id/no_button')){
            await driver.waitForElementById('com.android.chrome:id/no_button',1000).click();
        }
        await driver.sleep(3000);
        if(await driver.hasElementById('com.android.chrome:id/ack_button')){
            await driver.waitForElementById('com.android.chrome:id/ack_button',1000).click();
        }
        if(await driver.hasElementById('com.android.chrome:id/button_secondary')){
          await driver.waitForElementById('com.android.chrome:id/button_secondary',1000).click();
        }
        
        var topBar=await driver.waitForElementById('com.android.chrome:id/search_box_text', 1000);
        

        var link=['https://www.baidu.com']
        for(let i=0; i<link.length;i++){
            if (topBar) {
                await topBar.click()
                await driver.sleep(1000);
                await driver.waitForElementById('com.android.chrome:id/url_bar',1000).sendKeys(link[i]);
                await driver.keys('\uE007');
                console.log('网址输入完成并访问');
            } else {
                console.error('未能找到URL输入栏');
            }
            await driver.sleep(2000); 
        }
        // await driver.elementByClassName('inquiry_layer_btn').click();
        // await driver.waitForElementByXPath('//*[@text="汽车之家_看车买车用车换车_都回汽车之家"]/android.view.View[1]/android.view.View[1]/android.view.View[10]/android.view.View[1]/android.widget.TextView[1]"]',1000).click();
        // await driver.waitForElementByXPath('//*[@text="汽车之家_看车买车用车换车_都回汽车之家"]/android.view.View[1]/android.view.View[1]/android.view.View[10]/android.view.View[1]/android.widget.TextView[1]"]',1000).click();
        // await driver.waitForElementByXPath('//*[@text="ChtliGO3wyuAcPYlAAAbj25_uo8113"]',1000).click();
        // await driver.waitForElementByXPath('//*[@text="ChtliGO3wyuAcPYlAAAbj25_uo8113"]',1000).click();
        // await driver.sleep(2000);
        await driver.back();
        await driver.sleep(2000);
        // await driver.keys('home');
        // let touch = {x: 0, y: 0};
        // await driver.sendActions('drag', {fromX: 388, fromY:1425, toX:388, toY:1025, duration: 0.25});
        if(index<=element_length){
          await clash();
        }
    } catch (e) {
        console.error('启动应用时出错:', e);
        if(e.data.includes('Internal Server Error')||e.error.includes('[init({"platformName":"Android","reuse":true,"autoAcceptAlerts":false,"package":"com.android.chrome","udid":"a283551"})]')){
            console.error('进入命令:', e.data);
            adbExec();
            console.error('执行命令:', e.data);
        }
        
    } finally {
        // await driver.quit();
        console.log('测试结束');
    }
}

// 定义 scrollElementIntoView 函数
async function scrollElementIntoView(driver, element) {
  if (!element) {
      throw new Error("Element is undefined");
  }
  // let location = await element.getLocation();
  //       console.log('Element location:', location);
  // console.log('Element location:', location);
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

async function updateElements(driver, elements) {
  // 获取当前页面上的新元素
  await driver.waitForElementByXPath('//androidx.recyclerview.widget.RecyclerView', 1000);
  
  // 查找所有匹配的元素
  let newElements = await driver.elementsByXPath('//androidx.recyclerview.widget.RecyclerView/android.view.View');
  newElements=newElements.slice(3);
  // 合并两个数组并去重
  let combinedArray = [...new Set([...elements, ...newElements])];

  // 更新 oldArray
  elements = combinedArray;
  // 将新元素转换为唯一标识符数组（假设可以通过getAttribute('resource-id')获取唯一标识符）
  // const newElementIds = await Promise.all(newElements.map(el => el.getAttribute('resource-id')));

  // // 将旧元素转换为唯一标识符数组
  // const existingElementIds = await Promise.all(elements.map(el => el.getAttribute('resource-id')));

  // // 过滤出新的元素，排除已有元素
  // const uniqueNewElements = newElements.filter((el, index) => !existingElementIds.includes(newElementIds[index]));

  // // 将新的唯一元素追加到已有元素数组中
  // elements.push(...uniqueNewElements);
  
  return elements;
}



async function clash(){
    await driver.init({
        platformName: 'Android',
        reuse: 1000000, // 重用现有会话
        autoAcceptAlerts: false,
        package: 'com.github.kr328.clash',
        udid:'a283551'
        
    });
    // await driver.waitForElementByName('代理',1000).click();
    await driver.waitForElementByName('⚓ 节点选择',1000).click();
    await driver.sleep(2000);
    await driver.waitForElementByXPath('//androidx.recyclerview.widget.RecyclerView', 1000);
  
      // 查找所有匹配的元素
      if(elements==undefined||elements.length==0){
        elements = await driver.elementsByXPath('//androidx.recyclerview.widget.RecyclerView/android.view.View');
      }
      element_length=elements.length;
      var element=elements[index];
      // await driver.sendActions('drag', {fromX: 388, fromY:1425, toX:388, toY:1025, duration: 0.25});
      while(element==undefined||!element.isDisplayed()){
        await scrollElementIntoView(driver,elements[positon]);
        driver.sleep(1000);
        elements=await updateElements(driver,elements);
        element_length=elements.length;
        element=elements[index];
      }
      
      

      // try{
        await elements[index].click();
      // }catch(e){
        
      //   // driver.back();
      // }
        console.log('执行到第几个IP',index);
        await driver.sleep(1000); // 等待一秒，确保点击后的操作完成
        index++;
        // driver.back();
        // await driver.sleep(1000);
        runTest();
    // it('should click each item in the list', async () => {
    //   // 等待 RecyclerView 出现
    //   await driver.waitForElementByXPath('//androidx.recyclerview.widget.RecyclerView', 10000);
  
    //   // 查找所有匹配的元素
    //   const elements = await driver.elementsByXPath('//androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout/android.view.View');
  
    //   // 遍历并点击每个元素
    //   // for (let i = 0; i < elements.length; i++) {
    //     await elements[index].click();
    //     await driver.sleep(1000); // 等待一秒，确保点击后的操作完成
    //     index++;
    //   // }
    // });

    
}



async function isElementInViewport(element) {
    try {
        // 获取元素的位置和尺寸
        const location = await element.getLocation();
        const size = await element.getSize();

        // 获取屏幕的尺寸
        const windowRect = await driver.getWindowRect();

        // 检查元素是否在屏幕的可见区域内
        const isInViewport = (
            location.x >= 0 &&
            location.y >= 0 &&
            location.x + size.width <= windowRect.width &&
            location.y + size.height <= windowRect.height
        );

        return isInViewport;
    } catch (e) {
        console.error('检查元素是否在屏幕上时出错:', e);
        return false;
    }
}


async function adbExec(){



// 定义要执行的 adb 命令
const adbCommand = 'adb devices';
console.log('执行方法',exec);
// 执行 adb 命令
await exec(adbCommand, (error, stdout, stderr) => {
  if (error) {
    console.error('执行 adb 命令时出错:',error.message);
    return;
  }
  if (stderr) {
    console.error('adb 命令输出错误:', stderr);
    return;
  }
  console.log('执行 devices:',stdout,driver.udid);
  if(stdout.includes(driver.udid)){
    runTest();
  }else{
    sleep(1000);
    exec('adb kill-server',(error, stdout, stderr) => {
        if (error) {
            console.error('执行 adb 命令时出错:',error.message);
            return;
          }
          if (stderr) {
            console.error('adb 命令输出错误:',stderr);
            return;
          }
          console.log('执行 kill');
          sleep(1000);
          exec('adb start-server',(error, stdout, stderr) => {
            if (error) {
                console.error('执行 adb 命令时出错:',error.message);
                return;
              }
              if (stderr) {
                console.error('adb 命令输出错误:',stderr);
                return;
              }
              sleep(1000);
              adbExec();
              console.log('执行 start');
        });
    });
  }
  // 打印 adb 命令的输出结果
  console.log('adb 命令输出:',stdout);
});
}

runTest();