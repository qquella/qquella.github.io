function generateTemplate() {
    const javaCode = document.getElementById('javaCodeInput').value;
    
    const template = {
        fields: new Set(),
        methods: new Set(),
        methodsForFields: new Set()
    };

    // Regular expressions to match fields and methods
    const fieldRegex = /^\s*(public|private|protected|\s*)\s+(\w+)\s+(\w+)\s*;.*$/;
    const methodRegex = /^\s*(public|private|protected|\s*)\s+(\w+)\s+(\w+)\((.*?)\)\s*{/;
    const methodCallRegex = /this\.(\w+)\.(\w+)\(/g;

    // Split Java code into lines and process each line
    const lines = javaCode.split('\n');
    let insideComment = false;

    lines.forEach(line => {
        // Check for start or end of a comment block
        if (line.includes("/*")) {
            insideComment = true;
        }

        if (insideComment) {
            // Check for fields within comments
            const fieldMatch = line.match(fieldRegex);
            if (fieldMatch) {
                const fieldType = fieldMatch[2];
                const fieldName = fieldMatch[3];
                template.fields.add(`this.${fieldName} ... ${fieldType}`);
            }

            // Check for methods within comments
            const methodMatch = line.match(methodRegex);
            if (methodMatch) {
                const accessModifier = methodMatch[1].trim();
                const methodName = methodMatch[3];
                const returnType = methodMatch[2];
                const args = methodMatch[4];
                const methodSignature = `this.${methodName}(${args}) ... ${returnType}`;
                template.methods.add(methodSignature);

                // Extract method calls for fields within this method
                let methodCallMatch;
                while ((methodCallMatch = methodCallRegex.exec(line)) !== null) {
                    const fieldName = methodCallMatch[1];
                    const methodCalled = methodCallMatch[2];
                    const methodForField = `this.${fieldName}.${methodCalled}() ... ${fieldName !== 'this' ? 'boolean' : 'Location'}`; // Adjust type based on field name
                    template.methodsForFields.add(methodForField);
                }
            }

            if (line.includes("*/")) {
                insideComment = false;
            }
        } else {
            // Check for fields and methods outside comments
            const fieldMatch = line.match(fieldRegex);
            if (fieldMatch) {
                const fieldType = fieldMatch[2];
                const fieldName = fieldMatch[3];
                template.fields.add(`this.${fieldName} ... ${fieldType}`);
            }

            const methodMatch = line.match(methodRegex);
            if (methodMatch) {
                const accessModifier = methodMatch[1].trim();
                const methodName = methodMatch[3];
                const returnType = methodMatch[2];
                const args = methodMatch[4];
                const methodSignature = `this.${methodName}(${args}) ... ${returnType}`;
                template.methods.add(methodSignature);

                // Extract method calls for fields within this method
                let methodCallMatch;
                while ((methodCallMatch = methodCallRegex.exec(line)) !== null) {
                    const fieldName = methodCallMatch[1];
                    const methodCalled = methodCallMatch[2];
                    const methodForField = `this.${fieldName}.${methodCalled}() ... ${fieldName !== 'this' ? 'boolean' : 'Location'}`; // Adjust type based on field name
                    template.methodsForFields.add(methodForField);
                }
            }
        }
    });

    // Construct the output template
    let output = "/* fields:\n";
    output += Array.from(template.fields).map(field => ` *  ${field}`).join("\n");
    output += "\n * methods:\n";
    output += Array.from(template.methods).map(method => ` *  ${method}`).join("\n");
    output += "\n * methods for fields:\n";
    output += Array.from(template.methodsForFields).map(methodForField => ` *  ${methodForField}`).join("\n");
    output += "\n */";

    // Display the template output in a <pre> element
    const templateOutputElement = document.getElementById('templateOutput');
    templateOutputElement.innerHTML = `<pre>${output}</pre>`;
}

function copyTemplate() {
    const templateOutputElement = document.getElementById('templateOutput');
    const outputText = templateOutputElement.textContent;

    // Create a temporary textarea element to copy the text
    const textarea = document.createElement('textarea');
    textarea.value = outputText;

    // Append the textarea to the body
    document.body.appendChild(textarea);

    // Select the text within the textarea
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text
    document.execCommand('copy');

    // Remove the textarea from the body
    document.body.removeChild(textarea);

    // Create a message element for displaying the copied message
    const messageElement = document.createElement('div');
    messageElement.textContent = 'Template copied to clipboard!';
    messageElement.style.position = 'fixed';
    messageElement.style.top = '10px';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translateX(-50%)';
    messageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    messageElement.style.color = '#a877fd';
    messageElement.style.padding = '10px';
    messageElement.style.borderRadius = '5px';
    messageElement.style.zIndex = '9999';

    // Append the message element to the body
    document.body.appendChild(messageElement);

    // Automatically remove the message element after 3 seconds
    setTimeout(() => {
        document.body.removeChild(messageElement);
    }, 3000);
}
