$(function(){

    var data = new DevExpress.data.DataSource(data1);
    data.filter([
        ["Phongban", "=", Phongbandata[1].id],
        "or",
        ["Type", "=", 1]
    ]);
    data.load().done;

    function FilterData(id, option) {
        var op = check(option);
        switch (op) {
            case 1:
                data.filter([
                    ["Phongban", "=", id],
                    "or",
                    ["Type", "=", 1],
                    "or",
                    ["Type", "=", 2]
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
                    ["Type", "=", 1],                   
                ]);
                data.load().done;
                break;
            case 4:
                data.filter([                   
                    ["Type", "=", 1],                   
                ]);
                data.load().done;
                break;
        }        
    }

    function check(option) {
        if(option[0] = true && option[1] = true) {
            return 1;   //All
        } 
        if(option[0] = true && option[1] = false) {
            return 2;   //Phòng ban
        } 
        if(option[0] = false && option[1] = true) {
            return 3;   //Cá nhân
        } 
        if(option[0] = false && option[1] = false) {
            return 4;   //None
        }
    }

    var phongId;
    $("#slbPhong").dxSelectBox({
        items: Phongbandata,
        displayExpr: "text",
        valueExpr: "id",
        value: Phongbandata[1].id,
        onValueChanged: function (e) {
            phongId = e.value;            
            //FilterData(phongId, switchMaster);
        }
    });

    var switchMaster = [true, true];    //[0] = Phòng ban, [1] = Cá nhân

    $("#switch-Pb").dxCheckBox({
        value: true,
        width: 180,
        text: "Phòng ban",
        onValueChanged: function(e) {
            switchMaster[0] = e.value;
            //FilterData(phongId, switchMaster);
        }
    });

    $("#switch-Cn").dxCheckBox({
        value: true,
        width: 180,
        text: "Cá nhân",
        onValueChanged: function(e) {
            switchMaster[1] = e.value;
            //FilterData(phongId, switchMaster);
        }
    });

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
            fieldExpr: "Object",
            dataSource: UserIDdata,
            allowMultiple: true,
        }, { 
            fieldExpr: "Management",
            dataSource: UserIDdata,
            allowMultiple: true,
        }, { 
            fieldExpr: "MeetingRoomID",
            dataSource: MettingRoomdata,
        }, { 
            fieldExpr: "Type",
            dataSource: Typedata,
            useColorAsDefault: true,
        }],
        textExpr: "Title",
        onAppointmentFormOpening: function(data) {
            var form = data.form,
            nhanvienInfo = getEmpById(data.appointmentData.Object) || {};
            
            let mainGroupItems = form.itemOption('mainGroup').items; 

            form.itemOption('mainGroup',"items", [{
                    colSpan: 2,
                    label: {
                        text: "Sự kiện"
                    },
                    dataField: "Title",
                    editorType: "dxTextBox"
                }, {
                    label: {
                        text: "Thời gian bắt đầu"
                    },
                    dataField: "startDate",
                    editorType: "dxDateBox",
                    editorOptions: {
                        width: "100%",
                        type: "datetime"
                    }
                }, {
                    label: {
                        text: "Thời gian kết thúc"
                    },
                    dataField: "endDate",
                    editorType: "dxDateBox",
                    editorOptions: {
                        width: "100%",
                        type: "datetime"
                    }
                }, {
                    colSpan: 2,
                    label: {
                        text: "Nội dung chi tiết"
                    },
                    dataField: "description",
                    editorType: "dxTextArea",
                    editorOptions: {
                        height: "100px  ",                      
                    }
                }, {
                    itemType: "group",
                    colSpan: 2,
                    colCount: 3,
                    items: [{
                            label: {
                                text: "Là cuộc họp"
                            },
                            dataField: "Meeting",
                            editorType: "dxSwitch",
                            editorOptions: {
                                onValueChanged: function(e) {
                                form.itemOption("mroom", "visible", e.value);
                                console.log("R: " + e.value)
                                }
                            },                          
                        }, {
                            label: {
                                text: "Nguyên ngày"
                            },
                            dataField: "allDay",
                            editorType: "dxSwitch",
                        }, {
                            label: {
                                text: "Lặp lại"
                            },
                            dataField: "laplai",
                            editorType: "dxSwitch",
                        }, {
                            label: {
                                text: "Lịch quan trọng"
                            },
                            dataField: "Important",
                            editorType: "dxSwitch",
                        }, {
                            label: {
                                text: "Riêng tư"
                            },
                            dataField: "Private",
                            editorType: "dxSwitch",
                        }]
                    }, {
                    colSpan: 2,
                    label: {
                        text: "Chủ trì"
                    },
                    dataField: "Management",
                    editorType: "dxTagBox",
                    editorOptions: {
                        items: UserIDdata,
                        displayExpr: "text",
                        valueExpr: "id"
                    },
                }, {
                    colSpan: 2,
                    label: {
                        text: "Người tham gia"
                    },
                    dataField: "Object",
                    editorType: "dxTagBox",
                    editorOptions: {
                        items: UserIDdata,
                        displayExpr: "text",
                        valueExpr: "id"
                    },
                }, {
                    label: {
                        text: "Phòng"
                    },
                    name: "mroom",                  
                    dataField: "MeetingRoomID",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        items: MettingRoomdata,
                        displayExpr: "text",
                        valueExpr: "id"
                    },
                }
            ]);
        }
    }).dxScheduler("instance");

    function showToast(event, value, type) {
            DevExpress.ui.notify(event + " \"" + value + "\"" + " task", type, 800);
    }

    function getEmpById(id) {
        return DevExpress.data.query(UserIDdata)
                .filter("id", id)
                .toArray()[0];
    }
});

