const recipesIndex = {
  names: {
    limonade: [1, 40],
    coco: [1, 3],
    poisson: [2],
    cru: [2],
    tahitienne: [2],
    poulet: [3],
    réunionnais: [3],
    salade: [4, 9, 11, 13, 24],
    riz: [4],
    tarte: [5, 6, 43],
    thon: [5],
    aux: [6, 7, 39],
    pommes: [6, 11, 39],
    tartelettes: [7],
    chocolat: [7, 15, 22, 41, 44],
    fraises: [7],
    brownie: [8],
    méditerannéene: [9],
    fraiche: [9],
    chèvre: [9, 36],
    tartiflette: [10],
    "tomate,": [11],
    mozzarella: [11],
    compote: [12],
    pomme: [12],
    rhubarbe: [12],
    mâchée: [13],
    patates: [13],
    galette: [14],
    bretonne: [14],
    saucisse: [14],
    fromage: [14],
    raclette: [14],
    crêpes: [15],
    banane: [15, 19],
    gratin: [16],
    pâtes: [16, 24],
    tomate: [16],
    smoothie: [17, 18, 49],
    fraise: [17],
    ananas: [18],
    vanille: [18],
    shake: [19],
    kiwi: [19],
    pates: [20],
    carbonara: [20],
    spaghettis: [21],
    bolognaise: [21],
    fondant: [22],
    quiche: [23],
    lorraine: [23],
    cookies: [25],
    soupe: [26, 27, 28],
    tomates: [26],
    "l'oseille": [27],
    poireaux: [28],
    houmous: [29],
    express: [29],
    purée: [30, 34, 35],
    pois: [30],
    cassés: [30],
    jardinière: [31],
    légumes: [31],
    croque: [32],
    monsieur: [32],
    dinde: [32],
    sandwich: [33],
    saumon: [33],
    fumé: [33],
    patate: [34],
    douce: [34],
    carottes: [35],
    lasagne: [36],
    courgettes: [36, 37],
    farcies: [37],
    boeuf: [37],
    pain: [38],
    perdu: [38],
    crumble: [39],
    mousse: [41, 47],
    charlotte: [42],
    poires: [42],
    citron: [43, 47],
    crème: [44, 45],
    déssert: [44],
    patissière: [45],
    far: [46],
    breton: [46],
    pizza: [48],
    tropical: [49],
  },
  ingredients: {
    "lait de coco": [1, 2, 3],
    "jus de citron": [1, 17, 33, 47],
    "crème de coco": [1],
    sucre: [1, 22, 25, 43, 44, 45, 46, 47],
    glaçons: [1, 17],
    "thon rouge (ou blanc)": [2],
    concombre: [2, 9, 24],
    tomate: [2, 4, 5, 16, 24, 26],
    carotte: [2, 31, 35],
    "citron vert": [2, 40],
    poulet: [3],
    "coulis de tomate": [3, 21],
    oignon: [3, 10, 14, 21, 26, 30, 37],
    "poivron rouge": [3],
    "huile d'olive": [3, 9, 13, 20, 29, 34],
    "riz blanc": [4],
    "thon en miettes": [4, 5, 24],
    "oeuf dur": [4],
    maïs: [4, 24],
    vinaigrette: [4, 11],
    "pâte feuilletée": [5],
    "crème fraiche": [5, 6, 20, 21],
    "gruyère râpé": [5],
    "moutarde de dijon": [5],
    "pâte brisée": [6, 23, 43],
    pomme: [6, 39],
    oeuf: [6, 8, 14, 15, 22, 23, 25, 27, 38, 41, 42, 43, 45, 46],
    "sucre en poudre": [6, 8, 40],
    "sucre vanillé": [6, 12, 41, 46],
    "pâte sablée": [7],
    "chocolat au lait": [7, 15],
    "crème liquide": [7],
    beurre: [7, 8, 14, 22, 23, 25, 28, 35, 39, 44],
    fraise: [7, 17],
    noix: [8],
    "chocolat noir": [8, 22, 41],
    farine: [8, 15, 22, 25, 39, 44, 45, 46],
    olives: [9],
    "fromage de chèvre": [9, 36],
    "vinaigre balsamic": [9],
    basilic: [9, 16],
    roblochon: [10],
    "pommes de terre": [10, 13, 26, 28, 31, 35],
    "jambon fumé": [10],
    "vin blanc sec": [10],
    "tomates cerises": [11],
    mozzarella: [11, 16],
    "jambon de parme": [11],
    pommes: [11, 12],
    "salade verte": [11],
    rhubarbe: [12],
    eau: [12, 40],
    mâche: [13],
    échalote: [13],
    "vinaigre de cidre": [13],
    "saucisse bretonne ou de toulouse": [14],
    "farine de blé noir": [14],
    "fromage à raclette": [14],
    lait: [15, 18, 19, 23, 32, 36, 38, 44, 45, 46],
    "beurre salé": [15, 27],
    banane: [15, 19],
    pennes: [16],
    "huile d'olives": [16, 26, 37],
    pastèque: [17],
    menthe: [17],
    ananas: [18, 49],
    "glace à la vanille": [18],
    kiwi: [19],
    citron: [19, 29, 43],
    "sucre glace": [19],
    tagliatelles: [20],
    lardons: [20, 23, 31, 48],
    parmesan: [20],
    spaghettis: [21],
    "viande hachée 1% de matière grasse": [21],
    "vin rouge": [21],
    "crème fraîche": [23, 27, 34, 35, 47],
    macaronis: [24],
    mayonnaise: [24],
    "chocolat noir en pepites": [25],
    ail: [26, 29, 30],
    oseille: [27, 28],
    vermicelles: [27],
    poireau: [28],
    "crême fraîche": [28],
    "pois chiches": [29],
    paprika: [29],
    "pois cassé": [30],
    "haricots verts": [31],
    "petits poids": [31],
    "pain de mie": [32, 33],
    "blanc de dinde": [32],
    emmental: [32],
    gruyère: [32, 36, 37, 48],
    "noix de muscade": [32, 35],
    "saumon fumé": [33],
    "feuilles de laitue": [33],
    "fromage blanc": [33],
    "patate douce": [34],
    orange: [34],
    cumin: [35],
    courgette: [36, 37],
    lasagnes: [36],
    maïzena: [36],
    "viande hachée": [37],
    "coulis de tomates": [37],
    pain: [38],
    "sucre roux": [38, 39],
    bicarbonate: [40],
    chocolat: [42, 44],
    "poires au jus": [42],
    boudoirs: [42],
    "beurre fondu": [43],
    pruneaux: [46],
    mascarpone: [47],
    "pâte à pizza": [48],
    "tomates pelées": [48],
    "champignons de paris": [48],
    bananes: [49],
    kiwis: [49],
    mangue: [49],
    miel: [49],
  },
  appliance: {
    blender: [1, 17, 18, 19, 49],
    saladier: [2, 9, 11, 24, 40, 47],
    cocotte: [3],
    "cuiseur de riz": [4],
    four: [5, 6, 7, 8, 10, 14, 16, 22, 23, 25, 32, 33, 36, 37, 38, 39, 43, 46, 48],
    casserole: [12, 13],
    "poële à crêpe": [15],
    sauteuse: [20],
    "casserolle.": [21],
    mixer: [26, 28, 29, 30, 34, 35],
    casserolle: [27, 41, 44, 45],
    poële: [31],
    "moule à charlotte": [42],
  },
  ustensils: {
    "cuillère à soupe": [1, 32, 38],
    verres: [1, 17, 18, 19, 41, 46, 47, 49],
    "presse citron": [1, 2, 17, 19, 29, 43],
    couteau: [3, 5, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 21, 24, 26, 27, 28, 31, 32, 33, 34, 35, 37, 39, 42, 48, 49],
    saladier: [4, 6, 13, 15, 25, 39, 42, 45],
    passoire: [4],
    "moule à tarte": [5, 6, 43],
    "râpe à fromage": [5, 16, 20, 32, 36, 48],
    fourchette: [6],
    "moule à tartelettes (6)": [7],
    casserolle: [7, 8, 22, 28, 30],
    "moule à gateaux": [8, 22, 23],
    "cuillère en bois": [9, 13, 15, 20, 21, 24, 27, 29, 30, 33, 34, 35, 37, 40, 44, 47],
    "plat à gratin": [10, 16, 36],
    économe: [10, 12, 31, 34],
    "cuillère à melon": [11],
    "poelle à frire": [14, 37],
    louche: [15, 21],
    fouet: [22, 23, 25, 36, 38, 39, 41, 42, 45, 46, 47],
    "rouleau à patisserie": [23, 43, 48],
    "plaque de cuisson": [25],
    "cocotte minute": [26, 35],
    bol: [38],
    spatule: [41],
    moule: [46],
  },
}

export default recipesIndex