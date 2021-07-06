<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="LichLanhDao.ascx.cs" Inherits="HueCIT.Modules.LichCongTacDN.LichLanhDao" %>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/21.1.4/css/dx.common.css" />
<link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/21.1.4/css/dx.light.css" />
<%--<script src="https://cdn3.devexpress.com/jslib/21.1.4/js/dx.all.js"></script>--%>
<script src="/desktopModules/LichCongTacDN/DevExPress/dev.js"></script>
<%--<link rel="stylesheet" type="text/css" href="styles.css" />--%>
<link rel="stylesheet" type="text/css" href="/desktopModules/LichCongTacDN/DevExPress/LichLanhDao.css" />
<div class="demo-container">
    <div class="scheduler"></div>
</div>

<script>
    let AllUser;
    $.ajax({
        type: 'get',
        url: '/api/LichCongTacDN/CalendarTask/GetAllUser?CtyID=<%= CtyID %>',
        success: function (data) {
            AllUser = data;
        },
        error: function (err) {
            console.log('Load dữ liệu nhân viên lỗi.')
        }
    });

    let ListLanhDao;
    $.ajax({
        type: 'get',
        url: '/api/LichCongTacDN/CalendarTask/GetLanhDaoCty?CtyID=<%= CtyID %>',
        success: function (data) {
            ListLanhDao = data;
        },
        error: function (err) {
            console.log('Load dữ liệu nhân viên lỗi.')
        }
    });

    $(function () {
        $.ajax({
            type: 'get',
            url: '/api/LichCongTacDN/CalendarTask/GetLichLanhDao?CtyID=<%= CtyID %>',
            success: function (data) {
                //chuyển đổi đối tượng chuỗi từ api sang mảng để hiển thị.
                data.forEach(element => {
                    if (element.Management) {
                        element.Management = element.Management.split(',');
                    }
                    if (element.Object) {
                        element.Object = element.Object.split(',');
                    }
                });
                $(".scheduler").dxScheduler({
                    timeZone: "Asia/Ho_Chi_Minh",
                    dataSource: data, // Data lịch
                    views: ["day", "week", "month"],
                    currentView: "week",
                    currentDate: new Date(),
                    firstDayOfWeek: 1,
                    startDayHour: 7,
                    endDayHour: 19,
                    showAllDayPanel: false,
                    height: 600,
                    groups: ["employeeID"],
                    resources: [
                        {
                            fieldExpr: "employeeID",
                            allowMultiple: false,
                            dataSource: ListLanhDao, // Data List Lãnh Đạo
                            label: "Lãnh Đạo"
                        }
                    ],
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
                        var employeeID = cellData.groups.employeeID,
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

                    onAppointmentAdding: function (e) {
                        console.log(e);
                        var data = e.appointmentData;
                        if (data.Management) {
                            data.chutri = data.Management.join(',');
                        } else {
                            data.chutri = null;
                        }
                        if (data.Object) {
                            data.thamgia = data.Object.join(',');
                        } else {
                            data.thamgia = null;
                        }
                        data.CreatedByUserID = '<%= userid %>';
                        data.LastModifiedByUserID = '<%= userid %>';
                        data.ModuleID = '<%= ModuleID %>';
                        data.OwnerCode = '<%= OwnerCode %>';
                        data.Type = '<%= Type %>';
                        data.Status = '<%= Status %>';

                        $.ajax({
                            type: 'post',
                            url: '/api/LichCongTacDN/CalendarTask/ThemLichLanhDao',
                            dataType: 'json',
                            data: data,
                            success: function (data) {
                                DevExpress.ui.notify('Thêm lịch thành công', 'success', 2000);
                            },
                            //nếu lỗi dữ liệu ngày tháng do chưa có reco
                            error: function (err) {
                                if (err.responseJSON.code = '500') {
                                    data.startDate = data.startDate.format('yyyy-MM-dd H:mm:ss');
                                    data.endDate = data.endDate.format('yyyy-MM-dd H:mm:ss');
                                    $.ajax({
                                        type: 'post',
                                        url: '/api/LichCongTacDN/CalendarTask/ThemLichCaNhan',
                                        dataType: 'json',
                                        data: data,
                                        success: function (data) {
                                            DevExpress.ui.notify('Thêm lịch thành công', 'success', 2000);
                                        },
                                        error: function (err) {
                                            DevExpress.ui.notify('Lỗi. vui lòng thử lại', 'error', 2000);
                                            e.cancel = true;
                                        }
                                    });
                                }
                            }
                        });
                    },

                    onAppointmentUpdating: function (e) {
                        console.log(e);
                        //chỉ người khởi tạo hoặc bản thân lãnh đạo mới có quyền thay đổi lịch
                        if ('<%= userid %>' == e.newData.CreatedByUserID || '<%= userid %>' == e.newData.employeeID) {
                            if (e.oldData.employeeID == e.newData.employeeID) {
                                var data = e.newData;
                                if (data.Management) {
                                    data.chutri = data.Management.join(',');
                                } else {
                                    data.chutri = null;
                                }
                                if (data.Object) {
                                    data.thamgia = data.Object.join(',');
                                } else {
                                    data.thamgia = null;
                                }
                                data.LastModifiedByUserID = '<%= userid %>';
                                $.ajax({
                                    type: 'post',
                                    url: '/api/LichCongTacDN/CalendarTask/UpdateLichLanhDao',
                                    dataType: 'json',
                                    data: data,
                                    success: function (data) {
                                        DevExpress.ui.notify('Update lịch thành công', 'success', 2000);
                                    },
                                    error: function (err) {
                                        DevExpress.ui.notify('Lỗi. vui lòng thử lại', 'error', 2000);
                                        e.cancel = true;
                                    }
                                });
                            } else
                            {
                                DevExpress.ui.notify('Không có quyền thay đổi như vậy', 'warning', 2000);
                                e.cancel = true;
                            }
                        } else {
                            DevExpress.ui.notify('Không có quyền thay đổi', 'warning', 2000);
                            e.cancel = true;
                        }

                    },
                    onAppointmentDeleting: function (e) {
                        if (e.appointmentData.CreatedByUserID == '<%= userid %>') {
                            confirmDelete(e);
                        } else {
                            DevExpress.ui.notify('Không có quyền xóa lịch này', 'warning', 2000);
                            e.cancel = true;
                        }
                    },
                    onAppointmentFormOpening: function (e) {
                        //e.popup.option('showTitle', true);
                        //e.popup.option('title', e.appointmentData.text ?
                        //    e.appointmentData.text :
                        //    'Thêm Lịch Công Tác');
                        const form = e.form;
                        let mainGroupItems = form.itemOption('mainGroup').items;
                        if (!mainGroupItems.find(function (i) { return i.dataField === "Management" })) {
                            mainGroupItems.push({
                                colSpan: 2,
                                label: { text: "Chủ trì" },
                                editorType: "dxTagBox",
                                dataField: "Management",
                                editorOptions: {
                                    dataSource: AllUser,
                                    valueExpr: "ID",
                                    displayExpr: "FullName",
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
                                    dataSource: AllUser,
                                    valueExpr: "ID",
                                    displayExpr: "FullNameUserName",
                                    searchEnabled: true,
                                },
                            });
                            form.itemOption('mainGroup', 'items', mainGroupItems);
                        }
                    }

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
            },
            error: function (err) {
                console.log('Load lịch lãnh đạo lỗi.')
            }
        });

    });

    //Hàm xác nhận và xóa lịch
    function confirmDelete(Lich) {
        if (confirm("Bạn chắc chắn muốn xóa lịch này?")) {
            $.ajax({
                type: 'post',
                url: '/api/LichCongTacDN/CalendarTask/DeleteLichCaNhan?CalendarID=' + Lich.appointmentData.CalendarID,
                success: function (data) {
                    DevExpress.ui.notify('Xoá lịch thành công', 'success', 2000);
                },
                error: function (err) {
                    Lich.cancel = true;
                    DevExpress.ui.notify('Xóa không thành công. Nhấn F5 và thử lại', 'error', 2000);
                }
            });
        } else {
            Lich.cancel = true;
        }
    }
</script>
