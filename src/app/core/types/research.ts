export enum ResearchEnumStatus {
  SYNCED = 'synced',
  SAVED = 'saved',
  BLANK = 'blank'
}

export enum ResearchEnumType {
  INDUSTRY_PRODUCT = 'industry_product',
  INDUSTRY_MERCHAN = 'industry_merchan',
  SHARE_OF_SHELF = 'share_of_shelf',
  CONCURRENT_MERCHAN = 'concurrent_merchan',
  CONCURRENT_PRODUCT = 'concurrent_product',
  COMPLEMENTARY = 'complementary',
  RESEARCH_COMPLEMENTARY = 'research_complementary',
  RESEARCH_TRADE = 'research_trade'

}

export module ResearchModule {
  export interface ResearchResponse {
    Familias: FamiliasResearchResponse[],
    Merchandising: MerchandisingResearchResponse[],
    PesquisaMerchandisingItens: any[],
    TipoAtivacao: TipoAtivacaoResearchResponse[]
  }

  export interface FamiliasResearchResponse {
    Apagado: boolean,
    CaminhoFoto: string,
    CentroCusto: string,
    Codigo: string,
    Concorrente: boolean,
    DataAlteracao: string,
    DataInclusao: string,
    Descricao: string,
    Foto: string,
    IdFamilia: number,
    Promovido: boolean,
    Trade: boolean
  }

  export interface MerchandisingResearchResponse {
    IdMerchandising: number,
    Descricao: string
  }

  export interface TipoAtivacaoResearchResponse {
    IdMerchandisingTipoAtivacao: number,
    Descricao: string
  }

  export interface IResearchResponse {
    Familia: FamiliasResearchResponse;
    Merchandising: MerchandisingResearchResponse;
    MerchandisingTipoAtivacao: TipoAtivacaoResearchResponse;
    Quantidade: number;
  }
}

export interface SalvarPesquisaMerchandising {
  IdRota: number;
  PesquisaMerchandisingItens: PesquisaMerchandisingItem[];
  PesquisaMerchandisingItensRemovidos: any[];
}

export interface PesquisaMerchandisingItem {
  IdPesquisaMerchandising?: any;
  IdMerchandising: number;
  MerchandisingDescricao: string;
  IdFamilia: number;
  FamiliaDescricao: string;
  IdTipoAtivacao: number;
  TipoAtivacaoDescricao: string;
  Quantidade: number;
}
