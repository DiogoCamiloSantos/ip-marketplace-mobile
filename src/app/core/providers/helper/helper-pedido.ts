import {Injectable} from '@angular/core';
import {differenceInMilliseconds} from 'date-fns';
import {PedidoResponse, ProdutoItemPedidoResponse, TipoPedidoEnum, TipoPedidoStringEnum} from '@models/pedido';
import {HelperProvider} from './helper';

@Injectable()
export class HelperPedidoProvider {
    constructor() {
    }

    static toTipoPedidoStringEnum(tipoPedido: TipoPedidoEnum): TipoPedidoStringEnum {
        switch (tipoPedido) {
            case TipoPedidoEnum.REP:
                return TipoPedidoStringEnum.REP;
            case TipoPedidoEnum.BONIFICADO:
                return TipoPedidoStringEnum.BONIFICADO;
            case TipoPedidoEnum.ESPECIAL:
                return TipoPedidoStringEnum.ESPECIAL;
            case TipoPedidoEnum.FLEX:
                return TipoPedidoStringEnum.FLEX;
            case TipoPedidoEnum.PADRAO:
                return TipoPedidoStringEnum.PADRAO;
        }
    }

    public groupByKey(xs, key) {
        let copyXs = HelperProvider.copy(xs);
        return copyXs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }

    public formatOrders(ordersGrouped): PedidoResponse[] {
        let pedidos = HelperProvider.copy(ordersGrouped);
        let pedidosListed: PedidoResponse[] = new Array<PedidoResponse>();
        Object
            .keys(pedidos)
            .forEach((key) => {
                pedidosListed.push(
                    <PedidoResponse>{
                        NrPedido: key,
                        Datapedido: pedidos[key][0].Datapedido,
                        RazaoSocial: '',
                        Cnpj: pedidos[key][0].Cnpj,
                        ValorTotalSolicitado: this.somaValorLiquidoSolicitadoItensPedido(pedidos[key]),
                        ValorTotalFaturado: this.somaValorLiquidoFaturadoItensPedido(pedidos[key]),
                        StatusRetornoPedido: pedidos[key][0].StatusRetornoItem || pedidos[key][0].StatusRetornoPedido,
                        ItensDoPedido: pedidos[key].map((item: any) => {
                            return <ProdutoItemPedidoResponse>{
                                CentroDistribuidor: item.CentroDistribuidor,
                                Produto: item.Produto,
                                StatusRetornoItem: item.StatusRetornoItem,
                                Ean: item.Ean,
                                ValorBrutoSolicitado: parseFloat(item.ValorBrutoSolicitado.replace(',', '.') || 0),
                                ValorLiquidoSolicitado: parseFloat(item.ValorLiquidoSolicitado.replace(',', '.') || 0),
                                DescontoSolicitado: this.calculoDescontoSolicitado(item),
                                ValorBrutoFaturado: parseFloat(item.ValorBrutoFaturado.replace(',', '.') || 0),
                                ValorLiquidoFaturado: parseFloat(item.ValorLiquidoFaturado.replace(',', '.') || 0),
                                DescontoFaturado: this.calculoDescontoFaturado(item),
                                QuantidadeSolicitada: item.QuantidadeSolicitada,
                                QuantidadeFaturada: item.QuantidadeFaturada,
                                MotivoDeNaoAtendimento: item.MotivoDeNaoAtendimento
                            };
                        })
                    }
                );
            });
        return pedidosListed
            .sort((a, b) => differenceInMilliseconds(new Date(a.Datapedido), new Date(b.Datapedido)))
            .reverse();
    }

    public somaValorTotalLiquidoSolicitadoPedidos(orders: PedidoResponse[]) {
        return orders.reduce(function (prev, cur) {
            return prev + cur.ValorTotalSolicitado;
        }, 0);
    }

    public somaValorTotalLiquidoFaturadoPedidos(orders: PedidoResponse[]) {
        return orders.reduce(function (prev, cur) {
            return prev + cur.ValorTotalFaturado;
        }, 0);
    }

    private somaValorLiquidoSolicitadoItensPedido(orderItems) {
        return orderItems.reduce(function (prev, cur) {
            return prev + parseFloat(cur.ValorLiquidoSolicitado.replace(',', '.'));
        }, 0);
    }

    private somaValorLiquidoFaturadoItensPedido(orderItems) {
        return orderItems.reduce(function (prev, cur) {
            return prev + parseFloat(cur.ValorLiquidoFaturado.replace(',', '.'));
        }, 0);
    }

    private calculoDescontoSolicitado(item): number {
        const valorBrutoSolicitado = parseFloat(item.ValorBrutoSolicitado.replace(',', '.') || 0);
        const valorLiquidoSolicitado = parseFloat(item.ValorLiquidoSolicitado.replace(',', '.') || 0);
        let valorDesconto = ((valorBrutoSolicitado / valorLiquidoSolicitado) - 1) * 100;

        return Math.round(valorDesconto) || 0;
    }

    private calculoDescontoFaturado(item): number {
        const valorBrutoFaturado = parseFloat(item.ValorBrutoFaturado.replace(',', '.') || 0);
        const valorLiquidoFaturado = parseFloat(item.ValorLiquidoFaturado.replace(',', '.') || 0);
        let valorDesconto = ((valorBrutoFaturado / valorLiquidoFaturado) - 1) * 100;

        return Math.round(valorDesconto) || 0;
    }
}
