import {TipoPedidoEnum, TipoPedidoStringEnum} from '@models/pedido';

export interface RequestsConfig {
    userId: string;
    idLoja: number;
    tipoPedido: TipoPedidoEnum;
    parametrizacao: Parametrizacao;
    CNPJ?: string;
}

export interface RequestsConfigToSend {
  userId: string;
  idLoja: number;
  tipoPedido: TipoPedidoEnum | TipoPedidoStringEnum;
  parametrizacao: Parametrizacao;
}

export interface StatusMixIdeal {
    Status: boolean;
}


export interface MixIdeal {
    DescontoCumulativo: boolean,
    Condicoes: Array<MixIdealCondition>;
}

export interface MixIdealCondition {
    IdCondicao: number;
    Codigo: string;
    Descricao: string;
    DataInicioVigencia: string;
    DataFimVigencia: string;
    ProdutosMix: Array<ProdutoMixIdeal>;
    ProdutosCondicao: Array<ProdutosCondicao>;
}

// Test

export interface MixIdealValidation {
    Condicoes : Array<MixIdealConditionValidation>;
    ItensPedido : Array<ItensPedido>
}

export interface MixIdealConditionValidation {
    IdCondicao : number;
    Descricao : string;
    AtendeRequisitos : boolean;
    Mensagem : string;  
}
export interface ItensPedido {
    DUN : string;
    DescontoPorVolumeBDShow : Array<any>;
    Distribuidores : Array<any>,
    DistribuidoresFlat : Array<any>,
    QuantidadeDUN : number,
    StatusDistribuidor : string,
    apresentacaoDUN : string,
    caminhoFoto : string,
    compradoAcima30Dias : boolean,
    compradoAte30Dias : boolean,
    cupomDesconto : boolean,
    descontoAdicional : string
    descontoItem : number;
    descontoMix : number;
    descontoTotal : number;
    descricao : string;
    destaque : boolean;
    ean : string;
    faixaSelecionada : faixaSelecionada;
    faixasDesconto : Array<faixaSelecionada>;
    familia : "Medicamentos A",
    idFamilia : number;
    idProduto : number;
    idProdutoDun : string;
    idTipoProduto : number;
    isDemonstraGridPedido : boolean;
    isDun : boolean;
    laboratorio : string;
    menorDataVigencia : string;
    preco : number;
    precoDistribuidor : boolean;
    precoPor : number;
    quantidade : number; 
    quantidadeEstoque : number;
    quantidadeMinima : number;
    quantidadeMinimaMix : number;
    valorBruto : number;
    valorLiquido : number;
    usandoMixIdeal : boolean;
    condicoesMixIdeal: Array<any>
}

export interface faixaSelecionada {
    CondicaoComercial : CondicaoComercial;
    PercentualDesconto : number;
    QuantidadeMaxima : number;
    QuantidadeMinima : number;
    atual : boolean;

}


export interface CondicaoComercial{
    DescontoDisponivel : number;
    DescontoGestor : number;
    IdDescontoBase : number;
    IdDescontoCupom : number;
    IdDescontoNegociacao1 : number;
    IdDescontoNegociacao2 : number;
    IdDescontoNegociacao3 : number;
    IdDescontoNegociacao4 : number;
    IdDescontoNegociado : number;
    PercentualDescontoBase : number;
    PercentualDescontoCupom:number;
    PercentualDescontoNegociacao1 : number;
    PercentualDescontoNegociacao2 : number;
    PercentualDescontoNegociacao3 : number;
    PercentualDescontoNegociacao4 : number;
    PercentualDescontoNegociado : number;
    PercentualDescontoOLSpread : number,
}

// END Test

export interface ProdutoMixIdeal {
    IdFamilia: number;
    DescricaoFamilia: string;
    Desconto: number;
    QuantidadeMinima: number;
    PorFamilia: boolean;
    Produtos: Array<ProdutosMix>;
}

export interface ProdutosMix {
    IdProduto: number;
    DescricaoProduto: string;
    EAN: string;
    DUN: string;
    Desconto: number;
    QuantidadeMinima: number;
    QuantidadeDUN: number;
    UsandoDUN: boolean;
}
//
export interface ProdutosCondicao {
    IdFamilia: number;
    DescricaoFamilia: string;
    Desconto: number;    
    PorFamilia: boolean;
    Produtos: Array<ProdutosCondicaoMix>;
}

export interface ProdutosCondicaoMix{
    IdProduto: number;
    DescricaoProduto: string;
    EAN: string;
    DUN: string;
    Desconto : number;
    QuantidadeDUN: number;
    UsandoDUN: boolean;
}

//
export interface Parametrizacao {
    ParametrizacaoLooping: ParametrizacaoLooping;
    DistribuidoresPrazoPagamento: DistribuidoresPrazoPagamento[];
    DistribuidoresPdv?: any;
    PrazoPagamento: PrazoPagamento[];
    Tabloides?: any;
    CondicaoComercialBase?: CondicaoComercialBase;
    ChaveUnicaPedido: string;
}

export interface DistribuidoresPrazoPagamento {
    PdvId: number;
    DistribuidorId: number;
    OrdemDePreferencia: number;
    Distribuidor: Distribuidor;
}

interface Distribuidor {
    Id: number;
    Ativo: boolean;
    ValorMinimoDePedido: number;
    NomeFantasia: string;
    RazaoSocial?: any;
}

