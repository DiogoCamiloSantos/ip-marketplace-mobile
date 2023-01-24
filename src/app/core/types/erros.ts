export interface ErroApi {
  Message: string;
  ModelState: {
    Erros: string[];
  };
}

export enum StackErrorType {
  VALIDATION_ERROR = "__validationError__",
  TRANSACTION_ERROR = "__transactionError__",
  COMMON_ERROR = "__commonError__",
  JS_ERROR = "__jsError__"
}

export class StackError extends Error {
  public type: StackErrorType = StackErrorType.COMMON_ERROR;
  public jsonStack: string | object = null;

  constructor(
    message?: string,
    type?: StackErrorType,
    jsonStack?: string | object
  ) {
    super(message);

    this.type = type;
    this.jsonStack = jsonStack;
  }

  static fromError(err: StackError) {
    return new StackError(err.message, err.type, err.jsonStack);
  }
}

export enum StackSyncErrorsEnum {
  STORE = "Sincronização de lojas",

  STORE_NOT_KNOW = "Erro desconhecido na sincronização de lojas",
  STORE_ROUTES_SEND = "Sincronização de envio das rotas",
  STORE_ROUTES_SEND_UPDATE = "Atualização local de envio das rotas",

  STORE_ROUTES_RETRIEVE = "Sincronização de retorno das rotas",
  STORE_ROUTES_NOT_KNOW = "Erro desconhecido na sincronização de rotas",
  STORE_ROUTES_EMPTY = "Não foram encontradas rotas sincronizadas para o dia de hoje",

  RESEARCH_INDUSTRY_MERCHAN_RETRIEVE = "Sincronização de informações para pesquisa indústria merchandising",
  RESEARCH_INDUSTRY_MERCHAN_SEND = "Sincronização de envio das pesquisas indústria merchandising",
  RESEARCH_INDUSTRY_MERCHAN_NOT_KNOW = "Erro desconhecido na sincronização de informações para pesquisa indústria merchandising",
  RESEARCH_INDUSTRY_MERCHAN_STORE_ROUTES_EMPTY = "Pesquisa indústria merchandising: Não foram encontradas rotas sincronizadas para o dia de hoje",

  RESEARCH_INDUSTRY_PRODUCT_RETRIEVE = "Sincronização de informações para pesquisa produto indústria",
  RESEARCH_INDUSTRY_PRODUCT_SEND = "Sincronização de envio das pesquisas produto indústria",
  RESEARCH_INDUSTRY_PRODUCT_NOT_KNOW = "Erro desconhecido na sincronização de informações para pesquisas produto indústria",
  RESEARCH_INDUSTRY_PRODUCT_STORE_ROUTES_EMPTY = "Pesquisa produto indústria: Não foram encontradas rotas sincronizadas para o dia de hoje",

  RESEARCH_CONCURRENT_MERCHAN_RETRIEVE = "Sincronização de informações para pesquisa concorrente merchandising",
  RESEARCH_CONCURRENT_MERCHAN_SEND = "Sincronização de envio das pesquisas concorrente merchandising",
  RESEARCH_CONCURRENT_MERCHAN_NOT_KNOW = "Erro desconhecido na sincronização de informações para pesquisa concorrente merchandising",
  RESEARCH_CONCURRENT_MERCHAN_STORE_ROUTES_EMPTY = "Pesquisa concorrente merchandising: Não foram encontradas rotas sincronizadas para o dia de hoje",

  RESEARCH_CONCURRENT_PRODUCT_RETRIEVE = "Sincronização de informações para pesquisa produto concorrente",
  RESEARCH_CONCURRENT_PRODUCT_SEND = "Sincronização de envio das pesquisas produto concorrente",
  RESEARCH_CONCURRENT_PRODUCT_NOT_KNOW = "Erro desconhecido na sincronização de informações para pesquisa produto concorrente",
  RESEARCH_CONCURRENT_PRODUCT_STORE_ROUTES_EMPTY = "Pesquisa produto concorrente: Não foram encontradas rotas sincronizadas para o dia de hoje",

  RESEARCH_COMPLEMENTARY_RETRIEVE = "Sincronização de informações para pesquisa complementar",
  RESEARCH_COMPLEMENTARY_SEND = "Sincronização de envio das pesquisas complementar",
  RESEARCH_COMPLEMENTARY_NOT_KNOW = "Erro desconhecido na sincronização de informações para pesquisa complementar",

