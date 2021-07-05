<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="LichCaNhan.ascx.cs" Inherits="HueCIT.Modules.LichCongTacDN.LichCaNhan" %>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/21.1.3/css/dx.common.css" />
<link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/21.1.3/css/dx.light.css" />
<!-- <script src="https://cdn3.devexpress.com/jslib/21.1.3/js/dx.all.js"></script> -->
<script src="/desktopModules/LichCongTacDN/DevExPress/dev.js"></script>
<%--<script src="/desktopModules/LichCongTacDN/DevExPress/data.js"></script>--%>
<!-- <link rel="stylesheet" type="text/css" href="styles.css" /> -->
<div class="demo-container">
    <div id="scheduler"></div>
</div>

<script>
    let AllUser;
    $.ajax({
        type: 'get',
        url: '/api/LichCongTacDN/CalendarTask/GetAllUser?CtyID=<%= CtyID %>',
        success: function (data) {
            //return data;
            AllUser = data;
        },
        error: function (err) {
            console.log('Load dữ liệu nhân viên lỗi.')
        }
    });

    $(function () {
        $.ajax({
            type: 'get',
            url: '/api/LichCongTacDN/CalendarTask/GetLichCaNhan?ObjectID=<%= userid %>',
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

                $("#scheduler").dxScheduler({
                    timeZone: "Asia/Ho_Chi_Minh",
                    dataSource: data,
                    //views: ["day", "week", "workWeek", "month"],
                    views: ["day", "week", "month"],
                    currentView: "week", //view mặc định
                    currentDate: new Date(), // thời gian view mặc định
                    startDayHour: 7,
                    endDayHour: 19,
                    height: 500,

                    //Sự kiện thêm mới lịch
                    onAppointmentAdding: function (e) {
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
                            url: '/api/LichCongTacDN/CalendarTask/ThemLichCaNhan',
                            dataType: 'json',
                            data: data,
                            success: function (data) {
                                DevExpress.ui.notify('Thêm lịch thành công', 'success', 2000);
                            },
                            //nếu lỗi dữ liệu ngày tháng do chưa có reco
                            error: function (err) {
                                console.log(err);
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

                    //Cập nhật lịch
                    onAppointmentUpdating: function (e) {
                        if (e.newData.CreatedByUserID == '<%= userid %>') {
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
                                url: '/api/LichCongTacDN/CalendarTask/UpdateLichCaNhan',
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
                        } else {
                            DevExpress.ui.notify('Chỉ Người Khởi Tạo mới có quyền thay đổi', 'warning', 2000);
                            e.cancel = true;
                        }
                    },

                    //Sự kiện xóa lịch
                    onAppointmentDeleting: function (e) {
                        if (e.appointmentData.CreatedByUserID == '<%= userid %>') {
                            confirmDelete(e);
                        } else {
                            DevExpress.ui.notify('Không có quyền xóa lịch này', 'warning', 2000);
                            e.cancel = true;
                        }
                    },
                    //Thêm các trường thông tin mới
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
                                    displayExpr: "FullNameUserName",
                                    searchEnabled: true,
                                },
                            });
                            form.itemOption('mainGroup', 'items', mainGroupItems);
                        }
                        console.log(AllUser);
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
                        //if (!mainGroupItems.find(function (i) { return i.dataField === "Files" })) {
                        //    mainGroupItems.push(
                        //        {
                        //            dataField: "Files",
                        //            colSpan: 2,
                        //            label: { text: 'File Đính Kèm' },
                        //            template: function (data, itemElement) {
                        //                itemElement.append("<div>")
                        //                    .attr('id', 'myUpload')
                        //                    .dxFileUploader({
                        //                        multiple: true, // cho phép chọn nhiều file
                        //                        name: "myFile",
                        //                        accept: "*",
                        //                        onValueChanged: function (e) { //Khi có ảnh được chọn
                        //                            console.log(e);
                        //                        },
                        //                        onFilesUploaded: function (e) { // Khi ảnh được upload
                        //                            console.log(e)
                        //                        },
                        //                        uploadMode: "useButtons",
                        //                        uploadUrl: "", //Gọi chức năng Upload trong YteController để up file ảnh
                        //                    });
                        //            }
                        //        });
                        //    form.itemOption('mainGroup', 'items', mainGroupItems);
                        //}
                    }
                });
            },
            error: function () { alert('Lấy dữ liệu không thành công. Vui lòng thử lại!'); }
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
