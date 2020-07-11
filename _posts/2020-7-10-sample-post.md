---
layout: post
title: Markdown 语法在主题内样式的所有内容
subtitle: 这篇文章用来展示markdown在主题内的样式
featured-image: ../assets/images/sample.png
tags: Markdown 主题
---
以下是您需要为主题设置样式的所有内容。 检查源代码以查看段落中的许多嵌入式元素。

1. TOC
{:toc}

---

<h2> 二级标题 </h2>
<h3> 三级标题 </h3>
<h4> 四级标题 </h4>
<h5> 五级标题 </h5>
<h6> 六级标题 </h6>

---

### 段落
先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，
忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，
恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。

### 代码高亮

```c++
#include <iostream>

using namespace std;

int main(){
  cout<<"hello world!";
  return 0;
}
//这是一段很长的注释，人生难免起起伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏伏
```

### 各种字体
1. **粗体**
2. *意大利斜体*
3. ~~删除线~~
4. `文字标记`
5. [链接](https://github.com/)

### 引用
> 金钱可以购买时间 - 鲁迅

### 表格

名字 | 语文 | 数学 | 英语
:-: | :-: | :-: | :-: 
张三 | 20  | 80  | 80 
李四 | 80  | 20  | 80 
小花 | 100 | 100 | 200

### 图片
![girl](assets/images/img-test.png)

### 无序列表
- 无
- 序
- 列
- 表

### 有序列表
1. 有
2. 序
3. 列
4. 表

### 外部代码
可以通过社交网站的外链提供视频或者图片等服务，例如以下的视频

<iframe width="560" height="315" src="https://www.youtube.com/embed/SU3kYxJmWuQ" frameborder="0"></iframe>

### 内联html标签
markdown支持任何html语法

### 数学公式

$$ 
	\frac{\mathrm{d}}{\mathrm{d}t} \left ( \frac {\partial  L}{\partial \dot{q}_j} \right ) =  \frac {\partial L}{\partial q_j} 
$$

$$x_1 = {-b + \sqrt{b^2-4ac} \over 2a}$$
$$x_2 = {-b - \sqrt{b^2-4ac} \over 2a} \notag$$

### 水平线
----
### 参考资料
更多关于markdown的语法资料可以在以下链接找到:

- [Markdown Here Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Here-Cheatsheet#code)
- [Quick Markdown Example](http://www.unexpected-vortices.com/sw/rippledoc/quick-markdown-example.html)
- [Markdown Basics](https://daringfireball.net/projects/markdown/basics)
- [GitHub Flavoured Markdown Spec](https://github.github.com/gfm/)
- [Basic writing and formatting syntax](https://help.github.com/articles/basic-writing-and-formatting-syntax/#lists)