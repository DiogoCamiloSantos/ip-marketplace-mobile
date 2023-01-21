import { FormControl } from "@angular/forms";
import { Store } from "@dbentities/Store";
// import { StoreRoute } from "@dbentities/StoreRoute";
// import { SkuForMixValidation } from "./mix-ideal/sku-for-mix-validation/sku-for-mix-validation.interface";
// import { ItensDoPedido, Sku } from "./produtos";
// import { Distribuidores } from "./store";

export interface TipoPedido {
  name: string;
  icon: string;
  type: TipoPedidoEnum;
  show?: boolean;
}

export interface TipoPedidoToSend {
  name: string;
  icon: string;
  type: TipoPedidoEnum | TipoPedidoStringEnum;
  show?: boolean;
}

export enum TipoPedidoEnum {
  PADRAO = 1,
  ESPECIAL = 2,
  BONIFICADO = 3,
  REP = 4,
  FLEX = 5
}

export enum TipoPedidoStringEnum {
  PADRAO = "pad",
  ESPECIAL = "esp",
  REP = "rep",
  BONIFICADO = "bon",
  FLEX = "flex"
}

// export interface DistribuidorValidation {
//   id: number;
//   distribuidorItem: FormControl;
//   checkbox: Distribuidores;
// }

// export interface ProdutoValidation {
//   id: number;
//   quantidade: number;
//   produto: Sku;
//   descontoDisponivel: number;
//   index?: number;
//   descontoEditado: boolean;
//   descontoAlterado : number;
// }

// export interface ProdutoMixValidation {
//   id: number;
//   quantidade: number;
//   produto: Sku;
//   descontoItem: number;
//   index?: number;
// }

// export interface SelectedConditionValidationMix {
//     idCondicao: number,
//     produtos?: ProductMixSelected[]
// }

// export interface ProdutoValidationMix {
//   condicoes: SelectedConditionValidationMix[],
//   ItensPedido: SkuForMixValidation[]
// }

// export interface ValidationMixResult {
//   Condicoes: Array<{
//     AtendeRequisitos: boolean;
//     Descricao: string;
//     IdCondicao: number;
//     Mensagem: string;
//   }>,
//   ItensPedido: SkuForMixValidation[]
// }

export interface ProductMix {
  id : number,
  quantidade : number;
  produto :
    {
      IdFamilia : number;
      DescricaoFamilia : string;
      Desconto : number;
      QuantidadeMinima : number;
      PorFamilia :boolean,
      Produtos :[
        {
          IdProduto : number,
          DescricaoProduto : string;          
          EAN : number;
          Desconto : number;
          QuantidadeMinima : number;
        }
      ]
    },
    desconto : number;
}

export interface ProductMixSelected {
  idCondicao?: number;
  idProduto: number;
  idFamilia: number;
  quantidade: number;
  DUN: string;
  QuantidadeDUN: number;
}

export interface Pedido {
  id: number;
  title: string;
  description: string;
  itensDoPedido: any[];
}

export interface PedidoResponse {
  Datapedido: string;
  NrPedido: string;
  Cnpj: string;
  RazaoSocial: string;
  ValorTotalSolicitado: number;
  ValorTotalFaturado: number;
  StatusRetornoPedido: string;
  OrigemPedido?: string;
  ItensDoPedido: ProdutoItemPedidoResponse[];
}

export interface ProdutoItemPedidoResponse {
  CentroDistribuidor: string;
  Produto: string;
  StatusRetornoItem: string;
  Ean: string;
  ValorBrutoSolicitado: number;
  ValorLiquidoSolicitado: number;
  ValorBrutoFaturado: number;
  ValorLiquidoFaturado: number;
  DescontoSolicitado: number;
  DescontoFaturado: number;
  QuantidadeSolicitada: string;
  QuantidadeFaturada: string;
  MotivoDeNaoAtendimento: string;
  DescontoNotaFiscal: number;
  PrecoFabrica: number;
}

export interface ProdutoEspelhoSync {
  idProduto: number;
  DescontoDisponivel: number;
}

export interface EspelhoPedido {
  TotalApresentacoes: number;
  TotalLiquido: number;
  TotalBruto: number;
  TotalUnidades: number;
  Produtos: ProdutoEspelhoSync[];
  NumeroCliente: string;
  Pdv: Store;
  PrazoPagamento: string;
}

// export interface PedidoSincronizacao {
//   CNPJ: string;
//   CombosDoPedido: any[];
//   CondicaoComercialBaseId: number;
//   IdTabloide: number;
//   DatasProgramadas: any[];
//   Distribuidores: Distribuidores[];
//   DistribuidorId: number;
//   ForcarGerenciamento: boolean;
//   IdPrazoPagamento: number;
//   ItensDoPedido: ItensDoPedido[];
//   Origem: string;
//   PdvId: number;
//   Prazo: string;
//   ReferenciaPedido: string;
//   SomenteValidar: string;
//   TipoLooping: string;
//   TipoPedido: string;
//   UserId: string;
//   ChaveUnicaPedido: string;
//   EspelhoPedido?: EspelhoPedido;
// }

