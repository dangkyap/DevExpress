var UserIDdata = [
    {
        text: "Griffith Chinnock",
        id: "1A",
        tuoi: 27,
        phong: "Phòng Tư vấn, Thiết kế và Sản xuất"
    }, {
        text: "Marya Carrel",
        id: "1B",
        tuoi: 21,
        phong: "Phòng Tư vấn, Thiết kế và Sản xuất"
    }, {
        text: "Koenraad Haglington",
        id: "1C",
        tuoi: 37,
        phong: "Phòng Đào tạo"
    }, {
        text: "Dewitt Metheringham",
        id: "1D",
        tuoi: 47,
        phong: "Phòng Đào tạo"
    }, {
        text: "Goddart Copas",
        id: "1E",
        tuoi: 22,
        phong: "Phòng Kế toán"
    }, {
        text: "Sophie Quest",
        id: "1F",
        tuoi: 24,
        phong: "Phòng Kế toán"
    } 
];

var phongbanData = [
    {
        text: "Phòng Tư vấn, Thiết kế và Sản xuất",
        id: 1
    }, {
        text: "Phòng Đào tạo",
        id: 2
    }, {
        text: "Phòng Kế toán",
        id: 3
    }  
];

var phonghopData = [
    {
        text: "Phòng họp tầng 2",
        id: 1
    }, {
        text: "Hội trường tầng 4",
        id: 2
    }, {
        text: "Đại sảnh tầng 1",
        id: 3
    }  
];

var typeData = [
    {
        text: "Lịch cá nhân",
        id: 1,
        color: "#ff8817"
    }, {
        text: "Lịch phòng ban",
        id: 2,
        color: "#ae7fcc"
    }
];

var data = [
    {
        text: "Website Re-Design Plan",
        startDate: new Date("2021-03-29T16:30:00.000Z"),
        endDate: new Date("2021-03-29T18:30:00.000Z"),
        chitiet: "AAAAAAAAAAAASSSSSSSSSSSSSSSSDDDDDDDDDDDDDDDDD",
        phonghopId: [2],
        nhanvienId: ["1A", "1B", "1C"],
        chutriId: ["1D"], 
        type: 2,
        cuochop: true,
        laplai: false,
        quantrong: true,
        riengtu: false
    }, {
        text: "Book Flights to San Fran for Sales Trip",
        startDate: new Date("2021-03-29T19:00:00.000Z"),
        endDate: new Date("2021-03-29T20:00:00.000Z"),
        allDay: true,
        type: 1
    }, {
        text: "Install New Router in Dev Room",
        startDate: new Date("2021-03-29T21:30:00.000Z"),
        endDate: new Date("2021-03-29T22:30:00.000Z"),
        phonghopId: [1],
        type: 2
    }, {
        text: "Approve Personal Computer Upgrade Plan",
        startDate: new Date("2021-03-30T17:00:00.000Z"),
        endDate: new Date("2021-03-30T18:00:00.000Z"),
        type: 1
    }, {
        text: "Final Budget Review",
        startDate: new Date("2021-03-30T19:00:00.000Z"),
        endDate: new Date("2021-03-30T20:35:00.000Z"),
        phonghopId: [2],
        type: 2
    }, {
        text: "New Brochures",
        startDate: new Date("2021-03-30T21:30:00.000Z"),
        endDate: new Date("2021-03-30T22:45:00.000Z"),
        type: 1
    }, {
        text: "Install New Database",
        startDate: new Date("2021-03-31T16:45:00.000Z"),
        endDate: new Date("2021-03-31T18:15:00.000Z"),
        phonghopId: [3],
        type: 2
    }, {
        text: "Approve New Online Marketing Strategy",
        startDate: new Date("2021-03-31T19:00:00.000Z"),
        endDate: new Date("2021-03-31T21:00:00.000Z"),
        type: 1
    }, {
        text: "Upgrade Personal Computers",
        startDate: new Date("2021-03-31T22:15:00.000Z"),
        endDate: new Date("2021-03-31T23:30:00.000Z")
    }, {
        text: "Customer Workshop",
        startDate: new Date("2021-04-01T18:00:00.000Z"),
        endDate: new Date("2021-04-01T19:00:00.000Z"),
        allDay: true,
        phonghopId: [1]
    }, {
        text: "Prepare 2021 Marketing Plan",
        startDate: new Date("2021-04-01T18:00:00.000Z"),
        endDate: new Date("2021-04-01T20:30:00.000Z")
    }, {
        text: "Brochure Design Review",
        startDate: new Date("2021-04-01T21:00:00.000Z"),
        endDate: new Date("2021-04-01T22:30:00.000Z")
    }, {
        text: "Create Icons for Website",
        startDate: new Date("2021-04-02T17:00:00.000Z"),
        endDate: new Date("2021-04-02T18:30:00.000Z")
    }, {
        text: "Upgrade Server Hardware",
        startDate: new Date("2021-04-02T21:30:00.000Z"),
        endDate: new Date("2021-04-02T23:00:00.000Z")
    }, {
        text: "Submit New Website Design",
        startDate: new Date("2021-04-02T23:30:00.000Z"),
        endDate: new Date("2021-04-03T01:00:00.000Z"),
        phonghopId: [2]
    }, {
        text: "Launch New Website",
        startDate: new Date("2021-04-02T19:20:00.000Z"),
        endDate: new Date("2021-04-02T21:00:00.000Z")
    }
];

