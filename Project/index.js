$(function(){
    

    //Default Data to Show
    var store = new DevExpress.data.ArrayStore(data2);
    var data = new DevExpress.data.DataSource(store);
    data.load().done;

    function FilterData(option) {
        var op = check(option);
        switch (op) {
            case 1:
                data.filter([
                    ["color", "=", 1],
                    "or",
                    ["color", "=", 2],
                ]);
                data.load().done;
                break;
            case 2:
                data.filter([                   
                    ["color", "=", 2],                   
                ]);
                data.load().done;
                break;
            case 3:
                data.filter([                   
                    ["color", "=", 1],                   
                ]);
                data.load().done;
                break;
            case 4:
                data.filter([                   
                    ["color", "=", 0],                   
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
                store = new DevExpress.data.ArrayStore(data1);  //Thay khối dữ liệu
                data = new DevExpress.data.DataSource(store);   //Làm mới data
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
            FilterData(switchMaster);   //Lọc
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
            FilterData(switchMaster);
        }
    });

    $("#switch-Cn").dxCheckBox({
        value: true,
        width: 180,
        text: "Cá nhân",
        onValueChanged: function(e) {
            switchMaster[1] = e.value;
            FilterData(switchMaster);
        }
    });
    
    //Resource đổ màu
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
        $("#scheduler").dxScheduler({       //Chú ý class/id của div
        timeZone: "America/Los_Angeles",
        dataSource: data,
        views: ["week", "month"],
        currentView: "week",
        currentDate: new Date(2021, 2, 28),
        startDayHour: 9,
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
        height: 600,
        resources: [{ 
            fieldExpr: "MeetingRoomID",
            dataSource: MettingRoomdata,
            label: "Phòng",
            displayExpr: "RoomName",
            valueExpr:"Roomid"
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
            //console.log(mainGroupItems);

            //Xóa field color tự động thêm của resource
            mainGroupItems.forEach(function callbackFn(element, index) {
                if(element.dataField == "color") {
                    //console.log("color: " + index);
                    mainGroupItems.splice(index,1);
                }
            });
            
            //form.itemOption không hoạt động(?)          
            mainGroupItems.forEach(function callbackFn(element, index) {
                if(element.dataField == "MeetingRoomID") {
                    //console.log("Room: " + index);
                    mainGroupItems[index].colSpan = 2;
                    mainGroupItems[index].visible = toggleRoom(formData.Meeting);
                }
            });

            //Lấy dữ liệu Object với dataField Private, sau đó xóa Object khỏi mainGroupItems
            var Imelem;               
                mainGroupItems.forEach(function callbackFn(element, index) {
                    if(element.itemType == "group") {
                        element.items.forEach(function callbackFn(ele, i) {
                            if(ele.dataField == "Private") {
                                Imelem = ele;
                                element.items.splice(i,1);
                            }
                        });                      
                    }
                });
                
                //Xóa Object repeat khỏi mainGroupItems, thêm dữ liệu Object với dataField Private vào group Object allDay để thành 1 hàng
                mainGroupItems.forEach(function callbackFn(element, index) {
                    if(element.itemType == "group") {                       
                        element.items.forEach(function callbackFn(ele, i) {
                            if(ele.dataField == "repeat") {
                                element.items.splice(i,1);
                            }
                        });
                        element.items.forEach(function callbackFn(ele, i) {
                            if(ele.dataField == "allDay") {
                                element.items.push(Imelem);
                            }
                        });
                    }
                });


            form.itemOption("mainGroup.Meeting", {
                editorOptions: {
                    onValueChanged: function(e) {
                    form.itemOption("mainGroup.MeetingRoomID", "visible", e.value);
                    }
                }
            });

            console.log(mainGroupItems);
            console.log(formData);
                
            
            //THêm field để đưa/hiện dữ liệu cho dataField tương ứng
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
    
    //Hàm để hiện/ẩn field MeetingRoomID dựa vào AppoimentData
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
