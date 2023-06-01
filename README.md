# 基于Rpa+AI技术实现实时热点订阅分析

## 简介
该项目是一款基于金智维rpa平台进行数据的爬取大量数据，以及增加机器人定时任务去抓取实时热点数据，通过抓取大量的数据，利用到我们的基于python-fastText库进行AI词条分类的算法，来训练词条分类的模型，后续对我们利用rpa得到的实时数据进行实时分析，其识别度目前已达到百分之九十，通过我们rpa所抓取的实时数据，调用我们所写的AI词条分类的算法文件，最终得到热点的实时抓取与实时分类，并且能够同时存入数据库；我们提供了公众号交互平台，用户可以通过公众号进行查看当前热点可视化及数据分析，并且能够订阅用户所选择的热点类型，我们可以设置每天所推送的热点的时间以及不同用户针对其选择的所有类型通过go语言程序进行一个实时推送，既能够提供用户一个友好的交互平台，并且能够提供用户一个当前实时热点的分析情况。

## 总体设计
![image](https://github.com/zhangdengzhen/computer-design-competition/assets/68335755/3badb3a6-b90e-48a9-a115-542aa0248db8)
## 1,爬取数据
![image](https://github.com/zhangdengzhen/computer-design-competition/assets/68335755/fa85f3f5-ed83-4316-ac94-13a3dab1cd23)
![image](https://github.com/zhangdengzhen/computer-design-competition/assets/68335755/c421763b-079a-4dab-9e26-29a308cd8905)
![image](https://github.com/zhangdengzhen/computer-design-competition/assets/68335755/e4fb506a-4b6a-4b31-add4-e0e34e8a5f89)


### 微信授权格式
```json

{
 {
   "id": 1,
   "commentId": 1,
   "replyId": 1,
   "replyType": "comment",
   "content": "别傻啦",
   "fromUid": "ozNrn6cEspMN0Yee_YDo-hTZ12gg",
   "toUid": "ozNrn6XnlOPVTwjdcWufv6wyrPPc",
   "fromNickname": "月迹",
   "toNickname": "@mysatrt",
   "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/u954UKCTyyHep0fRfQJAjSurPebtLbZu40XQDLQRolyick2aQewTb1O5aJoTTF250XJfXksgLwnIPOibAflic6baQ/132"
 },

 {
  "commentId": 19,
  "content": "试一试",
  "fromNickname": "吃一口咸",
  "fromUid": "ozNrn6W2Yzy3RfBEYtZ3GdiUj35A",
  "id": 0,
  "replyId": 36,
  "replyType": "reply",
  "toNickname": "吃一口咸",
  "toUid": "ozNrn6W2Yzy3RfBEYtZ3GdiUj35A",
  "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epPYkSkbDSnYefiaiaBLW86msYmUjk4JRwI2bZZJeff9AFVrPbBEJpftFiaAYNhpFVDZxImkItcAbQfQ/132"
}
```
