# Repeater-Field-JS
A JavaScript Repeater Field Library (Similar to the Repeater Field in ACF for WordPress)

# Getting Started

The first step is to create a container for the Repeater Field and include the script in your project

```html
<div id="repeater-field-container"></div>
<script src="repeater-field.min.js"></script>
```

Then we create a new instance of the Repeater Field

```javascript
const container = document.getElementById("repeater-field-container");
const repeaterField = new RepeaterField(container, {
  // Parameters here
});
```
