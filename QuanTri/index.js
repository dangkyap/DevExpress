$(function(){
    const DateNow = new Date();

    //Default data to show
    var store = new DevExpress.data.ArrayStore(data0);
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
                $("#slbPB-wrapper").css('display', 'none');
                $("#slbPB-placeholder").css('display', 'inline-block');
                store = new DevExpress.data.ArrayStore(data0);  //Thay khối dữ liệu
                data = new DevExpress.data.DataSource(store);   //Làm mới data
                data.load();             
                view();                                   //Chạy hàm view tương ứng mode xem
            } else if(modeId == "M02") {
                $("#slbPB-wrapper").css('display', 'none');
                $("#slbPB-placeholder").css('display', 'inline-block');
                store = new DevExpress.data.ArrayStore(data1);
                data = new DevExpress.data.DataSource(store);
                data.load();
                view();
            } else if(modeId == "M03") {
                $("#slbPB-wrapper").css('display', 'inline-block');
                $("#slbPB-placeholder").css('display', 'none');
                store = new DevExpress.data.ArrayStore(data21);
                data = new DevExpress.data.DataSource(store);
                data.load();
                view();
            } else if(modeId == "M04") {
                $("#slbPB-wrapper").css('display', 'none');
                $("#slbPB-placeholder").css('display', 'inline-block');
                store = new DevExpress.data.ArrayStore(data3);
                data = new DevExpress.data.DataSource(store);
                data.load();
                view();
            } else if(modeId == "M05") {
                $("#slbPB-wrapper").css('display', 'none');
                $("#slbPB-placeholder").css('display', 'inline-block');
                store = new DevExpress.data.ArrayStore(data4);
                data = new DevExpress.data.DataSource(store);
                data.load();
                view();
            };
            radioGroup.option("value", TimeFilter[0]);  //Chuyen ve che do tat ca de them field Filter
        }
    });

    //Phong ban dropdown box
    var phongId;
    $("#slbPB").dxSelectBox({
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
                view();
            } else if(phongId == "f9ecf2a6-2793-4db5-b5c2-df056b34e86e") {
                store = new DevExpress.data.ArrayStore(data22);
                data = new DevExpress.data.DataSource(store);
                data.load();
                view();
            } else if(phongId == "910820ea-b3c5-447f-82ef-d43d7b82f7b7") {
                store = new DevExpress.data.ArrayStore(data23);
                data = new DevExpress.data.DataSource(store);
                data.load();
                view();
            };
            radioGroup.option("value", TimeFilter[0]);
        }
    });

    //Search box
    var keyword = null;
    $("#txtSearch").dxTextBox({
        showClearButton: true,
        placeholder: "Tìm kiếm theo tiêu đề",
        onValueChanged: function(data) {
            keyword = data.value;
            Filter(TimeOption, keyword);
        }
    });

    //Search button
    $("#button").dxButton({
        icon: "search",
        stylingMode: "outlined",
        type: "default",
        onClick: function() {
            Filter(TimeOption, keyword);
        }
    });

    //Radio button group
    var TimeOption = "T01";
    var radioGroup = $("#radio-group").dxRadioGroup({
        items: TimeFilter,
        value: TimeFilter[0],
        layout: "horizontal",
         onValueChanged: function(e){
            TimeOption = e.value.ID;
            Filter(TimeOption, keyword);
         }
    }).dxRadioGroup("instance");

    function view(){
        $("#gridContainer").dxDataGrid({
            dataSource: data,
            allowColumnReordering: true,
            showBorders: true,
            grouping: {
                autoExpandAll: false,
            },
            searchPanel: {
                visible: false
            },
            paging: {
                pageSize: 20
            }, 
            columns: [{
                dataField: "Title",
                caption: "Tiêu đề"
            }, {
                dataField: "startDate",
                caption: "Thời gian thực hiện",
                dataType: "datetime",
            }, {
                dataField: "CreatedOnDate",
                caption: "Thời gian khởi tạo",
                dataType: "datetime",
            }, {
                caption: "Trạng thái",
                groupIndex: 0,
                dataField: "Status",
                groupCellTemplate:function (cellElement, cellInfo) {
                    if(cellInfo.data.key == 1) {
                        cellElement.append($("<span>").text("Chờ duyệt"));
                    } else if(cellInfo.data.key == 2) {
                        cellElement.append($("<span>").text("Đã duyệt"));
                    } else if(cellInfo.data.key == 3) {
                        cellElement.append($("<span>").text("Từ chối"));
                    } else if(cellInfo.data.key == 4) {
                        cellElement.append($("<span>").text("Chờ sắp xếp duyệt"));
                    }
                },
            }, {
                caption: "Người khởi tạo",
                dataField: "CreatedByUserID",
            }],
            editing: {
                mode: "row",
                allowUpdating: true,
                allowDeleting: true,
                useIcons: true
            },
            onContentReady: function (e) {  
                var selectedDatasUsers = e.component.getDataSource().items();

                selectedDatasUsers.forEach(function callbackFn(element, index) {
                    if(element.key == 1 && element.collapsedItems != null) {
                        element.collapsedItems.forEach(function callbackFn(e, i) {
                            setFilter(e, DateNow);
                        })
                    }
                    if(element.key == 2 && element.collapsedItems != null) {
                        element.collapsedItems.forEach(function callbackFn(e, i) {
                            setFilter(e, DateNow);
                        })
                    }
                    if(element.key == 3 && element.collapsedItems != null) {
                        element.collapsedItems.forEach(function callbackFn(e, i) {
                            setFilter(e, DateNow);
                        })
                    }
                    if(element.key == 4 && element.collapsedItems != null) {
                        element.collapsedItems.forEach(function callbackFn(e, i) {
                            setFilter(e, DateNow);
                        })
                    }
                });               
            },   
        });
    }

    view();

    //Set field filter de loc
    function setFilter(e, now) {
        //Trong thang, filter = 3
        if(e.CreatedOnDate.getFullYear() == now.getFullYear() && e.CreatedOnDate.getMonth() == now.getMonth()) {
            e.Filter = 3;
        }

        //Trong tuan, filter = 2
        switch(now.getDay()) {
            //Thu 2
            case 1:
                if(e.CreatedOnDate.getFullYear() == now.getFullYear() && e.CreatedOnDate.getMonth() == now.getMonth() && e.CreatedOnDate.getDate() >= now.getDate() && e.CreatedOnDate.getDate() <= (now.getDate() + 6)) {
                    e.Filter = 2;
                }
                break;
            //Thu 3
            case 2:
                if(e.CreatedOnDate.getFullYear() == now.getFullYear() && e.CreatedOnDate.getMonth() == now.getMonth() && e.CreatedOnDate.getDate() >= (now.getDate() - 1) && e.CreatedOnDate.getDate() <= (now.getDate() + 5)) {
                    e.Filter = 2;
                }
                break;
            //Thu 4
            case 3:
                if(e.CreatedOnDate.getFullYear() == now.getFullYear() && e.CreatedOnDate.getMonth() == now.getMonth() && e.CreatedOnDate.getDate() >= (now.getDate() - 2) && e.CreatedOnDate.getDate() <= (now.getDate() + 4)) {
                    e.Filter = 2;
                }
                break;
            //Thu 5
            case 4:
                if(e.CreatedOnDate.getFullYear() == now.getFullYear() && e.CreatedOnDate.getMonth() == now.getMonth() && e.CreatedOnDate.getDate() >= (now.getDate() - 3) && e.CreatedOnDate.getDate() <= (now.getDate() + 3)) {
                    e.Filter = 2;
                }
                break;
            //Thu 6
            case 5:
                if(e.CreatedOnDate.getFullYear() == now.getFullYear() && e.CreatedOnDate.getMonth() == now.getMonth() && e.CreatedOnDate.getDate() >= (now.getDate() - 4) && e.CreatedOnDate.getDate() <= (now.getDate() + 2)) {
                    e.Filter = 2;
                }
                break;
            //Thu 7
            case 6:
                if(e.CreatedOnDate.getFullYear() == now.getFullYear() && e.CreatedOnDate.getMonth() == now.getMonth() && e.CreatedOnDate.getDate() >= (now.getDate() - 5) && e.CreatedOnDate.getDate() <= (now.getDate() + 1)) {
                    e.Filter = 2;
                }
                break;
            //CN
            case 0:
                if(e.CreatedOnDate.getFullYear() == now.getFullYear() && e.CreatedOnDate.getMonth() == now.getMonth() && e.CreatedOnDate.getDate() >= (now.getDate() - 6) && e.CreatedOnDate.getDate() <= (now.getDate())) {
                    e.Filter = 2;
                }
                break;
        }
        
        //Hom nay, filter = 1
        if(e.CreatedOnDate.getFullYear() == now.getFullYear() && e.CreatedOnDate.getMonth() == now.getMonth() && e.CreatedOnDate.getDate() == now.getDate()) {
            e.Filter = 1;
        }
    }

    function Filter(option, keyword) {
        if(keyword == null || keyword == "") {
            switch(option) {
                case "T01":
                    data.filter(null);
                    data.load().done;
                    break;
                case "T02":
                    data.filter([                   
                        ["Filter", "=", 1],                   
                    ]);
                    data.load().done;
                    break;
                case "T03":
                    data.filter([                   
                        ["Filter", "<=", 2],                
                    ]);
                    data.load().done;
                    break;
                case "T04":
                    data.filter([                   
                        ["Filter", "<=", 3],                  
                    ]);
                    data.load().done;
                    break;
            }
        } else {
            switch(option) {
                case "T01":
                    data.filter([                   
                        ["Title", "contains", keyword],                   
                    ]);
                    data.load().done;
                    break;
                case "T02":
                    data.filter([                   
                        ["Filter", "=", 1],
                        "and",
                        ["Title", "contains", keyword],       
                    ]);
                    data.load().done;
                    break;
                case "T03":
                    data.filter([                   
                        ["Filter", "<=", 2],
                        "and",
                        ["Title", "contains", keyword],                  
                    ]);
                    data.load().done;
                    break;
                case "T04":
                    data.filter([                   
                        ["Filter", "<=", 3],
                        "and",
                        ["Title", "contains", keyword],                   
                    ]);
                    data.load().done;
                    break;
            }
        }
        
    }
    
});