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
            if(modeId == "M03") {
                $("#slbPB-wrapper").css('display', 'inline-block');
                $("#slbPB-placeholder").css('display', 'none');
                store = new DevExpress.data.ArrayStore(data21);
                data = new DevExpress.data.DataSource(store);
                data.load();
                view();
                radioGroup.option("value", TimeFilter[0]);
            } else {
                $("#slbPB-wrapper").css('display', 'none');
                $("#slbPB-placeholder").css('display', 'inline-block');
                store = new DevExpress.data.ArrayStore(data0);
                data = new DevExpress.data.DataSource(store);
                data.load();
                view();
            }
            Filter(modeId, TimeOption, keyword);
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
            //Filter(modeId, TimeOption, keyword);
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
            Filter(modeId, TimeOption, keyword);
        }
    });

    //Search button
    $("#button").dxButton({
        icon: "search",
        stylingMode: "outlined",
        type: "default",
        onClick: function() {
            Filter(modeId, TimeOption, keyword);
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
            Filter(modeId, TimeOption, keyword);
         }
    }).dxRadioGroup("instance");
  
    function view(){
        var dataGrid = $("#gridContainer").dxDataGrid({
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
                dataField: "CalendarID",
                caption: "Thống kê",
                visible: false
            }, {
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
                        cellElement.append($("<span>").text("Chờ duyệt: " + cellInfo.summaryItems[0].value  + " lịch"));
                    } else if(cellInfo.data.key == 2) {
                        cellElement.append($("<span>").text("Đã duyệt: " + cellInfo.summaryItems[0].value + " lịch"));
                    } else if(cellInfo.data.key == 3) {
                        cellElement.append($("<span>").text("Từ chối: " + cellInfo.summaryItems[0].value + " lịch"));
                    } else if(cellInfo.data.key == 4) {
                        cellElement.append($("<span>").text("Chờ sắp xếp duyệt: " + cellInfo.summaryItems[0].value + " lịch"));
                    } else if(cellInfo.data.key == 5) {
                        cellElement.append($("<span>").text("Đã xóa: " + cellInfo.summaryItems[0].value + " lịch"));
                    }
                },
            }, {
                caption: "Người khởi tạo",
                dataField: "CreatedByUserID",
            },{
                type: "buttons",
                name: "normal-field",
                width: 110,
                buttons: [
                    "edit","delete",
                    {
                        text: "Khôi phục",
                        visible: function(e) {
                            if(e.row.data.Status == 5) {
                                return true;
                            }
                            return false;
                        },
                        onClick: function (e) {
                            console.log(e.row.data);
                        }
                    }],
            }],
            onCellPrepared: function(e) {  
                if (e.columnIndex == 5 && e.rowType == "data") {
                    if (e.row.data.Status == 5){
                        e.cellElement.find(".dx-link-delete").remove();
                        e.cellElement.find(".dx-link-edit").remove();
                    }
                }   
            },
            editing: {
                mode: "popup",
                allowUpdating: true,
                allowDeleting: true,
                useIcons: false
            },
            summary: {
                groupItems: [{
                    column: "CalendarID",
                    summaryType: "count",
                    displayFormat: "{0} Lịch",
                }], 
                totalItems: [{
                    column: "Title",
                    summaryType: "count",
                }]
            },
            onContentReady: function (e) {                   
                var selectedDatasUsers = e.component.getDataSource().items();
                //console.log(e.component)
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
                    if(element.key == 5 && element.collapsedItems != null) {
                        element.collapsedItems.forEach(function callbackFn(e, i) {
                            setFilter(e, DateNow);
                        })
                    }
                });               
            },
        }).dxDataGrid("instance");

        // $("#autoExpand").dxCheckBox({
        //     value: false,
        //     text: "Mở rộng tất cả các nhóm",
        //     onValueChanged: function(data) {
        //         dataGrid.option("grouping.autoExpandAll", data.value);
        //     }
        // });
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

    function Filter(mode, option, keyword) {
        if(keyword == null || keyword == "") {
            if(mode == "M01" && option == "T01") {          //All - All
                data.filter(null);
                data.load().done;
            } else if(mode == "M01" && option == "T02") {   //All - Hom nay
                data.filter([                   
                    ["Filter", "=", 1],                   
                ]);
                data.load().done;
            } else if(mode == "M01" && option == "T03") {   //All - Tuan
                data.filter([                   
                    ["Filter", "<=", 2],                   
                ]);
                data.load().done;
            } else if(mode == "M01" && option == "T04") {   //All - Thang
                data.filter([                   
                    ["Filter", "<=", 3],                   
                ]);
                data.load().done;
            } else if(mode == "M02" && option == "T01") {   //Cong ty - All
                data.filter([                   
                    ["Type", "=", 3],              
                ]);
                data.load().done;
            } else if(mode == "M02" && option == "T02") {   //Cong ty - Hom nay
                data.filter([                   
                    ["Filter", "=", 1],
                    "and",
                    ["Type", "=", 3],              
                ]);
                data.load().done;
            } else if(mode == "M02" && option == "T03") {   //Cong ty - Tuan
                data.filter([                   
                    ["Filter", "<=", 2],
                    "and",
                    ["Type", "=", 3],              
                ]);
                data.load().done;
            } else if(mode == "M02" && option == "T04") {   //Cong ty - Thang
                data.filter([                   
                    ["Filter", "<=", 3],
                    "and",
                    ["Type", "=", 3],              
                ]);
                data.load().done;
            } else if(mode == "M03" && option == "T01") {   //Phong ban - All
                data.filter([                   
                    ["Type", "=", 2],              
                ]);
                data.load().done;
            } else if(mode == "M03" && option == "T02") {   //Phong ban - Hom nay
                data.filter([                   
                    ["Filter", "=", 1],
                    "and",
                    ["Type", "=", 2],              
                ]);
                data.load().done;
            } else if(mode == "M03" && option == "T03") {   //Phong ban - Tuan
                data.filter([                   
                    ["Filter", "<=", 2],
                    "and",
                    ["Type", "=", 2],              
                ]);
                data.load().done;
            } else if(mode == "M03" && option == "T04") {   //Phong ban - Thang
                data.filter([                   
                    ["Filter", "<=", 3],
                    "and",
                    ["Type", "=", 2],              
                ]);
                data.load().done;
            } else if(mode == "M04" && option == "T01") {   //Lanh dao - All
                data.filter([                   
                    ["Type", "=", 4],              
                ]);
                data.load().done;
            } else if(mode == "M04" && option == "T02") {   //Lanh dao - Hom nay
                data.filter([                   
                    ["Filter", "=", 1],
                    "and",
                    ["Type", "=", 4],              
                ]);
                data.load().done;
            } else if(mode == "M04" && option == "T03") {   //Lanh dao - Tuan
                data.filter([                   
                    ["Filter", "<=", 2],
                    "and",
                    ["Type", "=", 4],              
                ]);
                data.load().done;
            } else if(mode == "M04" && option == "T04") {   //Lanh dao - Thang
                data.filter([                   
                    ["Filter", "<=", 3],
                    "and",
                    ["Type", "=", 4],              
                ]);
                data.load().done;
            } else if(mode == "M05" && option == "T01") {   //Hop - All
                data.filter([                   
                    ["Type", "<>", 1],
                    "and",
                    ["Meeting", "=", true],             
                ]);
                data.load().done;
            } else if(mode == "M05" && option == "T02") {   //Hop - Hom nay
                data.filter([                   
                    ["Filter", "=", 1],
                    "and",
                    ["Type", "<>", 1],
                    "and",
                    ["Meeting", "=", true],
                ]);
                data.load().done;
            } else if(mode == "M05" && option == "T03") {   //Hop - Tuan
                data.filter([                   
                    ["Filter", "<=", 2],
                    "and",
                    ["Type", "<>", 1],
                    "and",
                    ["Meeting", "=", true],
                ]);
                data.load().done;
            } else if(mode == "M05" && option == "T04") {   //Hop - Thang
                data.filter([                   
                    ["Filter", "<=", 3],
                    "and",
                    ["Type", "<>", 1],
                    "and",
                    ["Meeting", "=", true],
                ]);
                data.load().done;
            }
            
        } else {
            if(mode == "M01" && option == "T01") {          //All - All
                data.filter([                   
                    ["Title", "contains", keyword],                   
                ]);
                data.load().done;
            } else if(mode == "M01" && option == "T02") {   //All - Hom nay
                data.filter([                   
                    ["Filter", "=", 1],
                    "and",
                    ["Title", "contains", keyword],                  
                ]);
                data.load().done;
            } else if(mode == "M01" && option == "T03") {   //All - Tuan
                data.filter([                   
                    ["Filter", "<=", 2],
                    "and",
                    ["Title", "contains", keyword],                   
                ]);
                data.load().done;
            } else if(mode == "M01" && option == "T04") {   //All - Thang
                data.filter([                   
                    ["Filter", "<=", 3],
                    "and",
                    ["Title", "contains", keyword],                   
                ]);
                data.load().done;
            } else if(mode == "M02" && option == "T01") {   //Cong ty - All
                data.filter([                   
                    ["Type", "=", 3],
                    "and",
                    ["Title", "contains", keyword],             
                ]);
                data.load().done;
            } else if(mode == "M02" && option == "T02") {   //Cong ty - Hom nay
                data.filter([                   
                    ["Filter", "=", 1],
                    "and",
                    ["Type", "=", 3],
                    "and",
                    ["Title", "contains", keyword],              
                ]);
                data.load().done;
            } else if(mode == "M02" && option == "T03") {   //Cong ty - Tuan
                data.filter([                   
                    ["Filter", "<=", 2],
                    "and",
                    ["Type", "=", 3],
                    "and",
                    ["Title", "contains", keyword],             
                ]);
                data.load().done;
            } else if(mode == "M02" && option == "T04") {   //Cong ty - Thang
                data.filter([                   
                    ["Filter", "<=", 3],
                    "and",
                    ["Type", "=", 3],
                    "and",
                    ["Title", "contains", keyword],              
                ]);
                data.load().done;
            } else if(mode == "M03" && option == "T01") {   //Phong ban - All
                data.filter([                   
                    ["Type", "=", 2],
                    "and",
                    ["Title", "contains", keyword],             
                ]);
                data.load().done;
            } else if(mode == "M03" && option == "T02") {   //Phong ban - Hom nay
                data.filter([                   
                    ["Filter", "=", 1],
                    "and",
                    ["Type", "=", 2],
                    "and",
                    ["Title", "contains", keyword],             
                ]);
                data.load().done;
            } else if(mode == "M03" && option == "T03") {   //Phong ban - Tuan
                data.filter([                   
                    ["Filter", "<=", 2],
                    "and",
                    ["Type", "=", 2],
                    "and",
                    ["Title", "contains", keyword],             
                ]);
                data.load().done;
            } else if(mode == "M03" && option == "T04") {   //Phong ban - Thang
                data.filter([                   
                    ["Filter", "<=", 3],
                    "and",
                    ["Type", "=", 2],
                    "and",
                    ["Title", "contains", keyword],            
                ]);
                data.load().done;
            } else if(mode == "M04" && option == "T01") {   //Lanh dao - All
                data.filter([                   
                    ["Type", "=", 4],
                    "and",
                    ["Title", "contains", keyword],              
                ]);
                data.load().done;
            } else if(mode == "M04" && option == "T02") {   //Lanh dao - Hom nay
                data.filter([                   
                    ["Filter", "=", 1],
                    "and",
                    ["Type", "=", 4],
                    "and",
                    ["Title", "contains", keyword],              
                ]);
                data.load().done;
            } else if(mode == "M04" && option == "T03") {   //Lanh dao - Tuan
                data.filter([                   
                    ["Filter", "<=", 2],
                    "and",
                    ["Type", "=", 4],
                    "and",
                    ["Title", "contains", keyword],              
                ]);
                data.load().done;
            } else if(mode == "M04" && option == "T04") {   //Lanh dao - Thang
                data.filter([                   
                    ["Filter", "<=", 3],
                    "and",
                    ["Type", "=", 4],
                    "and",
                    ["Title", "contains", keyword],              
                ]);
                data.load().done;
            } else if(mode == "M05" && option == "T01") {   //Hop - All
                data.filter([                   
                    ["Type", "<>", 1],
                    "and",
                    ["Meeting", "=", true],
                    "and",
                    ["Title", "contains", keyword],            
                ]);
                data.load().done;
            } else if(mode == "M05" && option == "T02") {   //Hop - Hom nay
                data.filter([                   
                    ["Filter", "=", 1],
                    "and",
                    ["Type", "<>", 1],
                    "and",
                    ["Meeting", "=", true],
                    "and",
                    ["Title", "contains", keyword],
                ]);
                data.load().done;
            } else if(mode == "M05" && option == "T03") {   //Hop - Tuan
                data.filter([                   
                    ["Filter", "<=", 2],
                    "and",
                    ["Type", "<>", 1],
                    "and",
                    ["Meeting", "=", true],
                    "and",
                    ["Title", "contains", keyword],
                ]);
                data.load().done;
            } else if(mode == "M05" && option == "T04") {   //Hop - Thang
                data.filter([                   
                    ["Filter", "<=", 3],
                    "and",
                    ["Type", "<>", 1],
                    "and",
                    ["Meeting", "=", true],
                    "and",
                    ["Title", "contains", keyword],
                ]);
                data.load().done;
            }
        }
        
    }
    
});