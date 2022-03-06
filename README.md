# VectApp

```
当snowflake出现时，我们无比兴奋的看到了云上数据服务的曙光和其带来的巨大数据变革。
我们相信数据的流动和碰撞，将会产生巨大的价值！ 
本着致力于加速数据流动的效率、提升数据的价值和降低用户使用数据的门槛难度，我们创办了云上数据服务公司vectbase
我们围绕着snowflake、databricks、airtable等产品展开了调研，决定在第一版中，使用类似snowflake的页面来开发前端产品
遗憾的是，伴随着我们的技术合伙人的离开，我们的创业梦暂告一个段落，我们也不得不为了生活去寻觅工作
现在，我们决定将部分代码开源，希望能够帮助跟我们有着相同梦想的朋友们，在此，感谢我们的老朋友dennis,也感谢所有vectbase的兄弟们！

我们的整体设计思路是snowflake+data fabric，也期望在此设计下，可以创造出全新的databank 
现阶段，我们的架构上依然是存储层、计算层和服务层组成
在存储层中，我们提供s3/dfs来为用户提供数据存储
在计算层中，我们基于二次修改的clickhouse来提供弹性计算服务
在服务层中，我们在snowflake的架构上，引入了更多的数据治理和隐私安全相关的内容，如基于推荐技术的智能化元数据管理、同态加密、多方安全隐私计算等

未来的数据平台，将不再是我们看到的样子，它将更加高效、更加安全、更加便捷、更加智能，更加有意义！祝好，一切的同行者们
```

## 前端效果图

完整视频介绍，请看doc/video目录

入口页面
<img width="1680" alt="vectapp-login" src="https://user-images.githubusercontent.com/15904680/156934464-ede6df30-275b-4344-b472-cb3eb8b7bef1.png">

注册页面
<img width="1680" alt="vectapp-register" src="https://user-images.githubusercontent.com/15904680/156934503-8d206dbc-f4c8-4dd5-b727-ff8e63469034.png">

主页面
<img width="1680" alt="vectapp-main" src="https://user-images.githubusercontent.com/15904680/156934521-5e22b319-1a97-4f45-a21f-7296718bd488.png">

worksheet
<img width="1680" alt="vectapp-worksheet" src="https://user-images.githubusercontent.com/15904680/156934547-a4685b41-3cfe-4148-a34e-5ca7bc2a175c.png">

database
<img width="1680" alt="vectapp-database" src="https://user-images.githubusercontent.com/15904680/156934561-82b65b53-5286-4482-80db-447a86cd3b99.png">
<img width="1680" alt="vectapp-database-2" src="https://user-images.githubusercontent.com/15904680/156934565-83188b08-57d0-4b1b-826e-d03ff94e70c9.png">

查询历史
<img width="1680" alt="vectapp-queryhistory-3" src="https://user-images.githubusercontent.com/15904680/156934637-47e9b51d-774b-4da4-88fa-56b5306e20a3.png">

用户
<img width="1680" alt="vectapp-user-2" src="https://user-images.githubusercontent.com/15904680/156934611-87dd919c-341b-4cf5-92bc-b8f576aae0e3.png">

角色
<img width="1680" alt="vectapp-role-2" src="https://user-images.githubusercontent.com/15904680/156934621-ea4b5bb5-1b4e-4eab-abe8-4e682a4a7f09.png">




## 前端项目的编译

```
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 待完成

- usage 监控页面[ 进展70% ]
- role [ 进展90% ]
- security [ 进展90% ]

## 关于我们

公司网址：http://www.vectbase.com/

