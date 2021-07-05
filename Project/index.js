$(function(){

    //Default Data to Show
    var store = new DevExpress.data.ArrayStore(data2);
    var data = new DevExpress.data.DataSource(store);
    data.filter([
        ["Phongban", "=", Phongbandata[1].id],
        "or",
        ["Phongban", "=", null]

    ]);
    data.load().done;

    function FilterData(id, option) {
        var op = check(option);
        switch (op) {
            case 1:
                data.filter([
                    ["Phongban", "=", id],
                    "or",
                    ["Phongban", "=", null],
                ]);
                data.load().done;
                break;
            case 2:
                data.filter([                   
                    ["Phongban", "=", id],                   
                ]);
                data.load().done;
                break;
            case 3:
                data.filter([                   
                    ["Phongban", "=", null],                   
                ]);
                data.load().done;
                break;
            case 4:
                data.filter([                   
                    ["Phongban", "=", 0],                   
                ]);
                data.load().done;
                break;
        };        
    };

    //Case for check box option
    function check(option) {
        if(option[0] == true && option[1] == true) {
            return 1;   //All
        }; 
        if(option[0] == true && option[1] == false) {
            return 2;   //Phòng ban
        }; 
        if(option[0] == false && option[1] == true) {
            return 3;   //Cá nhân
        };
        if(option[0] == false && option[1] == false) {
            return 4;   //None
        };
    };


    //Phongban dropdown box
    var phongId = Phongbandata[1].id;
    $("#slbPhong").dxSelectBox({
        items: Phongbandata,
        displayExpr: "text",
        valueExpr: "id",
        value: Phongbandata[1].id,
        onValueChanged: function (e) {
            phongId = e.value;
            console.log(e.value);
            if(phongId == "PB1") {
                store = new DevExpress.data.ArrayStore(data1);
                data = new DevExpress.data.DataSource(store);
                data.load();
                view();
            } else if(phongId == "PB2") {
                store = new DevExpress.data.ArrayStore(data2);
                data = new DevExpress.data.DataSource(store);
                data.load();
                view();
            } else if(phongId == "PB3") {
                store = new DevExpress.data.ArrayStore(data3);
                data = new DevExpress.data.DataSource(store);
                data.load();
                view();
            };
            FilterData(phongId, switchMaster);
        }
    });

    //Ca nhan, phong ban check box
    var switchMaster = [true, true];    //[0] = Phòng ban, [1] = Cá nhân

    $("#switch-Pb").dxCheckBox({
        value: true,
        width: 180,
        text: "Phòng ban",
        onValueChanged: function(e) {
            switchMaster[0] = e.value;
            FilterData(phongId, switchMaster);
        }
    });

    $("#switch-Cn").dxCheckBox({
        value: true,
        width: 180,
        text: "Cá nhân",
        onValueChanged: function(e) {
            switchMaster[1] = e.value;
            FilterData(phongId, switchMaster);
        }
    });
    
    var Colordata = [
    {
        text: "Lịch cá nhân",
        id: 1,
        color: "#1793ff"
    }, {
        text: "Lịch phòng ban",
        id: 2,
        color: "#aa17ff"
    }
    ];

    function view() {
        $("#scheduler").dxScheduler({
        timeZone: "America/Los_Angeles",
        dataSource: data,
        views: ["week", "month"],
        currentView: "week",
        currentDate: new Date(2021, 2, 28),
        startDayHour: 9,
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
            label: "Loại",
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
            console.log(mainGroupItems);

            mainGroupItems.forEach(function callbackFn(element, index) {
                if(element.dataField == "color") {
                    console.log("color: " + index);
                    mainGroupItems.splice(index,1);
                }
            });
                      
            mainGroupItems.forEach(function callbackFn(element, index) {
                if(element.dataField == "MeetingRoomID") {
                    console.log("Room: " + index);
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
        }
    }).dxScheduler("instance");
    }
    
    view();
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

// onAppointmentFormOpening: function(data) {
        //     var form = data.form,
        //     nhanvienInfo = getEmpById(data.appointmentData.Object) || {};

        //     var formData = form.option("formData");
            
        //     let mainGroupItems = form.itemOption('mainGroup').items; 

        //     form.itemOption('mainGroup',"items", [{
        //             colSpan: 2,
        //             label: {
        //                 text: "Sự kiện"
        //             },
        //             dataField: "Title",
        //             editorType: "dxTextBox"
        //         }, {
        //             label: {
        //                 text: "Thời gian bắt đầu"
        //             },
        //             dataField: "startDate",
        //             editorType: "dxDateBox",
        //             editorOptions: {
        //                 width: "100%",
        //                 type: "datetime"
        //             }
        //         }, {
        //             label: {
        //                 text: "Thời gian kết thúc"
        //             },
        //             dataField: "endDate",
        //             editorType: "dxDateBox",
        //             editorOptions: {
        //                 width: "100%",
        //                 type: "datetime"
        //             }
        //         }, {
        //             colSpan: 2,
        //             label: {
        //                 text: "Nội dung chi tiết"
        //             },
        //             dataField: "description",
        //             editorType: "dxTextArea",
        //             editorOptions: {
        //                 height: "100px  ",                      
        //             }
        //         }, {
        //             itemType: "group",
        //             colSpan: 2,
        //             colCount: 3,
        //             items: [{
        //                     label: {
        //                         text: "Là cuộc họp"
        //                     },
        //                     name: "IsMetting",
        //                     dataField: "Meeting",
        //                     editorType: "dxSwitch",
        //                     editorOptions: {
        //                         onValueChanged: function(e) {
        //                         form.itemOption("mainGroup.mroom", "visible", e.value);
        //                         }
        //                     },                          
        //                 }, {
        //                     label: {
        //                         text: "Nguyên ngày"
        //                     },
        //                     dataField: "allDay",
        //                     editorType: "dxSwitch",
        //                 }, {
        //                     label: {
        //                         text: "Lặp lại"
        //                     },
        //                     dataField: "laplai",
        //                     editorType: "dxSwitch",
        //                 }, {
        //                     label: {
        //                         text: "Lịch quan trọng"
        //                     },
        //                     dataField: "Important",
        //                     editorType: "dxSwitch",
        //                 }, {
        //                     label: {
        //                         text: "Riêng tư"
        //                     },
        //                     dataField: "Private",
        //                     editorType: "dxSwitch",
        //                 }]
        //             }, {
        //             colSpan: 2,
        //             label: {
        //                 text: "Chủ trì"
        //             },
        //             dataField: "Management",
        //             editorType: "dxTagBox",
        //             editorOptions: {
        //                 items: UserIDdata,
        //                 displayExpr: "text",
        //                 valueExpr: "id"
        //             },
        //         }, {
        //             colSpan: 2,
        //             label: {
        //                 text: "Người tham gia"
        //             },
        //             dataField: "Object",
        //             editorType: "dxTagBox",
        //             editorOptions: {
        //                 items: UserIDdata,
        //                 displayExpr: "text",
        //                 valueExpr: "id"
        //             },
        //         }, {
        //             label: {
        //                 text: "Phòng"
        //             },
        //             name: "mroom",                     
        //             dataField: "MeetingRoomID",
        //             visible: toggleRoom(formData.Meeting),
        //             editorType: "dxSelectBox",
        //             editorOptions: {
        //                 items: MettingRoomdata,
        //                 displayExpr: "text",
        //                 valueExpr: "id",
        //             },
        //         }
        //     ]);
        // }