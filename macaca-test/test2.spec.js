// 引入官方webdriver client 包
var wd = require('macaca-wd');

// 定义webdriver client 要链接的服务端 host 和 port
var remoteConfig = {
  host: 'localhost',
  port: 3456 // Macaca server 默认使用 3456 端口
};

// 后面 driver 直接使用链式调用即可
var driver = wd.promiseChainRemote(remoteConfig);

before(function() {
  return driver.init({
    platformName: 'Android', // iOS, Android, Desktop
    browserName: 'chrome'  ,  // Chrome, Electron
    package:'com.android.chrome'
  });
});

// after(function() {
//   return driver
//     .sleep(1000)
//     .quit();
// });

// it('#1 should', function() {

  

// });