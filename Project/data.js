var data = [
    {
        ModuleID: 20,
        CreatedByUserID: "1A",
        LastModifiedByUserID: "1A",
        Management: ["1D"], 
        Object: ["1A", "1B", "1C"],
        CreatedOnDate: new Date("2021-02-29T16:30:00.000Z"),
        LastModifiedOnDate: new Date("2021-02-29T17:00:00.000Z"),
        OwnerCode: "P1",
        Type: 2,
        startDate: new Date("2021-03-29T16:30:00.000Z"),
        endDate: new Date("2021-03-29T18:30:00.000Z"),
        allDay: false,
        Title: "Website Plan",
        description: "Website Re-Design Plan",
        IsFile: false,
        Status: 2,
        Private: false,
        Meeting: true,   
        MeetingRoomID: ["R2"],
        Important: true,
        Comment: null,
        laplai: false,
        Isdeleted: false        
    }, {
        ModuleID: 20,
        CreatedByUserID: "1B",
        LastModifiedByUserID: "1B",
        Management: ["1B"], 
        Object: ["1B"],
        CreatedOnDate: new Date("2021-02-29T16:30:00.000Z"),
        LastModifiedOnDate: new Date("2021-02-29T17:00:00.000Z"),
        OwnerCode: "P1",
        Type: 1,
        startDate: new Date("2021-03-29T19:00:00.000Z"),
        endDate: new Date("2021-03-29T20:00:00.000Z"),
        allDay: false,
        Title: "Book Flight",
        description: "Book Flights to San Fran for Sales Trip",
        IsFile: false,
        Status: 2,
        Private: false,
        Meeting: true,   
        MeetingRoomID: ["R2"],
        Important: true,
        Comment: null,
        laplai: false,
        Isdeleted: false        
    }, {
        ModuleID: 20,
        CreatedByUserID: "1A",
        LastModifiedByUserID: "1A",
        Management: ["1A"], 
        Object: ["1B", "1C"],
        CreatedOnDate: new Date("2021-02-29T16:30:00.000Z"),
        LastModifiedOnDate: new Date("2021-02-29T17:00:00.000Z"),
        OwnerCode: "P1",
        Type: 2,
        startDate: new Date("2021-03-29T21:30:00.000Z"),
        endDate: new Date("2021-03-29T22:30:00.000Z"),
        allDay: true,
        Title: "Install New Router",
        description: "Install New Router in Dev Room",
        IsFile: false,
        Status: 2,
        Private: false,
        Meeting: false,   
        MeetingRoomID: null,
        Important: true,
        Comment: null,
        laplai: false,
        Isdeleted: false        
    }, {
        ModuleID: 20,
        CreatedByUserID: "1A",
        LastModifiedByUserID: "1A",
        Management: ["1A"], 
        Object: ["1B"],
        CreatedOnDate: new Date("2021-02-30T16:30:00.000Z"),
        LastModifiedOnDate: new Date("2021-02-30T17:00:00.000Z"),
        OwnerCode: "P1",
        Type: 2,
        startDate: new Date("2021-03-31T16:45:00.000Z"),
        endDate: new Date("2021-03-31T18:15:00.000Z"),
        allDay: true,
        Title: "Install New Database",
        description: "Install New Database",
        IsFile: false,
        Status: 2,
        Private: false,
        Meeting: false,   
        MeetingRoomID: null,
        Important: true,
        Comment: null,
        laplai: false,
        Isdeleted: false        
    }, {
        ModuleID: 20,
        CreatedByUserID: "1A",
        LastModifiedByUserID: "1A",
        Management: ["1A"], 
        Object: ["1B", "1C"],
        CreatedOnDate: new Date("2021-02-29T16:30:00.000Z"),
        LastModifiedOnDate: new Date("2021-02-29T17:00:00.000Z"),
        OwnerCode: "P1",
        Type: 2,
        startDate: new Date("2021-03-31T19:00:00.000Z"),
        endDate: new Date("2021-03-31T21:00:00.000Z"),
        allDay: false,
        Title: "New Marketing Strategy",
        description: "Approve New Online Marketing Strategy",
        IsFile: false,
        Status: 2,
        Private: false,
        Meeting: true,   
        MeetingRoomID: ["R3"],
        Important: true,
        Comment: null,
        laplai: false,
        Isdeleted: false        
    }, {
        ModuleID: 20,
        CreatedByUserID: "1D",
        LastModifiedByUserID: "1D",
        Management: ["1D"], 
        Object: ["1D"],
        CreatedOnDate: new Date("2021-02-29T16:30:00.000Z"),
        LastModifiedOnDate: new Date("2021-02-29T17:00:00.000Z"),
        OwnerCode: "P1",
        Type: 1,
        startDate: new Date("2021-03-31T22:15:00.000Z"),
        endDate: new Date("2021-03-31T23:30:00.000Z"),
        allDay: false,
        Title: "Upgrade Computers",
        description: "Upgrade Personal Computers",
        IsFile: false,
        Status: 2,
        Private: true,
        Meeting: false,   
        MeetingRoomID: null,
        Important: false,
        Comment: null,
        laplai: false,
        Isdeleted: false        
    }
];

var UserIDdata = [
    {
        text: "Griffith Chinnock",
        id: "1A",
        tuoi: 27
    }, {
        text: "Marya Carrel",
        id: "1B",
        tuoi: 21
    }, {
        text: "Koenraad Haglington",
        id: "1C",
        tuoi: 37
    }, {
        text: "Dewitt Metheringham",
        id: "1D",
        tuoi: 47
    }
];

var MettingRoomdata = [
    {
        text: "Phòng họp tầng 2",
        id: "R1"
    }, {
        text: "Hội trường tầng 4",
        id: "R2"
    }, {
        text: "Đại sảnh tầng 1",
        id: "R3"
    }
];

var Typedata = [
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

