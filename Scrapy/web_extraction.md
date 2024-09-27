# Scrapy Web Extraction Guide

Scrapy is a powerful Python framework for web scraping. This guide will cover how to extract various properties from HTML using Scrapy and how to handle alternatives when the desired data isn't found.

## Basic Extraction

Scrapy uses CSS selectors or XPath to locate elements in the HTML. Here are some common extraction scenarios:

### 1. Extracting Text Content

To extract the text content of an element:

```python
response.css('selector::text').get()
```

Example:
```python
title = response.css('h1::text').get()
```

### 2. Extracting Attributes

To extract an attribute value:

```python
response.css('selector::attr(attribute-name)').get()
```

Example:
```python
href = response.css('a::attr(href)').get()
```

### 3. Extracting HTML

To extract raw HTML:

```python
response.css('selector').get()
```

Example:
```python
paragraph_html = response.css('p.content').get()
```

## Handling Alternatives

Sometimes the desired data might not be available in the expected location. Here are strategies to handle alternatives:

### 1. Using `getall()` for Multiple Elements

Instead of `get()`, use `getall()` to retrieve all matching elements:

```python
all_paragraphs = response.css('p::text').getall()
```

### 2. Providing a Default Value

Use the `default` parameter with `get()` to specify a fallback value:

```python
title = response.css('h1::text').get(default='No Title Found')
```

### 3. Using `or` for Alternatives

Chain multiple selectors with `or` to try alternatives:

```python
title = response.css('h1::text').get() or response.css('title::text').get()
```

### 4. Conditional Extraction

Use Python's conditional statements for more complex logic:

```python
if response.css('div.price'):
    price = response.css('div.price::text').get()
else:
    price = response.css('span.sale-price::text').get()
```

## Advanced Techniques

### 1. Regular Expressions

Use `re()` for regex-based extraction:

```python
import re
price = response.css('div.price::text').re_first(r'\$\d+\.\d{2}')
```

### 2. XPath

For more complex selections, use XPath:

```python
author = response.xpath('//span[contains(@class, "author")]/text()').get()
```

### 3. Nested Data

For nested structures, chain selectors:

```python
for product in response.css('div.product'):
    name = product.css('h2::text').get()
    price = product.css('span.price::text').get()
```

## Best Practices

1. Always check if the data exists before extraction to avoid errors.
2. Use meaningful variable names that reflect the content being extracted.
3. Comment your code to explain complex extractions or the reasoning behind fallback options.
4. Test your selectors thoroughly, as website structures can change.

Remember, web scraping should be done responsibly and in accordance with the website's robots.txt file and terms of service.