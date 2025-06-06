const baseItens = [
  { code: "124257", name: "ACEM", unit: "KG" },
  { code: "120562", name: "BACALHAU KG", unit: "KG" },
  { code: "125293", name: "BATATA PALITO", unit: "KG" },
  { code: "125315", name: "BIFE ALCATRA PRODUCAO  KG", unit: "KG" },
  { code: "125314", name: "BIFE CONTRA FILEPRODUCAO KG", unit: "KG" },
  { code: "125313", name: "BIFE DE FRANGO PRODUCAO  KG", unit: "KG" },
  { code: "125295", name: "BISTECA", unit: "KG" },
  { code: "45018", name: "CAMARAO C/CASCA", unit: "KG" },
  { code: "35583", name: "CARNE BOVINA LAGARTO", unit: "KG" },
  { code: "120217", name: "CARNE DE HAMBURGUER", unit: "UN" },
  { code: "125622", name: "CARNE DE PORCO (PANCETA)", unit: "KG" },
  { code: "119381", name: "CARNE MOIDA", unit: "KG" },
  { code: "125312", name: "CARNE STROGONOFF CARNE KG", unit: "KG" },
  { code: "125311", name: "CARNE STROGONOFF FRANGO KG", unit: "KG" },
  { code: "119392", name: "CHARQUE PRODUCAO", unit: "KG" },
  { code: "126462", name: "CHESTER", unit: "KG" },
  { code: "116038", name: "COSTELA KG", unit: "KG" },
  { code: "122888", name: "COXAO MOLE", unit: "KG" },
  { code: "124162", name: "COXA SOBRECOXA  FRANGO", unit: "KG" },
  { code: "125284", name: "ESPETINHO ALCATRA KG", unit: "KG" },
  { code: "125286", name: "ESPETINHO DE FRANGO KG", unit: "KG" },
  { code: "125537", name: "FIGADO", unit: "KG" },
  { code: "32919", name: "FILE DE CAMARAO", unit: "KG" },
  { code: "120040", name: "FILE DE PEITO DE FRANGO", unit: "KG" },
  { code: "126717", name: "FILE DE PEIXE", unit: "KG" },
  { code: "108339", name: "GELO PACOTE 20KG", unit: "UN" },
  { code: "126461", name: "LOMBO SUINO", unit: "UN" },
  { code: "120058", name: "MACAXEIRA", unit: "KG" },
  { code: "125285", name: "MEDALHAO BOVINO PRODUCAO  KG", unit: "KG" },
  { code: "125639", name: "MUSCULO", unit: "KG" },
  { code: "111450", name: "PAO DE QUEIJO", unit: "KG" },
  { code: "126333", name: "PEIXE EM POSTA", unit: "UN" },
  { code: "126188", name: "POLPA DE ACEROLA", unit: "UN" },
  { code: "126189", name: "POLPA DE CAJA", unit: "UN" },
  { code: "126264", name: "POLPA DE CAJU", unit: "UN" },
  { code: "125681", name: "POLPA DE FEIJAO", unit: "KG" },
  { code: "126214", name: "POLPA DE GOIABA", unit: "UN" },
  { code: "126190", name: "POLPA DE GRAVIOLA", unit: "UN" },
  { code: "126266", name: "POLPA DE JENIPAPO", unit: "UN" },
  { code: "126192", name: "POLPA DE MANGABA", unit: "UN" },
  { code: "126191", name: "POLPA DE MANGA", unit: "UN" },
  { code: "126193", name: "POLPA DE MARACUJA", unit: "UN" },
  { code: "116180", name: "POLPA DE MILHO", unit: "KG" },
  { code: "126194", name: "POLPA DE MORANGO", unit: "UN" },
  { code: "126267", name: "POLPA DE TANGERINA", unit: "UN" },
  { code: "125617", name: "RECHEIO DE CARNE", unit: "KG" },
  { code: "125619", name: "RECHEIO DE CHARQUE COM MOLHO BRANCO", unit: "KG" },
  { code: "125618", name: "RECHEIO DE FILE DE CAMARAO", unit: "KG" },
  { code: "125616", name: "RECHEIO DE FRANGO", unit: "KG" },
  { code: "120025", name: "SALSICHA", unit: "KG" },
  { code: "6644", name: "AMEIXA FRESCA", unit: "KG" },
  { code: "121288", name: "AMEIXA SECA", unit: "KG" },
  { code: "2196", name: "BACON", unit: "KG" },
  { code: "120033", name: "CALABRESA", unit: "KG" },
  { code: "33039", name: "CEREJA", unit: "KG" },
  { code: "113479", name: "CREAM CHEESE PRODUCAO", unit: "KG" },
  { code: "112450", name: "FRUTAS CRISTALIZADAS", unit: "KG" },
  { code: "35491", name: "MARGARINA  FOLHADA", unit: "KG" },
  { code: "103244", name: "MASSA DE MACAXEIRA", unit: "KG" },
  { code: "120697", name: "MASSA DE PASTEL", unit: "UN" },
  { code: "56298", name: "MASSA DE PUBA", unit: "KG" },
  { code: "126254", name: "PEITO DE PERU", unit: "KG" },
  { code: "3186", name: "PRESUNTO", unit: "KG" },
  { code: "120051", name: "QUEIJO CATUPIRY", unit: "KG" },
  { code: "2318", name: "QUEIJO COALHO", unit: "KG" },
  { code: "111530", name: "QUEIJO DO REINO", unit: "KG" },
  { code: "120049", name: "QUEIJO MUSSARELA", unit: "KG" },
  { code: "120246", name: "QUEIJO PARMESAO RALADO", unit: "KG" },
  { code: "119180", name: "QUEIJO PRATO", unit: "KG" },
  { code: "2820", name: "QUEIJO RICOTA", unit: "KG" },
  { code: "126301", name: "SALAME ITALIANO MINI", unit: "KG" },
  { code: "19378", name: "UVA PASSAS", unit: "KG" },
  { code: "53976", name: "HORT BETERRABA", unit: "KG" },
  { code: "113861", name: "HORTI ABACAXI", unit: "KG" },
  { code: "8990", name: "HORTI ABOBORA DE LEITE", unit: "KG" },
  { code: "126855", name: "HORTI ALECRIM", unit: "KG" },
  { code: "120199", name: "HORTI ALFACE", unit: "UN" },
  { code: "123456", name: "HORTI ALHO PORO", unit: "UN" },
  { code: "120018", name: "HORTI ALHO", unit: "KG" },
  { code: "124290", name: "HORTI BANANA DA TERRA", unit: "KG" },
  { code: "124785", name: "HORTI BANANA PRATA", unit: "KG" },
  { code: "120097", name: "HORTI BATATA DOCE", unit: "KG" },
  { code: "120029", name: "HORTI BATATA INGLESA", unit: "KG" },
  { code: "126474", name: "HORTI BROCOLIS", unit: "UN" },
  { code: "120021", name: "HORTI CEBOLA", unit: "KG" },
  { code: "120028", name: "HORTI CEBOLINHA", unit: "UN" },
  { code: "120031", name: "HORTI CENOURA", unit: "KG" },
  { code: "120027", name: "HORTI COENTRO", unit: "UN" },
  { code: "113936", name: "HORTI COUVE FOLHA UND", unit: "UN" },
  { code: "120039", name: "HORTI GENGIBRE", unit: "KG" },
  { code: "126159", name: "HORTI GOIABA", unit: "KG" },
  { code: "113987", name: "HORTI HORTELA UND", unit: "UN" },
  { code: "120192", name: "HORTI INHAME", unit: "KG" },
  { code: "120668", name: "HORTI KIWI", unit: "KG" },
  { code: "120066", name: "HORTI LIMAO", unit: "KG" },
  { code: "111104", name: "HORTI MAMAO KG PRODUCAO", unit: "UN" },
  { code: "126025", name: "HORTI MANGA", unit: "UN" },
  { code: "120038", name: "HORTI MANJERICAO", unit: "UN" },
  { code: "111175", name: "HORTI MARACUJA", unit: "KG" },
  { code: "115014", name: "HORTI MELANCIA", unit: "KG" },
  { code: "6897", name: "HORTI MELAO KG", unit: "KG" },
  { code: "120087", name: "HORTI MORANGO", unit: "KG" },
  { code: "124188", name: "HORTI PEPINO", unit: "KG" },
  { code: "124461", name: "HORTI PIMENTA DE CHEIRO", unit: "KG" },
  { code: "120026", name: "HORTI PIMENTAO", unit: "KG" },
  { code: "110175", name: "HORTI REPOLHO", unit: "KG" },
  { code: "109391", name: "HORTI RUCULA", unit: "UN" },
  { code: "34111", name: "HORTI SALSA", unit: "UN" },
  { code: "120022", name: "HORTI TOMATE", unit: "KG" },
  { code: "6873", name: "HORTI UVA", unit: "KG" },
  { code: "126421", name: "HORT MACA", unit: "KG" },
  { code: "123738", name: "HORT QUIABO", unit: "KG" },
  { code: "126422", name: "HORT UVA VITORIA", unit: "KG" },
  { code: "126668", name: "TOMATE CEREJA", unit: "KG" },
  { code: "32551", name: "ACUCAR CONFEITERO", unit: "UN" },
  { code: "120010", name: "ACUCAR", unit: "KG" },
  { code: "126635", name: "ACUCAR REFINADO", unit: "KG" },
  { code: "107809", name: "AGUARDENTE", unit: "UN" },
  { code: "120086", name: "AMENDOIM", unit: "KG" },
  { code: "120090", name: "AMIDO DE MILHO", unit: "KG" },
  { code: "121877", name: "AMONIACO KG", unit: "KG" },
  { code: "45506", name: "ANTIMOFO KG", unit: "UN" },
  { code: "122307", name: "ANTIMOFO LIQUIDO SHELF LIFE", unit: "L" },
  { code: "125520", name: "ARROZ BRANCO", unit: "KG" },
  { code: "120042", name: "ARROZ PARBOLIZADO", unit: "KG" },
  { code: "109468", name: "AVEIA FLOCOS", unit: "UN" },
  { code: "124522", name: "AZEITE DE DENDE", unit: "UN" },
  { code: "32711", name: "AZEITONA", unit: "KG" },
  { code: "122881", name: "BASES PARA BARQUETE", unit: "UN" },
  { code: "124258", name: "BATATA PALHA", unit: "UN" },
  { code: "120103", name: "CACHACA PITU", unit: "LT" },
  { code: "119171", name: "CAFE MOIDO", unit: "KG" },
  { code: "120035", name: "CALDO DE CARNE", unit: "KG" },
  { code: "20107", name: "CALDO DE GALINHA", unit: "UN" },
  { code: "120063", name: "CANELA EM PO", unit: "UN" },
  { code: "120102", name: "CANUDINHO CX C/50", unit: "UN" },
  { code: "120088", name: "CASTANHA", unit: "KG" },
  { code: "122834", name: "CHOCOLATE BARRA MEIO AMARGO", unit: "UN" },
  { code: "111702", name: "CHOCOLATE EM BARRA BRANCO", unit: "UN" },
  { code: "120013", name: "CHOCOLATE EM PO", unit: "UN" },
  { code: "120059", name: "COCO RALADO", unit: "KG" },
  { code: "55826", name: "COCO SECO", unit: "UN" },
  { code: "120043", name: "COLORAL (CORANTE)", unit: "KG" },
  { code: "120055", name: "CORAGEMA", unit: "UN" },
  { code: "120200", name: "CREME DE GOIABA (BALDE)", unit: "KG" },
  { code: "120047", name: "CREME DE LEITE", unit: "UN" },
  { code: "111347", name: "CREME RECHEIO", unit: "KG" },
  { code: "120062", name: "DOCE DE LEITE", unit: "KG" },
  { code: "119125", name: "EMULSIFICANTE LT", unit: "LT" },
  { code: "120242", name: "ERVILHA", unit: "UN" },
  { code: "119181", name: "ESSENCIA AROMA BAUNILHA", unit: "UN" },
  { code: "126351", name: "ESSENCIA COCO", unit: "UN" },
  { code: "126135", name: "ESSENCIA DE PANETONE", unit: "UN" },
  { code: "124986", name: "ESSENCIA MARACUJA", unit: "UN" },
  { code: "120030", name: "EXTRATO TOMATE", unit: "KG" },
  { code: "2790", name: "FARINHA DE TRIGO INTEGRAL", unit: "KG" },
  { code: "120423", name: "FARINHA DE TRIGO", unit: "KG" },
  { code: "122641", name: "FARINHA MANDIOCA", unit: "KG" },
  { code: "115423", name: "FARINHA PANKO", unit: "UN" },
  { code: "120032", name: "FEIJAO CARIOCA", unit: "KG" },
  { code: "124163", name: "FEIJAO FRADINHO", unit: "KG" },
  { code: "122889", name: "FEIJAO PRETO", unit: "KG" },
  { code: "120092", name: "FERMENTO BIOLOGICO", unit: "KG" },
  { code: "33428", name: "FERMENTO EM PO QUIMICO (BOLO)", unit: "KG" },
  { code: "124458", name: "FLOCAO DE ARROZ", unit: "KG" },
  { code: "120698", name: "FLOCAO DE MILHO", unit: "KG" },
  { code: "19811", name: "FONDANT", unit: "KG" },
  { code: "33626", name: "FUBA DE MILHO", unit: "KG" },
  { code: "33671", name: "GERGELIM", unit: "KG" },
  { code: "120093", name: "GOIABADA PEQUENA", unit: "KG" },
  { code: "33732", name: "GORDURA VEGETAL KG", unit: "KG" },
  { code: "66532", name: "GOTAS CHOCOLATE", unit: "UN" },
  { code: "120060", name: "GRANULADO", unit: "UN" },
  { code: "123217", name: "KETCHUP", unit: "KG" },
  { code: "120046", name: "LEITE CONDENSADO", unit: "KG" },
  { code: "120439", name: "LEITE EM PO", unit: "KG" },
  { code: "120240", name: "LEITE UHT", unit: "L" },
  { code: "120036", name: "MACARRAO ESPAGUETE", unit: "UN" },
  { code: "125521", name: "MACARRAO SEMOLA P/ SOPA", unit: "UN" },
  { code: "124234", name: "MAIONESE", unit: "KG" },
  { code: "119149", name: "MARGARINA VEGETAL KG", unit: "KG" },
  { code: "120268", name: "MASSA DE LASANHA", unit: "UN" },
  { code: "114673", name: "MASSA DE TAPIOCA SECA (CUSCUZ)", unit: "KG" },
  { code: "120101", name: "MASSA PAO SEMI ITALIANO", unit: "KG" },
  { code: "120095", name: "MELHORADOR", unit: "KG" },
  { code: "120044", name: "MILHO DE MUGUNZA", unit: "KG" },
  { code: "123455", name: "MILHO VERDE", unit: "KG" },
  { code: "111219", name: "MISTURA PAO MULTIGRAOS LEVIS", unit: "KG" },
  { code: "120476", name: "MISTURA PARA PANETONE", unit: "KG" },
  { code: "125115", name: "MISTURA P/BOLO SABOR LARANJA", unit: "KG" },
  { code: "125713", name: "MISTURA P/BOLO SABOR LIMAO", unit: "KG" },
  { code: "122139", name: "MISTURA P/BOLO SABOR NEUTRO", unit: "KG" },
  { code: "119912", name: "MISTURA P/PAO AUSTRALIANO", unit: "KG" },
  { code: "126712", name: "MISTURA VPT BISC POLVILHO", unit: "KG" },
  { code: "117209", name: "MOLHO BARBECUE", unit: "KG" },
  { code: "84727", name: "MOLHO DE PIMENTA", unit: "UN" },
  { code: "120212", name: "MOLHO DE SOJA SHOYU LITRO", unit: "L" },
  { code: "107813", name: "MOLHO INGLES", unit: "L" },
  { code: "126514", name: "MOLHO MADEIRA", unit: "KG" },
  { code: "124229", name: "MOSTARDA", unit: "UN" },
  { code: "120024", name: "OLEO DE SOJA", unit: "UN" },
  { code: "120056", name: "OLEO MISTO (AZEITE)5 L", unit: "L" },
  { code: "120052", name: "OREGANO", unit: "KG" },
  { code: "113901", name: "OVO", unit: "UN" },
  { code: "126313", name: "PENNE MACARRAO", unit: "UN" },
  { code: "113518", name: "PIMENTA BIQUINHO KG", unit: "KG" },
  { code: "114513", name: "PURE DE BATATA", unit: "UN" },
  { code: "125524", name: "REFRESCO EM PO LARANJA", unit: "UN" },
  { code: "125523", name: "REFRESCO EM PO LIMAO", unit: "UN" },
  { code: "120704", name: "REFRESCO EM PO MARACUJA", unit: "UN" },
  { codebase: "125526", name: "REFRESCO EM PO MORANGO", unit: "UN" },
  { code: "3292", name: "SAL", unit: "UN" },
  { code: "125403", name: "TAPIOCA PRODUCAO", unit: "UN" },
  { code: "120020", name: "TEMPERO MISTO (COMINHO)", unit: "KG" },
  { code: "2554", name: "TOMATE SECO KG", unit: "KG" },
  { code: "34289", name: "TRIGO P/KIBE KG", unit: "KG" },
  { code: "45520", name: "UNTAFORMA", unit: "L" },
  { code: "120023", name: "VINAGRE", unit: "UN" },
  { code: "122730", name: "VINHO", unit: "UN" },
];
