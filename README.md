# Repeater-Field-JS
A JavaScript Repeater Field Library (Similar to the Repeater Field in ACF for WordPress)

# Getting Started
The first step is to create a container element where the Repeater Field contents are going to be placed. Example:

```html
<div id="repeater-field-container"></div>
```

Then we include the library script in our project and instantiate the RepeaterField object using the "new" keyword. Example:

```html
<script src="repeater-field.min.js"></script>

<script>
const container = document.getElementById("repeater-field-container");

const repeaterField = new RepeaterField(container, {
  // Parameters here
});
</script>
```

Finally, we call the getData() method from our RepeaterField instance whenever we want to retrieve the field data. The method returns an array of arrays representing each one of the Repeater Field rows. Example:

```javascript
repeaterField.getData();
```
