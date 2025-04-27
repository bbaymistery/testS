export const menuCategories = [
    { id: "menuSet", labelKey: "strMenuSet", seq: 1 },
    { id: "maki", labelKey: "strMaki", seq: 2 },
    { id: "udon", labelKey: "strUdon", seq: 3 },
    { id: "nigiri", labelKey: "strNigiri", seq: 4 },
    { id: "noodles", labelKey: "strNoodles", seq: 5 },
    { id: "appetizer", labelKey: "strQelyanalti", seq: 6 },
    { id: "salads", labelKey: "strSalatlar", seq: 7 },
    { id: "soups", labelKey: "strSuplar", seq: 8 },
    { id: "drinks", labelKey: "strIckiler", seq: 9 },
];
export const menuSubcategories = [
    {
        id: "newSet",
        labelKey: "strNewSet",
        seq: 1.1,
        imageUrl: "/setler/newSet.png",
        description: "strNewSetTranslation",
        price: "23",
        items: [
            "Filadelfiya - 8 ədəd",
            "Alyaska - 8 ədəd",
            "Kani hot - 8 ədəd",
            "Sezar roll - 8 ədəd"
        ]
    },
    {
        id: "hotSet",
        labelKey: "strHotSet",
        seq: 1.2,
        imageUrl: "/setler/hotset.png",
        description: "strHotSetTranslation",
        price: "23",
        items: [
            "Kani hot - 10 ədəd",
            "Nuggets hot - 10 ədəd",
            "Salmon hot - 10 ədəd",
            "Ebi hot - 10 ədəd"
        ]
    },
    {
        id: "veganSet",
        labelKey: "strVeganSet",
        seq: 1.3,
        imageUrl: "/setler/veganset.png",
        description: "strVeganSetTranslation",
        price: "16",
        items: [
            "Kappa maki roll - 8 ədəd",
            "Chukka maki roll - 8 ədəd",
            "Vegan roll - 8 ədəd"
        ]
    },
    {
        id: "specialSet",
        labelKey: "strSpecialSet",
        seq: 1.9,
        imageUrl: "/setler/specialSett.png",
        description: "strSpecialSetTranslation",
        price: "27",
        items: [
            "Kaliforniya crab - 8 ədəd",
            "Filadelfiya layt - 8 ədəd",
            "Salmon hot - 10 ədəd",
            "Avokado - 8 ədəd"
        ]
    },
    {
        id: "surpriseSet",
        labelKey: "strSurpriseSet",
        seq: 1.4,
        imageUrl: "/setler/surprizset.png",
        description: "strSurpriseSetTranslation",
        price: "20",
        items: [
            "Kani hot - 10 ədəd",
            "Salmon maki - 4 ədəd",
            "Alyaska - 4 ədəd",
            "Crispy roll - 4 ədəd"
        ]
    },
    {
        id: "luxSet",
        labelKey: "strLuxSet",
        seq: 1.5,
        imageUrl: "/setler/luxset.png",
        description: "strLuxSetTranslation",
        price: "18",
        items: [
            "Filadelfiya - 4 ədəd",
            "Kaliforniya crab - 4 ədəd",
            "Alyaska - 4 ədəd",
            "Çeddar - 4 ədəd"
        ]
    },
    {
        id: "presentSet",
        labelKey: "strPresentSet",
        seq: 1.6,
        imageUrl: "/setler/presentSet.png",
        description: "strPresentSetTranslation",
        price: "19",
        items: [
            "Reddo sushi roll - 4 ədəd",
            "Alyaska - 4 ədəd",
            "Filadelfiya layt - 4 ədəd",
            "Julyen Baked - 4 ədəd"
        ]
    },
    {
        id: "elitSet",
        labelKey: "strElitSet",
        seq: 1.7,
        imageUrl: "/setler/elitset.png",
        description: "strElitSetTranslation",
        price: "28",
        items: [
            "Murasaki - 8 ədəd",
            "Kappa Maki - 8 ədəd",
            "Salmon Cheese - 4 ədəd",
            "Qommen - 4 ədəd",
            "Krang hot - 10 ədəd"
        ]
    },
    {
        id: "bestSet",
        labelKey: "strBestSet",
        seq: 1.8,
        imageUrl: "/setler/bestset.png",
        description: "strBestSetTranslation",
        price: "35",
        items: [
            "Filadelfiya grill - 8 ədəd",
            "Cheese roll - 8 ədəd",
            "Kaliforniya crab - 8 ədəd",
            "Baked roll - 10 ədəd",
            "Spays roll - 4 ədəd",
            "Hot crab - 10 ədəd",
            "Hot nuggets - 10 ədəd",
            "Hot cream - 10 ədəd"
        ]
    }
];
export const makiSubcategories = [
    {
        id: "kappaMaki",
        title: "Kappa Maki",
        quantity: "8",
        imageUrl: "/makiler/kappamaki.png",
        porsiya: false,
        description: "strKappamaki",
        price: "5"
    },
    {
        id: "chukkaMaki",
        title: "Chukka Maki",
        quantity: "8",
        imageUrl: "/makiler/chukkamaki.png",
        description: "strChukkamaki",
        porsiya: false,

        price: "7"
    },
    {
        id: "ebiMaki",
        title: "Ebi Maki",
        quantity: "8",
        imageUrl: "/makiler/ebimaki.png",
        porsiya: false,
description: "strEbimaki",
        price: "10"
    },
    {
        id: "salmonMaki",
        title: "Salmon Maki",
        quantity: "8",
        imageUrl: "/makiler/salmonmaki.png",
        porsiya: false,
description: "strSalmonmaki",
        price: "8"
    }
];
export const udonSubcategories = [
    {
        id: "udonVegan",
        title: "Udon Vegan",
        quantity: "1 porsiya", // Burada adet yok, çünkü Udon bir noodle yemeği porsiyon oluyor
        imageUrl: "/udonlar/udonvegan.png",
        price: "7",
        description: "strUdonvegan",
        porsiya: true

    },
    {
        id: "udonChicken",
        title: "Udon Chicken",
        quantity: "1 porsiya",
        imageUrl: "/udonlar/udonchicken.png",
        price: "9",
        description: "strUdonchicken",
        porsiya: true

    },
    {
        id: "udonShrimp",
        title: "Udon Shrimp",
        quantity: "1 porsiya",
        imageUrl: "/udonlar/udonshrimp.png",
        price: "13",
        description: "strUdonshrimp",
        porsiya: true

    },
    {
        id: "udonSalmon",
        title: "Udon Salmon",
        quantity: "1 porsiya",
        imageUrl: "/udonlar/udonsalmon.png",
        price: "14",
        description: "strUdonsalmon",
        porsiya: true
    }
];
export const nigiriSubcategories = [
    {
        id: "ebiNigiri",
        title: "Ebi Nigiri",
        quantity: "1",
        imageUrl: "/nigiriler/ebinigiri.png",
        porsiya: false,
        description: "strEbinigiri",
        price: "3"
    },
    {
        id: "grillNigiri",
        title: "Grill Nigiri",
        quantity: "1",
        imageUrl: "/nigiriler/grillnigiri.png",
        porsiya: false,
        description: "strGrillnigiri",
        price: "4"
    },
    {
        id: "tunaNigiri",
        title: "Tuna Nigiri",
        quantity: "1",
        imageUrl: "/nigiriler/tunanigiri.png",
        porsiya: false,
        description: "strTunanigiri",
        price: "6"
    }
];
export const noodlesSubcategories = [
    {
      id: "riceVegan",
      title: "Rice Vegan",
      quantity: "1 porsiya",
      imageUrl: "/noodles/ricevegan.png",
      porsiya: true,
      description: "strRicevegan",
      price: "7"
    },
    {
      id: "riceChicken",
      title: "Rice Chicken",
      quantity: "1 porsiya",
      imageUrl: "/noodles/ricechicken.png",
      porsiya: true,
      description: "strRicechicken",
      price: "9"
    },
    {
      id: "riceShrimp",
      title: "Rice Shrimp",
      quantity: "1 porsiya",
      imageUrl: "/noodles/riceshrimp.png",
      porsiya: true,
      description: "strRiceshrimp",
      price: "13"
    },
    {
      id: "riceSalmon",
      title: "Rice Salmon",
      quantity: "1 porsiya",
      imageUrl: "/noodles/ricesalmon.png",
      porsiya: true,
      description: "strRicesalmon",
      price: "14"
    }
  ];
  export const appetizerSubcategories = [
    {
      id: "kartofFri",
      title: "Kartof Fri",
      quantity: "150 gr",
      imageUrl: "/appetizers/kartoffri.png",
      porsiya: true,
      description: "strKartoffri",
      price: "5"
    },
    {
      id: "nuggets",
      title: "Nuggets",
      quantity: "6",
      imageUrl: "/appetizers/nuggets.png",
      porsiya: false,
      description: "strNuggets",
      price: "7"
    },
    {
      id: "edamame",
      title: "Edamame",
      quantity: "150 gr",
      imageUrl: "/appetizers/edamame.png",
      porsiya: true,
      description: "strEdamame",
      price: "8"
    },
    {
      id: "cheeseSticks",
      title: "Cheese Sticks",
      quantity: "4",
      imageUrl: "/appetizers/cheesesticks.png",
      porsiya: false,
      description: "strCheesesticks",
      price: "10"
    },
    {
      id: "shrimpTempura",
      title: "Shrimp Tempura",
      quantity: "6",
      imageUrl: "/appetizers/shrimptempura.png",
      porsiya: false,
      description: "strShrimptempura",
      price: "12"
    }
  ];
  export const soupsSubcategories = [
    {
      id: "tomatoSoup",
      title: "Tomato Soup",
      quantity: "1 porsiya",
      imageUrl: "/soups/tomatosoup.png",
      porsiya: true,
      description: "strTomatosoup",
      price: "5"
    },
    {
      id: "tomYumSoup",
      title: "Tom Yum Soup",
      quantity: "1 porsiya",
      imageUrl: "/soups/tomyumsoup.png",
      porsiya: true,
      description: "strTomyumsoup",
      price: "10"
    },
    {
      id: "marciSoup",
      title: "Marci Soup",
      quantity: "1 porsiya",
      imageUrl: "/soups/marcisoup.png",
      porsiya: true,
      description: "strMarcisoup",
      price: "5"
    }
  ];
  export const drinksSubcategories = [
    {
      id: "sandoraMultivitamin250",
      title: "Sandora Multivitamin 250 ml",
      quantity: "250 ml",
      imageUrl: "/drinks/sandoramultivitamin250.png",
      porsiya: false,
      description: "",
      price: "2"
    },
    {
      id: "sandoraMultivitamin1l",
      title: "Sandora Multivitamin 1 l",
      quantity: "1 l",
      imageUrl: "/drinks/sandoramultivitamin1l.png",
      porsiya: false,
      description: "",
      price: "5"
    },
    {
      id: "sirab500",
      title: "Sirab 500 ml",
      quantity: "500 ml",
      imageUrl: "/drinks/sirab500.png",
      porsiya: false,
      description: "",
      price: "2"
    },
    {
      id: "cocaColaZero330",
      title: "Coca Cola Zero 330 ml",
      quantity: "330 ml",
      imageUrl: "/drinks/cocacolazero330.png",
      porsiya: false,
      description: "",
      price: "3"
    },
    {
      id: "cocaCola330",
      title: "Coca Cola 330 ml",
      quantity: "330 ml",
      imageUrl: "/drinks/cocacola330.png",
      porsiya: false,
      description: "",
      price: "3"
    },
    {
      id: "fanta330",
      title: "Fanta 330 ml",
      quantity: "330 ml",
      imageUrl: "/drinks/fanta330.png",
      porsiya: false,
      description: "",
      price: "3"
    },
    {
      id: "sprite330",
      title: "Sprite 330 ml",
      quantity: "330 ml",
      imageUrl: "/drinks/sprite330.png",
      porsiya: false,
      description: "",
      price: "3"
    },
    {
      id: "redBull250",
      title: "Red Bull 250 ml",
      quantity: "250 ml",
      imageUrl: "/drinks/redbull250.png",
      porsiya: false,
      description: "",
      price: "5"
    },
    {
      id: "redBull355",
      title: "Red Bull 355 ml",
      quantity: "355 ml",
      imageUrl: "/drinks/redbull355.png",
      porsiya: false,
      description: "",
      price: "6"
    },
    {
      id: "hell330",
      title: "Hell 330 ml",
      quantity: "330 ml",
      imageUrl: "/drinks/hell330.png",
      porsiya: false,
      description: "",
      price: "2"
    },
    {
      id: "bizon330",
      title: "Bizon 330 ml",
      quantity: "330 ml",
      imageUrl: "/drinks/bizon330.png",
      porsiya: false,
      description: "",
      price: "2"
    },
    {
      id: "schweppes250",
      title: "Schweppes 250 ml",
      quantity: "250 ml",
      imageUrl: "/drinks/schweppes250.png",
      porsiya: false,
      description: "",
      price: "2.5"
    }
  ];
  export const saladsSubcategories = [
    {
      id: "asianFresh",
      title: "Asian Fresh",
      quantity: "1 porsiya",
      imageUrl: "/salads/asianfresh.png",
      porsiya: true,
      description: "strAsianfresh",
      price: "6"
    },
    {
      id: "crabSalad",
      title: "Crab",
      quantity: "1 porsiya",
      imageUrl: "/salads/crab.png",
      porsiya: true,
      description: "strCrab",
      price: "8"
    },
    {
      id: "chukkaSalad",
      title: "Chukka",
      quantity: "1 porsiya",
      imageUrl: "/salads/chukka.png",
      porsiya: true,
      description: "strChukka",
      price: "9"
    },
    {
      id: "sezarChicken",
      title: "Sezar Chicken",
      quantity: "1 porsiya",
      imageUrl: "/salads/sezarchicken.png",
      porsiya: true,
      description: "strSezarchicken",
      price: "9"
    },
    {
      id: "sezarShrimp",
      title: "Sezar Shrimp",
      quantity: "1 porsiya",
      imageUrl: "/salads/sezarshrimp.png",
      porsiya: true,
      description: "strSezarshrimp",
      price: "13"
    },
    {
      id: "sezarSalmon",
      title: "Sezar Salmon",
      quantity: "1 porsiya",
      imageUrl: "/salads/sezarsalmon.png",
      porsiya: true,
      description: "strSezarsalmon",
      price: "16"
    }
  ];
  