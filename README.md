# 基于Rpa+AI技术实现实时热点订阅分析

## 简介
该项目是一款基于金智维rpa平台进行数据的爬取大量数据，以及增加机器人定时任务去抓取实时热点数据，通过抓取大量的数据，利用到我们的基于python-fastText库进行AI词条分类的算法，来训练词条分类的模型，后续对我们利用rpa得到的实时数据进行实时分析，其识别度目前已达到百分之九十，通过我们rpa所抓取的实时数据，调用我们所写的AI词条分类的算法文件，最终得到热点的实时抓取与实时分类，并且能够同时存入数据库；我们提供了公众号交互平台，用户可以通过公众号进行查看当前热点可视化及数据分析，并且能够订阅用户所选择的热点类型，我们可以设置每天所推送的热点的时间以及不同用户针对其选择的所有类型通过go语言程序进行一个实时推送，既能够提供用户一个友好的交互平台，并且能够提供用户一个当前实时热点的分析情况。

## 总体设计
![image](https://github.com/zhangdengzhen/computer-design-competition/assets/68335755/3badb3a6-b90e-48a9-a115-542aa0248db8)
## swagger接口
![image](https://github.com/zhangdengzhen/computer-design-competition/assets/68335755/bd96a498-ebb2-4e5a-b323-aa2ff4addf9c)
## 具体流程
### 1,爬取数据
![image](https://github.com/zhangdengzhen/computer-design-competition/assets/68335755/fa85f3f5-ed83-4316-ac94-13a3dab1cd23)
![image](https://github.com/zhangdengzhen/computer-design-competition/assets/68335755/c421763b-079a-4dab-9e26-29a308cd8905)
![image](https://github.com/zhangdengzhen/computer-design-competition/assets/68335755/e4fb506a-4b6a-4b31-add4-e0e34e8a5f89)

![image](https://github.com/zhangdengzhen/computer-design-competition/assets/68335755/1ec17e78-1147-4d3e-ac8d-0edd6221862c)
### 2，定时更新
![image](https://github.com/zhangdengzhen/computer-design-competition/assets/68335755/860106ac-21f4-4f33-9b12-4c8ac87fb70d)
### 3，效果展示
![image](https://github.com/zhangdengzhen/computer-design-competition/assets/68335755/41013035-92e5-4356-8aa4-0868fab9d29f)
![image](https://github.com/zhangdengzhen/computer-design-competition/assets/68335755/8f5b99af-98c4-4beb-badd-5857fac50098)
![image](https://github.com/zhangdengzhen/computer-design-competition/assets/68335755/709fc366-718b-4925-ae53-500ca98ce750)

#### 公众号推送
![image](https://github.com/zhangdengzhen/computer-design-competition/assets/68335755/18dfb469-bcc8-4f56-ab55-dd469fe94ff9)

#### 微信测试号
![image](https://github.com/zhangdengzhen/computer-design-competition/assets/68335755/c04ba972-d3e6-4765-8ae2-bce62e17e7ab)

