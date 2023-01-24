import { ResearchEnumStatus } from "./research";

export interface Menu {
  Name: string;
  Icon?: string;
  NavPush?: any;
  Params?: any[];
  Children?: MenuChildren[];
  Visible?: boolean;
  Status?: ResearchEnumStatus;
}

export interface MenuChildren {
  Name: string;
  NavPush: any;
  Params: any[];
}

export enum ConfigEnum {
  VALOR_TOTAL_FATURADO = "config_valor_total_faturado",
  VALOR_TOTAL_SOLICITADO = "config_valor_total_solicitado",
  TOTAL_PEDIDOS_ENVIADOS = "config_total_pedidos_enviados",
  TOTAL_PEDIDOS_SOLICITADOS_PDV = "config_total_pedido_solicitados_pdv",
  TOTAL_PEDIDOS_ENVIADOS_PDV = "config_total_pedido_enviados_pdv",

  ORDER_CONFIG_DESCONTO_MEDIO = "config_desconto_medio"
}

export enum ConfigGroupEnum {
  DASHBOARD = "dashboards",
  ORDER = "orders"
}

export interface AlertPresent {
  title: string;
  message: string;
  buttons: any;
  cssClass: string;
  enableBackdropDismiss: boolean;
}
