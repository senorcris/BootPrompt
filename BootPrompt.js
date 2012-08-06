/*
Description: Create a Bootstrap modal using a Backbone View, which has two buttons (ok & cancel).
Author: SenorCris
Example:
var popup = new BootPrompt({
                        width: 300,
                        title: "What is your name?",
                        content: '<h4 class="pull-left popover-h4" >Name:</h4><input style="margin-left:8px;" placeholder="Name">',
                        ok: function ($el) {
                            var dataName = $el.find("input").val();
                            if (typeof dataName === "string") {
                                console.log(dataName)
                                return true; //hide
                            } else {
                                $el.find(".modal-body input")
                                    .addClass("errorControl");
                                return false; //continue showing
                            }
                        }
                    }).show();
*/
define(["backbone", "underscore"],
function() {
    return Backbone.View.extend({
        tagName: "div",
        className: "modal hide",
        events: {
            "click .ok": "_okAction",
            "click .cancel": "_cancelAction"
        },
        initialize: function (options) {
            var self = this;
            _.extend(this, options);
            this.$el.on('hidden', function () {
                $(this).off();
                $(this).remove();
            });
            this.$el.on('keyup', 'input', function (e) {
                if (e.which === 13) {
                    $(this).parents(".modal").find(".ok").trigger("click");
                }
            });
        },
        render: function () {
            //console.log("Popup openned");
            var Section = this._createSection(),
                closeBtn = '<button type="button" class="close" data-dismiss="modal">�</button>',
                cancelBtn = '<a href="#" class="cancel btn">Cancel</a>',
                okBtn = '<a href="#" class="ok btn btn-primary">Ok</a>',
                title = "<h3>" + this.title + "</h3>",
                bodyContent = this.content,
                modalWidth = this.width;
            var header = new Section({
                name: "header",
                content: closeBtn + title
            });
            var body = new Section({
                name: "body",
                content: bodyContent
            });
            var footer = new Section({
                name: "footer",
                content: cancelBtn + okBtn
            });
            this.$el.append(header.$el)
                    .append(body.$el)
                    .append(footer.$el)
                    .modal("show");
            if (_.isNumber(modalWidth) || _.isString(modalWidth)) {
                this.$el.css({
                    'width': modalWidth,
                    'margin-left': function () {
                        return -($(this).width() / 2);
                    }
                });
            }
            return this;
        },
        _createSection: function() {
            return Backbone.View.extend({
                classNamePrefix: "modal-",
                appendContent: function () {
                    this.$el.append(this.content);
                    this.$el.addClass(this.classNamePrefix + this.name);
                    return this;
                },
                initialize: function (options) {
                    _.extend(this, options);
                    this.appendContent();
                },
                render: function () {
                    return this;
                }
            });
        },
        _okAction: function (e) {
            if (this.ok(this.$el, e)) {
                this.hide();
            }
        },
        _cancelAction: function (e) {
            if (this.cancel(this.$el, e)) {
                this.hide();
            }
        },
        //###Public
        ok: function ($el, e) {
            //Override
            return true;
        },
        cancel: function ($el, e) {
            //Override
            return true;
        },
        show: function () {
            this.render();
        },
        hide: function () {
            this.$el.modal("hide");
        }
    });
});