export interface ParametroEspelhoPedidoSync {
  Email: string;
  IdPedido: string;
  IdPedidoFake: string;
  Visualizacao: string;
}

export interface PedidoResponseSync {
  ErrosPedido: any[];
  NumeroPedido: string;
  ParametroEspelhoPedido: ParametroEspelhoPedidoSync;
  PedidoCriado: boolean;
  PedidoEnviadoParaAprovacao: boolean;
  PedidoProgramado: boolean;
  Editavel: boolean;
}

export interface EspelhoPedidoOnline {
  IdPedido: number;
  NumeroPedidoCliente: string;
  Data: string;
  Cnpj: string;
  NomeUsuario: string;
  PerfilUsuario: string;
  RazaoSocial: string;
  Origem: string;
  DescricaoPrazoPagamento: string;
  Distribuidores: [
    {
      IdDistribuidor: number;
      RazaoSocial: string;
    }
  ];
  Pedidos: [
    {
      IdPedido: number;
      IdDistribuidor: number;
      QuantidadeApresentacao: number;
      TotalUnidades: number;
      TotalBruto: number;
      TotalLiquido: number;
      DescontoMedio: number;
      Itens: [
        {
          idItemPedido: number;
          idPedido: number;
          idProduto: number;
          idProdutoDUN: number;
          QtdeProduto: number;
          QtdeDUN: number;
          QtdeAtendida: number;
          EAN: string;
          DUN: string;
          ValorUnitario: number;
          Desconto: number;
          Descricao: string;
          ApresentacaoDUN: string;
          Familia: string;
        }
      ];
    }
  ],
  Observacao: string;
}

export interface ProdutoTemplateEspelhoPedido {
  IdProduto: number;
  Familia: string;
  Descricao: string;
  Quantidade: number;
  Desconto: number;
  Preco: number;
}

export interface PedidoTemplateEspelho {
  NumeroPedido: string;
  IdDistribuidor: number;
  Distribuidor?: string;
  Itens: Array<ProdutoTemplateEspelhoPedido>;
  TotalApresentacoes: number;
  TotalUnidades: number;
  TotalBruto: number;
  TotalLiquido: number;
}

export interface TemplateEspelhoPedido {
  IdPedido: string;
  RazaoSocial: string;
  CNPJ: string;
  Origem: string;
  Login: string;
  NumeroCliente: string;
  Distribuidores: string[];
  PrazoPagamento: string;
  Pedidos: PedidoTemplateEspelho[];
  Observacao: string
}

// export class StoreRouteWithAddressAndVisit extends StoreRoute {
//   address: string;
//   visitSync: boolean;
//   visitSent: boolean;
// }

export interface StatusPedidoPaginacao {
  Pagina: number;
  Tamanho: number;
  TotalPaginas: number;
  ProximaPagina: number;
  PaginaAnterior: number;
}

export interface ItensStatusPedido {
  Apresentacao?: string;
  ApresentacaoDUN?: string;
  Bonificado?: false;
  DUN?: string;
  Desconto?: number;
  Descricao?: string;
  EAN?: string;
  Motivo?: any;
  ProdutoTotal?: any;
  QtdeAtendida?: any;
  QtdeDUN?: number;
  QtdeProduto?: number;
  Retorno?: any;
  ValorUnitario?: number;
  dataAlteracao?: any;
  idContrato?: number;
  idItemPedido?: number;
  idPedido?: number;
  idProduto?: number;
  idProdutoDUN?: number;
  idProdutoGerador?: any;
  isDUN?: false;
  Familia: string;
  Ean: string;
  Produto: string;
  StatusRetornoItem: string;
  QuantidadeSolicitada: number;
  QuantidadeFaturada: number;
  QuantidadeNaoFaturada: number;
  ValorBrutoSolicitado: string;
  ValorBrutoFaturado: string;
  ValorBrutoNaoFaturado: string;
  ValorLiquidoSolicitado: string;
  DescontoPrograma: string;
  DescontoForaPrograma: string;
  DescontoNotaFiscal: number;
  DescontoSolicitado: number;
  ValorLiquidoFaturado: string;
  ValorLiquidoNaoFaturado: string;
  PrecoFabrica: number;
}

export interface PedidosStatusPedido {
  Datapedido: string;
  Setor: string;
  Representante: string;
  Gdn: string;
  Gcr: string;
  Diretor: string;
  Cnpj: string;
  Bandeira: string;
  Cidade: string;
  Uf: string;
  NrPedido: string;
  NrPedidoPrincipal: string;
  OrigemPedido: string;
  TipoPedido: string;
  PrazoPagamento: string;
  StatusRetornoPedido: string;
  MotivoDeNaoAtendimento: string;
  NotaFiscal: string;
  DataNotaFiscal: string;
  CnpjCentroDistribuicao: string;
  CentroDistribuidor: string;
  MatrizDistribuidor: string;
  RazaoSocial?: string;
  Itens: ItensStatusPedido[];
  ValorTotalSolicitado?: number;
}

export interface StatusPedido {
  Paginacao: StatusPedidoPaginacao;
  Pedidos: PedidosStatusPedido[];
}