export interface CondicaoComercialBase {
    Id: number;
    Descricao: string;
    Nivel: number;
    ValorMinimoDePedido: number;
}

export interface PrazoPagamento {
    IdPrazoPagamento: number;
    Codigo: string;
    Descricao: string;
    Prazo: number;
    Rep: boolean;
    Padrao: boolean;
    Especial: boolean;
    RepDefault: boolean;
    PadraoDefault: boolean;
    EspecialDefault: boolean;
    TiposDePedido?: any;
    PrazosDefault?: any;
    Distribuidores: DistribuidoresPrazoPagamento[];
    Selecionado: boolean;
}

export interface ParametrizacaoLooping {
    UsarLooping: boolean;
    Tipo: number;
    Origem: number;
    OrdenacaoDesconto: boolean;
    MostrarDescontoMedio: boolean;
    UtilizaCasasDecimais: boolean;
    UtilizaPrecoDistribuidor: boolean;
    ExibirDescontoBase: boolean;
    ExibirDescontoFaixa1: boolean;
    ExibirDescontoFaixa2: boolean;
    ExibirDescontoFaixa3: boolean;
    ExibirDescontoFaixa4: boolean;
    ExibirDescontoNegociado: boolean;
    UtilizaComboOferta: boolean;
}

export interface DistributorConditionForSpecialOrder {
    idProduto?: number;
    idProdutoDun?: number;
    Preco?: number;
    precoDistribuidor?: boolean;
    isComboItem: boolean,
    infoCombo?: {
        id: number,
        price: number,
        priceDiscount: number
    }
}

export interface RequestsConfigPayload {
    userId: string;
    tipoPedidoLista: TipoPedidoStringEnum[];
    idLojaLista: number[];
}

export interface RequestsSpecialConfigPayload {
    userId: string;
    tipoPedido: string;
    idLoja: number;
}

export interface RequestsSpecialConfigWithDistributorPayload {
    DistributorId: number;
    StoreId: number;
    TabloidId: number;
    UserId: string;
}

export interface ParametrizacaoAutenticacaoExternaPerfis {
    PerfilId: string;
    PerfilNome: string;
    Selecionado: boolean;

}

export interface ParametrizacaoPerfilAcompanhaEmailPedido{
    KeyAccount:  boolean;
    GerenteCampo:  boolean;
    GerenteRegional:  boolean;
    DiretorComercial: boolean;
}

export interface ParametrizacaoTipoCliente{
    Singular: string;
    Plural: string;
    Artigo: string;
}

export interface ParametrizacaoTipoPedido {
    PedidoPadrao: boolean;
    PedidoEspecial: boolean;
    PedidoREP: boolean;
    PedidoFlex: boolean
}

export interface ParametrizacaoExibirFiltrosPersonalizadosPedido {
    ManterPadrao: boolean;
    OcultarPadrao: boolean;
    Desabilitar: boolean;
}



export interface GeneralParameterizations {
    
    ParametrizacaoRelatorioMapaVendas: {
        Familia: boolean;
        Produto: boolean;
    },
    ParametrizacaoRelatorioMapaVendasValorExibido: {
        ValorBruto: boolean;
        ValorLiquido: boolean;
        ValorBrutoLiquido: boolean;
    },
    ParametrizacaoPedidoRepDiferencaEstoquePesquisado: boolean;
    ParametrizacaoPermitirCadastroDiretoDePDV: boolean;
    ParametrizacaoDiasDemonstracaoEstoque: number;
    ParametrizacaoTempoSessao: number;
    ParametrizacaoDestaquePesquisaProdutoIndustria: boolean;
    ParametrizacaoSomenteProdutosDestaque: boolean;
    ParametrizacaoPerfilAcompanhaEmailPedido: ParametrizacaoPerfilAcompanhaEmailPedido;
    ParametrizacaoHabilitaPrecoEstoque: true,
    ParametrizacaoAutenticacaoExterna: false,
    ParametrizacaoAutenticacaoExternaEndereco: boolean
    ParametrizacaoAutenticacaoExternaPerfis: Array<ParametrizacaoAutenticacaoExternaPerfis>,
    ParametrizacaoTipoCliente: ParametrizacaoTipoCliente;
    TrocaBandeiraNecessitaAprovacao: boolean;
    ParametrizacaoPedidoFlexPrecoMinimo: boolean;
    ParametrizacaoProjetoIraTrabalharComModeloDUN: boolean;
    ParametrizacaoFormatoDeEnvio: number,
    ParametrizacaoExibeFiltroCategoria: ParametrizacaoTipoPedido;
    ParametrizacaoExibeFiltroFamilia: ParametrizacaoTipoPedido;
    ParametrizacaoExibeImagemProduto: ParametrizacaoTipoPedido;
    ParametrizacaoExibirFiltrosPersonalizados: ParametrizacaoTipoPedido;
    ParametrizacaoExibirFiltrosPersonalizadosPedido: ParametrizacaoExibirFiltrosPersonalizadosPedido;
    ParametrizacaoFiltroDestaqueAtivo: boolean;
    HabilitaMultiSetor: boolean;
}

export interface Filters{
    idProduto: number;
    Ativo: boolean,
    Codigo: string,
    Descricao: string,
    DescricaoCategoria: string,
    Icone: string,
    IdCategoriaFiltroPersonalizado: number,
    IdFiltroPersonalizado: number
}
export interface Categories{
    Descricao: string,
    IdCategoriaFiltrosPersonalizados: number,
    FiltrosPersonalizados: Array<Filters>
}

