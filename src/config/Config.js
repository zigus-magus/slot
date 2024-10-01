export const initialGameConfig = {
    uid: 100,
    balance: 0,
    bet: 1,
    availableBets: [1, 5, 10, 25],
    win: 0,
    rolls: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    app: {
        width: 860,
        height: 620,
        backgroundColor: 0x1099bb,
        antialiasing: true
    }
};

export const sceneConfig = {
    "objects": [
        {
            name: "background",
            type: "Sprite",
            texture: "background",
            position: { "x": 0, "y": 0 }
        },
        {
            name: "footer",
            type: "Sprite",
            texture: "footer",
            position: { "x": 0, "y": 490 }
        },
        {
            name: "winLabel",
            type: "TextField",
            position: { "x": 112, "y": 548 },
            anchor: {"x": 0.5, "y": 0.5 },
            style: {
                align: "center",
                fontSize: 36,
                fill: "#FFFFFF"
            }
        },
        {
            name: "minusButton",
            type: "Button",
            texture: "button_minus",
            position: { "x": 235, "y": 548 },
            anchor: { "x": 0.5, "y": 0.5 },
            "interactive": true
        },
        {
            name: "plusButton",
            type: "Button",
            texture: "button_plus",
            position: { "x": 465, "y": 548 },
            anchor: { "x": 0.5, "y": 0.5 },
            "interactive": true
        },
        {
            name: "maxBetButton",
            type: "Button",
            texture: "button_max_bet",
            position: { "x": 590, "y": 548 },
            anchor: { "x": 0.5, "y": 0.5 },
            "interactive": true
        },
        {
            name: "betLabel",
            type: "TextField",
            "text": "100",
            position: { "x": 350, "y": 548 },
            anchor: {
                "x": 0.5,
                "y": 0.5
            },
            style: {
                align: "center",
                fontSize: 36,
                fill: "#FFFFFF"
            }
        },
        {
            name: "balancePanel",
            type: "Sprite",
            texture: "balance_panel",
            position: { "x": 580, "y": 0 }
        },
        {
            name: "balanceLabel",
            type: "TextField",
            position: { "x": 640, "y": 44 },
            anchor: {
                "x": 0.5,
                "y": 0.5
            },
            style: {
                align: "center",
                fontSize: 36,
                fill: "#FFFFFF"
            }
        },
        {
            name: "spinButton",
            type: "Button",
            texture: "button_spin",
            position: { "x": 770, "y": 545 },
            anchor: { "x": 0.5, "y": 0.5 },
            interactive: true
        },
        {
            name: "reelSet",
            type: "ReelSet",
            position: { "x": 290, "y": 150 },
            extra: {
                rows: 3,
                columns: 3,
                reelWidth: 150,
                symbolsCount: 11
            },
            zIndex: 10,
            mask: {
                x: -76,
                y: -60,
                width: 450,
                height: 375,
                fill: "0xFFFFFF"
            },
            elements: [  {
                    name: "separator",
                    type: "Sprite",
                    texture: "separator",
                    position: { "x": -74, "y": 128 },
                    anchor: { "x": 0.5, "y": 0.5 }
                },
                {
                    name: "0",
                    type: "Sprite",
                    texture: "symbol_0",
                    position: { "x": 0, "y": 0 },
                    anchor: { "x": 0.5, "y": 0.5 }
                },
                {
                    name: "1",
                    type: "Sprite",
                    texture: "symbol_1",
                    position: { "x": 0, "y": 0 },
                    anchor: { "x": 0.5, "y": 0.5 }
                },
                {
                    name: "2",
                    type: "Sprite",
                    texture: "symbol_2",
                    position: { "x": 0, "y": 0 },
                    anchor: { "x": 0.5, "y": 0.5 }
                },
                {
                    name: "3",
                    type: "Sprite",
                    texture: "symbol_3",
                    position: { "x": 0, "y": 0 },
                    anchor: { "x": 0.5, "y": 0.5 }
                },
                {
                    name: "4",
                    type: "Sprite",
                    texture: "symbol_4",
                    position: { "x": 0, "y": 0 },
                    anchor: { "x": 0.5, "y": 0.5 }
                },
                {
                    name: "5",
                    type: "Sprite",
                    texture: "symbol_5",
                    position: { "x": 0, "y": 0 },
                    anchor: { "x": 0.5, "y": 0.5 }
                },
                {
                    name: "6",
                    type: "Sprite",
                    texture: "symbol_6",
                    position: { "x": 0, "y": 0 },
                    anchor: { "x": 0.5, "y": 0.5 }
                },
                {
                    name: "7",
                    type: "Sprite",
                    texture: "symbol_7",
                    position: { "x": 0, "y": 0 },
                    anchor: { "x": 0.5, "y": 0.5 }
                },
                {
                    name: "8",
                    type: "Sprite",
                    texture: "symbol_8",
                    position: { "x": 0, "y": 0 },
                    anchor: { "x": 0.5, "y": 0.5 }
                },
                {
                    name: "9",
                    type: "Sprite",
                    texture: "symbol_9",
                    position: { "x": 0, "y": 0 },
                    anchor: { "x": 0.5, "y": 0.5 }
                },
                {
                    name: "10",
                    type: "Sprite",
                    texture: "symbol_10",
                    position: { "x": 0, "y": 0 },
                    anchor: { "x": 0.5, "y": 0.5 }
                }
            ]
        },
        {
            name: "winSplash",
            type: "TextField",
            position: { "x": 435, "y": 260},
            anchor: {"x": 0.5, "y": 0.5 },
            style: {
                fontSize: 100,
                align: "center",
                fill: [
                    "#ffbb00",
                    "#fbff00",
                    "#ffa200"
                ],
                fontWeight: "bold",
                stroke: "#7e4401",
                strokeThickness: 5,
                textBaseline: "middle"
            }
        }
    ]
}