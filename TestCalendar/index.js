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
            fieldExpr: "nhanvienId",
            dataSource: UserIDdata,
            allowMultiple: true,
            label: "Tham dự"
        }, { 
            fieldExpr: "chutriId",
            dataSource: UserIDdata,
            allowMultiple: true,
            label: "Chủ trì"
        }, { 
            fieldExpr: "phonghopId",
            dataSource: phonghopData,
            label: "Phòng họp"
        }, { 
            fieldExpr: "type",
            dataSource: typeData,
            useColorAsDefault: true,
        }],
        onAppointmentFormOpening: function(data) {
            var form = data.form,
            nhanvienInfo = getEmpById(data.appointmentData.nhanvienId) || {};
            
            let mainGroupItems = form.itemOption('mainGroup').items; 
            //if (!mainGroupItems.find(function(i) { return i.dataField === "startDate" })) {

                form.itemOption('mainGroup',"items", [{
                        colSpan: 2,
                        label: {
                            text: "Sự kiện"
                        },
                        dataField: "text",
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
                        dataField: "chitiet",
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
                                dataField: "cuochop",
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
                                dataField: "quantrong",
                                editorType: "dxSwitch",
                            }, {
                                label: {
                                    text: "Riêng tư"
                                },
                                dataField: "riengtu",
                                editorType: "dxSwitch",
                            }]
                        }, {
                        colSpan: 2,
                        label: {
                            text: "Chủ trì"
                        },
                        dataField: "chutriId",
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
                        dataField: "nhanvienId",
                        editorType: "dxTagBox",
                        editorOptions: {
                            items: UserIDdata,
                            displayExpr: "text",
                            valueExpr: "id"
                        },
                    }
                ]);
            //}
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

