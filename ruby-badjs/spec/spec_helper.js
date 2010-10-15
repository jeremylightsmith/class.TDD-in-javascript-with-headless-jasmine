beforeEach(function () {
    this.addMatchers({
        toBeVisible: function () {
            var node = this.actual;
            this.message = function () {
                return ["expected node to be visible", "expected node not to be visible"];
            }
            return node.is(":visible");
        },
        toHaveClass: function (expectedClass) {
            var node = this.actual;
            this.message = function () {
                return [
                  "expected node to have class '" + expectedClass + "' but was '" + node.attr('class') + "'\n",
                  "expected node not to have class '" + expectedClass + "' but was '" + node.attr('class') + "'\n"
                ]
            };
            return node.hasClass(expectedClass);
        }
    })

    $('body').append("<div id='jasmine_content'></div>");
});

afterEach(function () {
    $('#jasmine_content').remove();
});
