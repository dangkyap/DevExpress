$(function(){

    //Default Data to Show
    var store = new DevExpress.data.ArrayStore(data1);
    var data = new DevExpress.data.DataSource(store);

    //Mode dropdown box
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
                store = new DevExpress.data.ArrayStore(data1);  //Thay khối dữ liệu
                data = new DevExpress.data.DataSource(store);   //Làm mới data
                data.load();             
                viewCongty();                                   //Chạy hàm view tương ứng mode xem
            } else if(modeId == "M02") {
                $("#phongField").show();
                store = new DevExpress.data.ArrayStore(data21);
                data = new DevExpress.data.DataSource(store);
                data.load();
                viewPhongban();
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
        value: Phongbandata[1].ID,
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
        //Hiển thị/ẩn các div chứa các lịch tương ứng
        $("#schedulerCT").show();
        $("#schedulerPB").hide();
        $("#schedulerLD").hide();

        //Resoure đổ màu
        var Colordata = [
            {
                text: "Lịch Công ty",
                id: 0,
                color: "#2bcc53"
            }
        ];

        $("#schedulerCT").dxScheduler({       //Thực tế cần div với class/id khác nhau cho mỗi view
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
                
                const form = e.form;
                var formData = form.option("formData");
                let mainGroupItems = form.itemOption('mainGroup').items;
                // e.popup.option('showTitle', true);
                // e.popup.option('title','Thêm bởi ' + e.appointmentData.CreatedByUserID);

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

                var Imelem, Prielem;               
                mainGroupItems.forEach(function callbackFn(element, index) {
                    if(element.itemType == "group") {
                        element.items.forEach(function callbackFn(ele, i) {
                            if(ele.dataField == "Important") {
                                Imelem = ele;
                                element.items.splice(i,1);
                            }
                        });
                        element.items.forEach(function callbackFn(ele, i) {
                            if(ele.dataField == "Private") {
                                Prielem = ele;
                                element.items.splice(i,1);
                            }
                        });
                    }
                });
                
                mainGroupItems.forEach(function callbackFn(element, index) {
                    if(element.itemType == "group") {
                        element.items.forEach(function callbackFn(ele, i) {
                            if(ele.dataField == "Meeting") {
                                element.items.splice(i,1);
                            }
                        });
                        element.items.forEach(function callbackFn(ele, i) {
                            if(ele.dataField == "repeat") {
                                element.items.splice(i,1);
                            }
                        });
                        element.items.forEach(function callbackFn(ele, i) {
                            if(ele.dataField == "allDay") {
                                element.items.push(Imelem);
                                element.items.push(Prielem);
                            }
                        });
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

    function viewPhongban() {

        $("#schedulerCT").hide();
        $("#schedulerPB").show();
        $("#schedulerLD").hide();

        var Colordata = [
            {
                text: "Lịch Phòng ban",
                id: 0,
                color: "#aa17ff"
            }
        ];

        $("#schedulerPB").dxScheduler({
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

                var Imelem, Prielem;               
                mainGroupItems.forEach(function callbackFn(element, index) {
                    if(element.itemType == "group") {
                        element.items.forEach(function callbackFn(ele, i) {
                            if(ele.dataField == "Important") {
                                Imelem = ele;
                                element.items.splice(i,1);
                            }
                        });
                        element.items.forEach(function callbackFn(ele, i) {
                            if(ele.dataField == "Private") {
                                Prielem = ele;
                                element.items.splice(i,1);
                            }
                        });
                    }
                });
                
                mainGroupItems.forEach(function callbackFn(element, index) {
                    if(element.itemType == "group") {
                        element.items.forEach(function callbackFn(ele, i) {
                            if(ele.dataField == "Meeting") {
                                element.items.splice(i,1);
                            }
                        });
                        element.items.forEach(function callbackFn(ele, i) {
                            if(ele.dataField == "repeat") {
                                element.items.splice(i,1);
                            }
                        });
                        element.items.forEach(function callbackFn(ele, i) {
                            if(ele.dataField == "allDay") {
                                element.items.push(Imelem);
                                element.items.push(Prielem);
                            }
                        });
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
        $("#schedulerCT").hide();
        $("#schedulerPB").hide();
        $("#schedulerLD").show();

        $("#schedulerLD").dxScheduler({
            timeZone: "America/Los_Angeles",
            dataSource: data,
            views: ["day", "week", "month"],
            currentView: "month",
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
                //console.log(cellData);
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

                    //console.log(cellData)

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
            // appointmentTooltipTemplate: function(model) {
            //     return getTooltipTemplate(getCalendarById(model.targetedAppointmentData.CalendarID), getLanhDaoById(model.targetedAppointmentData.employeeID));
            // },
            onAppointmentAdded: function(e) {
                //console.log(e);
                showToast("Added",e.appointmentData.text, "success");
            },
            onAppointmentUpdated: function(e) {
                showToast("Updated",e.appointmentData.text, "info");
            },
            onAppointmentDeleted: function(e) {
                showToast("Deleted",e.appointmentData.text, "error");
            },
            onAppointmentRendered: function(e) {
                console.log(e.component)
                // e.component._currentView = "day";
                if(e.appointmentData.Status == 1 || e.appointmentData.Status == 4) {
                    //console.log(e.component._appointmentTooltip._options.container[0])
                    e.appointmentElement[0].style.backgroundColor = "#ed4049";
                    //e.component._appointmentTooltip._options.container[0].style.background = "#ed4049";
                }
            },
            // onContentReady: function (e) {
            //     console.log(e.component._appointmentTooltip._options.container[0].style)       
            //         e.component._appointmentTooltip._options.container[0].style.background = "#ed4049";
            // },
            onAppointmentClick: function(e) {
                // if(e.appointmentData.Status == 1 || e.appointmentData.Status == 4) {
                //     //console.log(e.component)
                //     //console.log(e.component._appointmentTooltip._options.container[0].style.background)
                //     //e.cancel = true;
                //     // $(".dx-tooltip-appointment-item-marker-body").addClass("custom-tooltip-red");
                //     // e.cancel = false;
                // }
            },
            textExpr: "Title",
            onAppointmentFormOpening: function (e) {
                // e.popup.option('showTitle', true);
                // e.popup.option('title', e.appointmentData.text ?
                //    e.appointmentData.text :
                //    'Thêm Lịch Công Tác');
                 //e.popup.option('width', "1500px")
                 e.popup.option('minWidth', "1000px")
                

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
                    }
                });

                // var Imelem, Prielem;               
                // mainGroupItems.forEach(function callbackFn(element, index) {
                //     if(element.itemType == "group") {
                //         element.items.forEach(function callbackFn(ele, i) {
                //             if(ele.dataField == "Important") {
                //                 Imelem = ele;
                //                 element.items.splice(i,1);
                //             }
                //         });
                //         element.items.forEach(function callbackFn(ele, i) {
                //             if(ele.dataField == "Private") {
                //                 Prielem = ele;
                //                 element.items.splice(i,1);
                //             }
                //         });
                //     }
                // });
                
                mainGroupItems.forEach(function callbackFn(element, index) {
                    if(element.itemType == "group") {
                        element.items.forEach(function callbackFn(ele, i) {
                            if(ele.dataField == "Meeting") {
                                element.items.splice(i,1);
                            }
                        });
                        // element.items.forEach(function callbackFn(ele, i) {
                        //     if(ele.dataField == "repeat") {
                        //         element.items.splice(i,1);
                        //     }
                        // });
                        // element.items.forEach(function callbackFn(ele, i) {
                        //     if(ele.dataField == "allDay") {
                        //         element.items.push(Imelem);
                        //         element.items.push(Prielem);
                        //     }
                        // });
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

    // function getCalendarById(id) {
    //     return DevExpress.data.query(data3)
    //             .filter("CalendarID", id)
    //             .toArray()[0];
    // }

    // function getLanhDaoById(id) {
    //     return DevExpress.data.query(ListLanhDao)
    //             .filter("id", id)
    //             .toArray()[0];
    // }

    // function getTooltipTemplate(data, lanhdao) {
    //     return $("<div class='dx-tooltip-appointment-item'>" +
    //                 "<div class='dx-tooltip-appointment-item-marker'>" +
    //                     "<div class='dx-tooltip-appointment-item-marker-body' style='background:" + lanhdao.color + " none repeat scroll 0% 0%;'></div>" +
    //                 "</div>" +
    //                 "<div class='dx-tooltip-appointment-item-content'>" +
    //                     "<div class='dx-tooltip-appointment-item-content-subject'>" + data.Title + "</div>" + 
    //                     "<div class='dx-tooltip-appointment-item-content-date'>" + data.startDate.getMonth() + "</div>" + 
    //                 "<div>" +
    //                 // "<div class='dx-tooltip-appointment-item-delete-button-container'>" + 
    //                 //     "<div class='dx-tooltip-appointment-item-delete-button dx-button dx-button-normal dx-button-mode-text dx-widget dx-button-has-icon' aria-label='trash' tabindex='0' role='button'>" + 
    //                 //         "<div class='dx-button-content'>" + 
    //                 //             "<i class='dx-icon dx-icon-trash'></i>" + 
    //                 //         "</div>" +
    //                 //     "</div>" +
    //                 // "</div>" +
    //             "</div>");
    // }

     viewLanhdao();
     viewCongty();

    // $(document).ready(function(){
    //     viewLanhdao();
    //     viewCongty();
    // });


});
