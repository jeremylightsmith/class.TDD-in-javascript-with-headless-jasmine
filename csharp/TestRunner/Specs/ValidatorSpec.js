/// <reference path="../../Scripts/jquery-1.4.2.js"/>
/// <reference path="../../Scripts/Validator.js"/>
/// <reference path="../Jasmine/jasmine.js"/>

describe("Validator", function () {
    it("should check valid dates", function () {
        var validator = new Validator();

        expect(validator.isValidDate("1/2/2010")).toBe(true);
        expect(validator.isValidDate("12/22/2010")).toBe(true);
        expect(validator.isValidDate("12/22/10")).toBe(true);

        expect(validator.isValidDate("")).toBe(false);
        expect(validator.isValidDate("122/22/2010")).toBe(false);
        expect(validator.isValidDate("12/222/2010")).toBe(false);
        expect(validator.isValidDate("12/22/210")).toBe(false);
        expect(validator.isValidDate("asdf")).toBe(false);
    });

    it("should check if value is present", function () {
        var validator = new Validator();

        expect(validator.isPresent("")).toBe(false);
        expect(validator.isPresent(null)).toBe(false);
        expect(validator.isPresent(undefined)).toBe(false);
        expect(validator.isPresent("asdf")).toBe(true);
    });

    describe("dom methods", function () {
        var content, name, bday;

        beforeEach(function () {
            content = $('#jasmine_content');
            content.append('<input type="text" name="artist[name]" id="artist_name" validator="isPresent" />' +
                       '<input type="text" name="artist[birthday]" id="artist_birthday" validator="isValidDate" />');
            name = content.find('#artist_name');
            bday = content.find('#artist_birthday');
        });

        it("should validate in real time", function () {
            Validator.attachToNodes();

            expect(name).not.toHaveClass("error");

            name.val("asdf");
            name.change();

            expect(name).not.toHaveClass("error");

            name.val("");
            name.change();

            expect(name).toHaveClass("error");

            name.val("asdf");
            name.change();

            expect(name).not.toHaveClass("error");
        });

        it("should validate name & bday fields on form", function () {
            expect(Validator.isFormValid()).toBe(false);
            expect(name).toHaveClass("error");
            expect(bday).toHaveClass("error");

            name.val("anything");
            bday.val("1/2/2010");
            expect(Validator.isFormValid()).toBe(true);
            expect(name).not.toHaveClass("error");
            expect(bday).not.toHaveClass("error");

            bday.val("asdf");
            expect(Validator.isFormValid()).toBe(false);
            expect(name).not.toHaveClass("error");
            expect(bday).toHaveClass("error");

            name.val("");
            bday.val("1/2/2010");
            expect(Validator.isFormValid()).toBe(false);
            expect(name).toHaveClass("error");
            expect(bday).not.toHaveClass("error");
        });
    });
});