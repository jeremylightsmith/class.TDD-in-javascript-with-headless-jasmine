var Validator = function () {
    this.valid = true;
}

Validator.prototype = {
    validate: function (node, validationMethod) {
        var validationMethod = this[node.attr("validator")];
        
        if (validationMethod(node.val())) {
            node.removeClass('error');
        } else {
            node.addClass('error');
            this.valid = false;
        }
    },
    isValidDate: function (date) {
        return date.match(/^\d\d?\/\d\d?\/\d\d(\d\d)?$/) != null;
    },
    isPresent: function (value) {
        return value && value.length > 0 ? true : false;
    }
}


Validator.isFormValid = function () {
    var validator = new Validator();

    $.each($("input[validator]"), function () {
        validator.validate($(this));
    });

    return validator.valid;
}

Validator.attachToNodes = function () {
    var validator = new Validator();

    $("input[validator]").change(function () {
        validator.validate($(this));
    });
}