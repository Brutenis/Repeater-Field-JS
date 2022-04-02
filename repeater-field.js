function RepeaterField(el, params) {
  if (params) {
    this.params = params;
  } else {
    this.params = new Object();
  }

  // This method helps with setting the default parameters
  this.setDefault = (obj, property, defaultVal) => {
    if (!obj[property]) {
      obj[property] = defaultVal;
    }
  }

  // Default field settings
  this.defaultField = {
    classList: ["repeater-text-input"],
    type: "text",
    name: "repeater-text-input",
    placeholder: "Type here..."
  };

  // Random string ID generator 
  this.generateId = (length) => {
    let id = new String;
    const chars = "abcdef123456";
    
    for (let i = 0; i < length; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  }

  // Generated object ID
  this.id = this.generateId(6);

  // Setting default parameters
  this.setDefault(this.params, "fields", {});

  this.setDefault(this.params.fields, "wrapper", {});
  this.setDefault(this.params.fields.wrapper, "element", "div");
  this.setDefault(this.params.fields.wrapper, "classList", ["repeater-field-wrapper"]);

  this.setDefault(this.params.fields, "row", {});
  this.setDefault(this.params.fields.row, "element", "div");
  this.setDefault(this.params.fields.row, "classList", ["repeater-input-row"]);
  
  this.setDefault(this.params.fields, "inputs", new Array());
  this.setDefault(this.params.fields.inputs, 0, this.defaultField);

  this.setDefault(this.params, "deleteButton", {});
  this.setDefault(this.params.deleteButton, "value", "Delete");
  this.setDefault(this.params.deleteButton, "classList", ["repeater-delete-button"]);
  this.setDefault(this.params.deleteButton, "name", "repeater-delete-button");

  this.setDefault(this.params, "addButton", {});
  this.setDefault(this.params.addButton, "value", "Add");
  this.setDefault(this.params.addButton, "classList", ["repeater-add-button"]);
  this.setDefault(this.params.addButton, "name", "repeater-add-button");

  // Adds a row with some empty values to the data array
  this.setDefaultData = () => {
    this.data = [[]];
    this.params.fields.inputs.forEach(input => {
      this.data[0].push("");
    })
  }

  // If data isn't defined, we add a row with some empty values to the data array
  if (this.params.data) {
    this.data = this.params.data;
  } else {
    this.setDefaultData();
  }

  // Data ID attributes
  this.fieldWrapperId = `repeater-field-wrapper-${this.id}`;
  this.fieldRowId = `repeater-field-row-${this.id}`;
  this.deleteButtonId = `repeater-delete-${this.id}`;
  this.addButtonId = `repeater-add-${this.id}`;
  this.inputId = `repeater-input-${this.id}`;

  // The field data getter (this method is used to retrieve the field data)
  this.getData = () => {
    return this.data;
  }

  // Creates an <input> or <textarea> element
  this.createInputElement = (id, data) => {
    let element = new Object();

    if (data.type != "textarea") {
      element = document.createElement("input");

      if (data.type == "text" ||
          data.type == "number" ||
          data.type == "url" ||
          data.type == "time" ||
          data.type == "tel" ||
          data.type == "range" ||
          data.type == "password" ||
          data.type == "month" ||
          data.type == "email" ||
          data.type == "datetime-local" ||
          data.type == "date" ||
          data.type == "color") {
        
        element.setAttribute("type", data.type); 
      } else {
        element.setAttribute("type", "text");
      }

      if (data.name) {
        element.setAttribute("name", data.name);
      } else {
        element.setAttribute("name", "repeater-input");
      }

      if (data.placeholder) {
        element.setAttribute("placeholder", data.placeholder);
      } else {
        element.setAttribute("placeholder", "Type here...");
      }

    } else {

      element = document.createElement("textarea");

      if (data.name) {
        element.setAttribute("name", data.name);
      } else {
        element.setAttribute("name", "repeater-textarea");
      }

      if (data.placeholder) {
        element.setAttribute("placeholder", data.placeholder);
      } else {
        element.setAttribute("placeholder", "Type here...");
      }

    }

    if (data.classList && data.classList[0]) {
      data.classList.forEach(className => {
        element.classList.add(className);
      })
    }

    if (id) {
      element.setAttribute("data-id", id);
    }

    if (data.wrapper) {
      const wrapper = this.createWrapper(false, data.wrapper);
      wrapper.appendChild(element);
      return wrapper;
    } else {
      return element;
    }
  }

  // Creates a <button> element
  this.createButton = (id, data) => {
    const button = document.createElement("button");
    button.innerText = data.value;

    if (data.name) {
      button.setAttribute("name", data.name);
    } else {
      button.setAttribute("name", "repeater-button");
    }

    if (id) {
      button.setAttribute("data-id", id);
    }

    if (data.classList && data.classList[0]) {
      data.classList.forEach(className => {
        button.classList.add(className);
      })
    }

    if (data.wrapper) {
      const wrapper = this.createWrapper(false, data.wrapper);
      wrapper.appendChild(button);
      return wrapper;
    } else {
      return button;
    }
  }

  // Creates a wrapper element, eg. <div>
  this.createWrapper = (id, data) => {
    const wrapper = document.createElement(data.element);

    if (data.classList && data.classList[0]) {
      data.classList.forEach(className => {
        wrapper.classList.add(className);
      })
    }

    if (id) {
      wrapper.setAttribute("data-id", id);
    }

    return wrapper;
  }

  // Iterates all of the DOM input fields and compiles the data array
  this.updateData = () => {
    if (document.querySelector(`[data-id="${this.fieldRowId}"]`)) {
      let newData = new Array();
      const fieldRows = Array.from(document.querySelectorAll(`[data-id="${this.fieldRowId}"]`));

      fieldRows.forEach(row => {
        const children = Array.from(row.getElementsByTagName("*"));

        const fieldValues = new Array();

        children.forEach(child => {
          if (child.nodeName == "INPUT" || child.nodeName == "TEXTAREA") {
            fieldValues.push(child.value);
          }
        })

        newData.push(fieldValues);
      })

      this.data = newData;
    } else {

      this.setDefaultData();
    }
  }

  // This method adds a new row to the data array
  this.addNewRow = () => {
    const newRow = new Array();

    this.params.fields.inputs.forEach(input => {
      newRow.push("");
    })

    this.data.push(newRow);
    this.render();
  }

  // This method renders the data into input fields
  this.render = () => {
    el.innerHTML = "";

    const fieldWrapper = this.createWrapper(this.fieldWrapperId, this.params.fields.wrapper);
    const addButton = this.createButton(this.addButtonId, this.params.addButton);

    this.data.forEach(fieldGroup => {
      const rowElement = this.createWrapper(this.fieldRowId, this.params.fields.row);
      const deleteButton = this.createButton(this.deleteButtonId, this.params.deleteButton);

      fieldGroup.forEach((value, index) => {
        let inputElement = new Object();

        if (this.params.fields.inputs[index]) {
          inputElement = this.createInputElement(this.inputId, this.params.fields.inputs[index]);
        } else {
          inputElement = this.createInputElement(this.inputId, this.defaultField);
        }

        if (inputElement.nodeName != "INPUT" && inputElement.nodeName != "TEXTAREA") {
          inputElement.firstChild.value = value;
        } else {
          inputElement.value = value;
        }

        inputElement.addEventListener("input", this.updateData);

        rowElement.appendChild(inputElement);
        rowElement.appendChild(deleteButton);
      })

      rowElement.appendChild(deleteButton);
      fieldWrapper.appendChild(rowElement);
    })

    el.appendChild(fieldWrapper);
    el.appendChild(addButton);

    // Deleting functionality
    const allDeleteButtons = Array.from(document.querySelectorAll(`[data-id="${this.deleteButtonId}"]`));

    allDeleteButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        this.data.splice(index, 1);

        if (this.data.length < 1) {
          this.setDefaultData();
        }

        this.render();
      })
    })

    if (addButton.nodeName != "BUTTON") {
      addButton.firstChild.addEventListener("click", this.addNewRow);
    } else {
      addButton.addEventListener("click", this.addNewRow);
    }
  };

  // Initializes the repeater field
  this.render();
}
