$(function(){

    //Default Data to Show
    var store = new DevExpress.data.ArrayStore(data1);
    var data = new DevExpress.data.DataSource(store);

    //Phongban dropdown box
    var modeId = Modedata[0].ID;
    $("#slbMode").dxSelectBox({
        items: Modedata,
        displayExpr: "text",
        valueExpr: "ID",
        value: Modedata[0].ID,
        onValueChanged: function (e) {
            modeId = e.value;
            if(modeId == "M01") {
                $("#phongField").hide();
                store = new DevExpress.data.ArrayStore(data1);
                data = new DevExpress.data.DataSource(store);
                data.load();             
                viewCongty();
            } else if(modeId == "M02") {
                $("#phongField").show();
            } else if(modeId == "M03") {
                $("#phongField").hide();
                store = new DevExpress.data.ArrayStore(data3);
                data = new DevExpress.data.DataSource(store);
                data.load();
                viewLanhdao();
            };
        }
    });

    var phongId;
    $("#slbPhong").dxSelectBox({
        items: Phongbandata,
        displayExpr: "DepartmentName",
        valueExpr: "ID",
        onValueChanged: function (e) {
            phongId = e.value;
            if(phongId == "ac6fad12-0dc2-4da9-9312-94ebcff7cbb1") {
                store = new DevExpress.data.ArrayStore(data21);
                data = new DevExpress.data.DataSource(store);
                data.load();
                viewPhongban();
            } else if(phongId == "f9ecf2a6-2793-4db5-b5c2-df056b34e86e") {
                store = new DevExpress.data.ArrayStore(data22);
                data = new DevExpress.data.DataSource(store);
                data.load();
                viewPhongban();
            } else if(phongId == "910820ea-b3c5-447f-82ef-d43d7b82f7b7") {
                store = new DevExpress.data.ArrayStore(data23);
                data = new DevExpress.data.DataSource(store);
                data.load();
                viewPhongban();
            };
        }
    });

    function viewCongty() {
        var Colordata = [
            {
                text: "Lịch Công ty",
                id: 0,
                color: "#2bcc53"
            }
        ];

        $("#scheduler").dxScheduler({
            timeZone: "America/Los_Angeles",
            dataSource: data,
            views: ["day", "week", "month"],
            currentView: "week",
            currentDate: new Date(2021, 2, 28),
            startDayHour: 7,
            endDayHour: 19,
            onAppointmentAdded: function(e) {
                showToast("Added",e.appointmentData.text, "success");
            },
            onAppointmentUpdated: function(e) {
                showToast("Updated",e.appointmentData.text, "info");
            },
            onAppointmentDeleted: function(e) {
                showToast("Deleted",e.appointmentData.text, "error");
            },
            height: 600,
            resources: [{ 
                fieldExpr: "MeetingRoomID",
                dataSource: MettingRoomdata,
                label: "Phòng"
            }, {
                fieldExpr: "color",
                dataSource: Colordata,
                useColorAsDefault: true,
            }],
            textExpr: "Title",
            onAppointmentFormOpening: function (e) {
                //e.popup.option('showTitle', true);
                //e.popup.option('title', e.appointmentData.text ?
                //    e.appointmentData.text :
                //    'Thêm Lịch Công Tác');
                const form = e.form;
                var formData = form.option("formData");
                let mainGroupItems = form.itemOption('mainGroup').items;

                mainGroupItems.forEach(function callbackFn(element, index) {
                    if(element.dataField == "color") {
                        mainGroupItems.splice(index,1);
                    }
                });
                          
                mainGroupItems.forEach(function callbackFn(element, index) {
                    if(element.dataField == "MeetingRoomID") {
                        mainGroupItems[index].colSpan = 2;
                    }
                });
          
                if (!mainGroupItems.find(function (i) { return i.dataField === "Management" })) {
                    mainGroupItems.push({
                        colSpan: 2,
                        label: { text: "Chủ trì" },
                        editorType: "dxTagBox",
                        dataField: "Management",
                        editorOptions: {
                            dataSource: UserIDdata,
                            valueExpr: "id",
                            displayExpr: "text",
                            searchEnabled: true,
                        },
                    });
                    form.itemOption('mainGroup', 'items', mainGroupItems);
                }
                if (!mainGroupItems.find(function (i) { return i.dataField === "Object" })) {
                    mainGroupItems.push({
                        colSpan: 2,
                        label: { text: "Người tham gia" },
                        editorType: "dxTagBox",
                        dataField: "Object",
                        editorOptions: {
                            dataSource: UserIDdata,
                            valueExpr: "id",
                            displayExpr: "text",
                            searchEnabled: true,
                        },
                    });
                    form.itemOption('mainGroup', 'items', mainGroupItems);
                }
            }
        }).dxScheduler("instance");
    }
    
    viewCongty();

    function viewPhongban() {
        var Colordata = [
            {
                text: "Lịch Phòng ban",
                id: 0,
                color: "#aa17ff"
            }
        ];

        $("#scheduler").dxScheduler({
            timeZone: "America/Los_Angeles",
            dataSource: data,
            views: ["day", "week", "month"],
            currentView: "week",
            currentDate: new Date(2021, 2, 28),
            startDayHour: 7,
            endDayHour: 19,
            onAppointmentAdded: function(e) {
                showToast("Added",e.appointmentData.text, "success");
            },
            onAppointmentUpdated: function(e) {
                showToast("Updated",e.appointmentData.text, "info");
            },
            onAppointmentDeleted: function(e) {
                showToast("Deleted",e.appointmentData.text, "error");
            },
            height: 600,
            resources: [{ 
                fieldExpr: "MeetingRoomID",
                dataSource: MettingRoomdata,
                label: "Phòng"
            }, {
                fieldExpr: "color",
                dataSource: Colordata,
                useColorAsDefault: true,
            }],
            textExpr: "Title",
            onAppointmentFormOpening: function (e) {
                //e.popup.option('showTitle', true);
                //e.popup.option('title', e.appointmentData.text ?
                //    e.appointmentData.text :
                //    'Thêm Lịch Công Tác');
                const form = e.form;
                var formData = form.option("formData");
                let mainGroupItems = form.itemOption('mainGroup').items;

                mainGroupItems.forEach(function callbackFn(element, index) {
                    if(element.dataField == "color") {
                        mainGroupItems.splice(index,1);
                    }
                });
                          
                mainGroupItems.forEach(function callbackFn(element, index) {
                    if(element.dataField == "MeetingRoomID") {
                        mainGroupItems[index].colSpan = 2;
                    }
                });
          
                if (!mainGroupItems.find(function (i) { return i.dataField === "Management" })) {
                    mainGroupItems.push({
                        colSpan: 2,
                        label: { text: "Chủ trì" },
                        editorType: "dxTagBox",
                        dataField: "Management",
                        editorOptions: {
                            dataSource: UserIDdata,
                            valueExpr: "id",
                            displayExpr: "text",
                            searchEnabled: true,
                        },
                    });
                    form.itemOption('mainGroup', 'items', mainGroupItems);
                }
                if (!mainGroupItems.find(function (i) { return i.dataField === "Object" })) {
                    mainGroupItems.push({
                        colSpan: 2,
                        label: { text: "Người tham gia" },
                        editorType: "dxTagBox",
                        dataField: "Object",
                        editorOptions: {
                            dataSource: UserIDdata,
                            valueExpr: "id",
                            displayExpr: "text",
                            searchEnabled: true,
                        },
                    });
                    form.itemOption('mainGroup', 'items', mainGroupItems);
                }
            }
        }).dxScheduler("instance");
    }

    function viewLanhdao() {
        $("#scheduler").dxScheduler({
            timeZone: "America/Los_Angeles",
            dataSource: data,
            views: ["day", "week", "month"],
            currentView: "week",
            currentDate: new Date(2021, 2, 29),
            firstDayOfWeek: 1,
            startDayHour: 7,
            endDayHour: 19,
            showAllDayPanel: false,
            height: 600,
            groups: ["employeeID"],
            resources: [
            { 
                fieldExpr: "MeetingRoomID",
                dataSource: MettingRoomdata,
                label: "Phòng"
            }, {
                fieldExpr: "employeeID",
                allowMultiple: false,
                dataSource: ListLanhDao,
                label: "Lãnh Đạo"
            }],
            resourceCellTemplate: function (cellData) {
                console.log(cellData);
                var name = $("<div>")
                    .addClass("name")
                    .css({ backgroundColor: cellData.color })
                    .append($("<h2>")
                        .text(cellData.text));

                var avatar = $("<div>")
                    .addClass("avatar")
                    .html("<img src=" + cellData.data.avatar + ">")
                    .attr("title", cellData.text);

                var info = $("<div>")
                    .addClass("info")
                    .css({ color: cellData.color })
                    .html("<b>Chức Vụ: " + cellData.data.Title + "</b><br/>" + cellData.data.Email);

                return $("<div>").append([name, avatar, info]);
            },
            dataCellTemplate: function (cellData, index, container) {
                var employeeID = cellData.employeeID,
                    currentTraining = getCurrentTraining(cellData.startDate.getDate(), employeeID);

                var wrapper = $("<div>")
                    .toggleClass("employee-weekend-" + employeeID, isWeekEnd(cellData.startDate)).appendTo(container)
                    .addClass("employee-" + employeeID)
                    .addClass("dx-template-wrapper");

                wrapper.append($("<div>")
                    .text(cellData.text)
                    .addClass(currentTraining)
                    .addClass("day-cell")
                );
            },
            onAppointmentAdded: function(e) {
                console.log(e);
                showToast("Added",e.appointmentData.text, "success");
            },
            onAppointmentUpdated: function(e) {
                showToast("Updated",e.appointmentData.text, "info");
            },
            onAppointmentDeleted: function(e) {
                showToast("Deleted",e.appointmentData.text, "error");
            },
            textExpr: "Title",
            onAppointmentFormOpening: function (e) {
                //e.popup.option('showTitle', true);
                //e.popup.option('title', e.appointmentData.text ?
                //    e.appointmentData.text :
                //    'Thêm Lịch Công Tác');
                const form = e.form;
                var formData = form.option("formData");
                let mainGroupItems = form.itemOption('mainGroup').items;

                mainGroupItems.forEach(function callbackFn(element, index) {
                    if(element.dataField == "employeeID") {
                        mainGroupItems.splice(index,1);
                    }
                });
                          
                mainGroupItems.forEach(function callbackFn(element, index) {
                    if(element.dataField == "MeetingRoomID") {
                        mainGroupItems[index].colSpan = 2;
                        mainGroupItems[index].visible = toggleRoom(formData.Meeting);
                    }
                });

                form.itemOption("mainGroup.Meeting", {
                    editorOptions: {
                        onValueChanged: function(e) {
                        form.itemOption("mainGroup.MeetingRoomID", "visible", e.value);
                        }
                    }
                });
          
                if (!mainGroupItems.find(function (i) { return i.dataField === "Management" })) {
                    mainGroupItems.push({
                        colSpan: 2,
                        label: { text: "Chủ trì" },
                        editorType: "dxTagBox",
                        dataField: "Management",
                        editorOptions: {
                            dataSource: UserIDdata,
                            valueExpr: "id",
                            displayExpr: "text",
                            searchEnabled: true,
                        },
                    });
                    form.itemOption('mainGroup', 'items', mainGroupItems);
                }
                if (!mainGroupItems.find(function (i) { return i.dataField === "Object" })) {
                    mainGroupItems.push({
                        colSpan: 2,
                        label: { text: "Người tham gia" },
                        editorType: "dxTagBox",
                        dataField: "Object",
                        editorOptions: {
                            dataSource: UserIDdata,
                            valueExpr: "id",
                            displayExpr: "text",
                            searchEnabled: true,
                        },
                    });
                    form.itemOption('mainGroup', 'items', mainGroupItems);
                }
            },
        });

        function isWeekEnd(date) {
                    var day = date.getDay();
                    return day === 0 || day === 6;
        }

        function getCurrentTraining(date, employeeID) {
            var result = (date + employeeID) % 3,
                currentTraining = "training-background-" + result;

            return currentTraining;
        }
    }

    function toggleRoom(bool) {
        if(bool != null){
            return bool;
        }
        else {
            return false;
        }
    }

    function showToast(event, value, type) {
            DevExpress.ui.notify(event + " \"" + value + "\"" + " task", type, 800);
    }

    function getEmpById(id) {
        return DevExpress.data.query(UserIDdata)
                .filter("id", id)
                .toArray()[0];
    }
});