  RESEARCH_TRADE_RETRIEVE = "Sincronização de informações para pesquisa trade marketing",
  RESEARCH_TRADE_SEND = "Sincronização de envio das pesquisas trade marketing",
  RESEARCH_TRADE_NOT_KNOW = "Erro desconhecido na sincronização de informações para pesquisa trade marketing",
  
  RESEARCH_SHARE_OF_SHELF_NOT_KNOW = "Erro desconhecido na sincronização de informações para pesquisa share de gôndola",
  RESEARCH_SHARE_OF_SHELF_ALREADY_ANSWERED = "Erro na sincronização de informações para pesquisa share de gôndola",
  RESEARCH_SHARE_OF_SHELF_SEND = "Sincronização de envio da pesquisa de share de gôndola",

  CONTENT_AND_RESEARCHS_SEND  = "Sincronização de envio do conteúdo",
  CONTENT_AND_RESEARCHS_NOT_KNOW = "Erro desconhecido na sincronização das visitas e pesquisas",

  VISITS_AND_RESEARCHS_SEND = "Sincronização de envio das visitas e pesquisas",
  VISITS_AND_RESEARCHS_NOT_KNOW = "Erro desconhecido na sincronização das visitas e pesquisas",

  VISITS_INFO_RETRIEVE = "Sincronização de informações para visitas",
  VISITS_INFO_NOT_KNOW = "Erro desconhecido na sincronização de informações para visitas",

  WORKSPACES = "Sincronização de workspaces",
  WORKSPACES_NOT_KNOW = "Erro desconhecido na sincronização de workspaces",

  THEME_NOT_NOW = "Erro desconhecido na sincronização de temas",
  THEME_RETRIEVE = "Sincronização de temas",
  THEME_RETRIEVE_INDIVIDUAL = "Estamos com problemas na sincronização de temas",

  REQUEST_CONFIG_RETRIEVE = "Sincronização de parametrizações de pedido",
  REQUEST_CONFIG_NOT_KNOW = "Erro desconhecido na sincronização de parametriazações de pedido",
  MIX_PRODUTOS = "Sincronização de SKUs e Combos",
  CONDICAO_COMERCIAL = "Sincronização de condição comercial",
  CONDICAO_COMERCIAL_NOT_FOUND = "Condição comercial não cadastrada para loja",
  REQUEST_RETRIEVE_SEND = "Sincronização de pedidos",
  REQUEST_NOT_KNOW = "Erro desconhecido na sincronização de pedidos",
  MIX_PRODUTOS_ESPECIAL = "Sincronização de SKUs e Combos de pedido especial",
  MIX_DISTRIBUIDORES_ESPECIAL = "Sincronização de distribuidores dos SKUs e Combos de pedido especial",
  REQUEST_SPECIAL_CONFIG_RETRIEVE = "Sincronização de parametrizações de pedido especial",
  REQUEST_SPECIAL_CONFIG_NOT_KNOW = "Erro desconhecido na sincronização de parametrizações de pedido especial",
  REQUEST_SPECIAL_GET_INFO = "Erro ao tentar obter informações de cadastro",

  PERMISSIONS = "Sincronização de permissões do usuário",
  PERMISSIONS_NOT_KNOW = "Erro desconhecido na sincronização de permissões do usuário",

  PROFILE = "Sincronização de perfil do usuário",
  PROFILE_NOT_KNOW = "Erro desconhecido na sincronização de perfil do usuário",

  SYSTEM_PARAM = "Sincronização de parametrizações do usuário",
  SYSTEM_PARAM_NOT_KNOW = "Erro desconhecido na sincronização de parametrizações do usuário",

  REPORT_ANALYTIC_RETRIEVE = "Estamos com problemas para buscar os dados do relatório de status do pedido",

  TABLOIDS_RETRIVE_INDIVIDUAL = "Estamos com problemas para buscar os tabloides cadastrados",

  TIMEOUT_REQUEST = "Está demorando mais do que o normal",
  BAD_REQUEST = "Estamos com problemas na comunicação"
}

export enum TypeInfoEnum {
  PRAZO_PAGAMENTO = "prazo",
  CONDICAO_COMERCIAL = "condicao",
  DISTRIBUIDOR = "distribuidor"
}

export class ErrorInsufficientInformation extends Error {
  typeInfo: TypeInfoEnum;

  constructor(message?: string, typeInfo?: TypeInfoEnum) {
    super(message);
    this.typeInfo = typeInfo;
  }
}

export interface ValidationItem {
  invalid: boolean;
  msg: string;
}
