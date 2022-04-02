# Repeater-Field-JS
A JavaScript Repeater Field Library (Similar to the Repeater Field in ACF for WordPress)

# Getting Started
The first step is to create a container element where the Repeater Field contents are going to be placed.

```html
<div id="repeater-field-container"></div>
```

Then we include the library script in our project and instantiate the RepeaterField object using the "new" keyword.

```html
<script src="repeater-field.min.js"></script>

<script>
  const container = document.getElementById("repeater-field-container");

  const repeaterField = new RepeaterField(container, {
    // Parameters here
  });
</script>
```
