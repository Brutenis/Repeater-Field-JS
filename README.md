# Repeater-Field-JS
A JavaScript Repeater Field Library (Similar to the Repeater Field in ACF for WordPress).
Comes unstyled, apply your own classes and styles. The minified version is just 5kb!

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

# Customization
The RepeaterField constructor accepts parameters that let you change element values, define field types, add more elements to rows, wrap fields in divs, etc.

Here is a example of the parameter object:

```javascript
{
  // The data array allows you to build input rows from pre-defined data (useful when the data is being retrieved from the database)
  // Each array within the parent data array represents an input row where input values are represented by strings
  data: [
    ["John", "John is a musician", "32"],
    ["Juliette", "Juliette is a scientist", "23"]
  ],

  fields: {
    // The wrapper element where input rows are going to be stored
    wrapper: {
      element: "div",
      classList: ["repeater-field-wrapper"]
    },

    // The elements wrapping all of the input fields
    row: {
      element: "div",
      classList: ["repeater-input-row"]
    },

    // Input field settings
    // To add an additional field, just create an object within the inputs array
    // Give the object additional parameters for customization (optional)
    
    // Available input types: text, textarea, number, url, time, tel, range, password, month, email, datetime-local, date, color
    inputs: [
      {
        classList: ["repeater-name"],
        type: "text",
        name: "repeater-name",
        placeholder: "Name...",
        wrapper: {
          element: "div",
          classList: [
            "repeater-input-wrapper",
            "repeater-name"
          ]
        }
      },
  
      {
        classList: ["repeater-description"],
        type: "textarea",
        name: "repeater-description",
        placeholder: "Description...",
        wrapper: {
          element: "div",
          classList: [
            "repeater-input-wrapper",
            "repeater-description"
          ]
        }
      },

      {
        classList: ["repeater-number"],
        type: "number",
        name: "repeater-age",
        placeholder: "Age...",
        wrapper: {
          element: "div",
          classList: [
            "repeater-input-wrapper",
            "repeater-age"
          ]
        }
      }
    ]
  },

  deleteButton: {
    value: "Delete",
    classList: ["repeater-delete-button"],
    name: "repeater-delete-button",
    wrapper: {
      element: "div",
      classList: ["repeater-delete-wrapper"]
    }
  },

  addButton: {
    value: "Add",
    classList: ["repeater-add-button"],
    name: "repeater-add-button",
    wrapper: {
      element: "div",
      classList: ["repeater-add-wrapper"]
    }
  }
}
```
