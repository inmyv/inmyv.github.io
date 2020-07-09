---
layout: post
categories: posts
title: 语法高亮显示
subtitle: 这是语法高亮的文章简述。
tags: 示例帖子
      代码
      突出显示
featured-image: /images/header/fiber-optic-header-1.png
date-string: 2020年07月10日
---

语法高亮显示是一项功能，可根据术语类别以不同的颜色和字体显示源代码。 由于结构和语法错误在视觉上都是不同的，因此此功能有助于以结构化语言（例如编程语言或标记语言）进行书写。 突出显示不影响文本本身的含义； 它仅适用于人类读者。[^1]

[^1]: <http://en.wikipedia.org/wiki/Syntax_highlighting>

### GFM代码块

GitHub Flavored Markdown [fenced code blocks](https://help.github.com/articles/creating-and-highlighting-code-blocks/) 支持。 要修改样式并突出显示颜色，请编辑 `/_sass/syntax.scss`.

```css
#container {
  float: left;
  margin: 0 -240px 0 0;
  width: 100%;
}
```

{% highlight scss %}
.highlight {
  margin: 0;
  padding: 1em;
  font-family: $monospace;
  font-size: $type-size-7;
  line-height: 1.8;
}
{% endhighlight %}

```html
{% raw %}<nav class="pagination" role="navigation">
  {% if page.previous %}
    <a href="{{ site.url }}{{ page.previous.url }}" class="btn" title="{{ page.previous.title }}">Previous article</a>
  {% endif %}
  {% if page.next %}
    <a href="{{ site.url }}{{ page.next.url }}" class="btn" title="{{ page.next.title }}">Next article</a>
  {% endif %}
</nav><!-- /.pagination -->{% endraw %}
```

{% highlight html linenos %}
{% raw %}<nav class="pagination" role="navigation">
  {% if page.previous %}
    <a href="{{ site.url }}{{ page.previous.url }}" class="btn" title="{{ page.previous.title }}">Previous article</a>
  {% endif %}
  {% if page.next %}
    <a href="{{ site.url }}{{ page.next.url }}" class="btn" title="{{ page.next.title }}">Next article</a>
  {% endif %}
</nav><!-- /.pagination -->{% endraw %}
{% endhighlight %}

```ruby
module Jekyll
  class TagIndex < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag_index.html')
      self.data['tag'] = tag
      tag_title_prefix = site.config['tag_title_prefix'] || 'Tagged: '
      tag_title_suffix = site.config['tag_title_suffix'] || '&#8211;'
      self.data['title'] = "#{tag_title_prefix}#{tag}"
      self.data['description'] = "An archive of posts tagged #{tag}."
    end
  end
end
```

### 列表中的代码块

缩进很重要。 确保代码块的缩进与列表项标记后面的第一个非空格字符对齐（例如，“ 1。”）。 通常这意味着缩进3个空格而不是4个空格。

1. Do step 1.
2. Now do this:
   
   ```ruby
   def print_hi(name)
     puts "Hi, #{name}"
   end
   print_hi('Tom')
   #=> 将“嗨，汤姆”打印到STDOUT。
   ```
        
3.现在您可以执行此操作。

### GitHub Gist嵌入

下面嵌入了一个Gist的示例。

{% gist mmistakes/6589546 %}
