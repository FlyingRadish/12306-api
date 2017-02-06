# 12306-api
基于express的12306车次时刻表API，输入车次及乘车日期即可返回对应时刻表。
# 原理
受[go-home](https://github.com/JingDa-open-source-community/go-home)和[Parse12306](https://github.com/metromancn/Parse12306)的启发，通过访问12306时刻表查询API得到结果，并对数据做进一步装饰。
# 使用
## 环境
node.js + mysql5.7
## 数据库
进入mysql命令行，执行init_db.sql
## 配置
修改dao/database.js中数据库设置
```
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',  //数据库地址
    user: 'root', //用户名
    password: 'password', //密码
    database: '12306api',
    port: 3306  //端口
});
```
## 导入数据
分别下载[车次数据](https://kyfw.12306.cn/otn/resources/js/query/train_list.js)和[车站数据](https://kyfw.12306.cn/otn/resources/js/framework/station_name.js)，按照表结构导入数据库。
自动导入数据的功能将在未来加入。
## 运行
```
npm start
```
