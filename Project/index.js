$(function(){

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

