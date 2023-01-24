export const Default = (colorA, colorB, colorC, colorD, colorFont) => {
  return `
		/* GLOBAL */

		/* END GLOBAL */

    /* TOOLBAR */

    .toolbar-background {
      color: ${colorFont} !important;
      background-color: ${colorA} !important;
    }

    /* END TOOLBAR */

    /* SEARCH PDV PAGE */

    page-search-pdv .search {
      background-color: ${colorA};
    }

    page-search-pdv .search .searchContainer {
      color: ${colorFont} !important;
    }

    page-search-pdv .search .searchContainer .item-box-ios {
      background-color: ${colorA};
    }

    page-search-pdv .search .searchContainer button {
      background: transparent !important;
      border: none !important;
    }

    .item-block .item-inner {
      border-botttom-color: ${colorFont} !important;
		}

		page-search-pdv .searchContainer .btn-go-routes {
			background-color: ${colorA};
		}

    /* END SEARCH PDV PAGE */

    /* TABS ICON */

    ion-tabs .tab-button[aria-selected="true"] ion-icon[class*="custom-"] {
      background: ${colorA} !important;
    }

    .tab-button[aria-selected=true] .tab-button-icon {
      color: ${colorA} !important;
    }

    ion-tabs .tab-button ion-icon[class*="custom-"] {
      background: ${hexToRgbA(colorA, 0.4)}; !important;
    }

    .tab-button:hover:not(.disable-hover), .tab-button[aria-selected=true] {
      color: ${colorA} !important;
    }

    .tabs-md[tabsHighlight="true"] .tab-highlight {
      background-color: ${colorA} !important;
    }

    /* END TABS ICON */

    /* COMPONENTS */

    /* ion-toggle checked */
    .toggle-ios.toggle-checked .toggle-icon {
      background-color: ${colorA} !important;
    }

    .toggle-md.toggle-checked .toggle-icon {
      background-color: ${hexToRgbA(colorA, 0.8)} !important;
    }

    .toggle-md.toggle-checked .toggle-inner {
      background-color: ${colorA} !important;
    }
    /* end ion-toggle checked */

    /* ion-radio checked */
    .item-radio-checked ion-label {
      color: ${colorA} !important;
    }

    .radio-checked .radio-inner {
      border-color: ${colorA} !important;
    }
    /* end ion-radio checked */

    /* ion-checkbox */
    .checkbox-checked {
      border-color: ${colorA} !important;
      background: ${colorA} !important;
    }
    /* end ion-checkbox */

    /* fab-button */
    .fab-ios-secondary, .fab-md-secondary {
      color: ${colorFont} !important;
      background-color: ${colorA} !important;
    }

    filter-products .scroll-container .item {
      color: ${colorA} !important;
    }

    filter-products .scroll-container .item.active {
      border-bottom-color: ${colorA} !important;
    }

    /* END COMPONENTS */

    /* PAGE REQUEST DISTRIBUTORS */

    page-requests-distributors .select-payment-deadline .item-radio-checked {
      background-color: ${colorA} !important;
    }

    page-requests-distributors .select-payment-deadline .item-radio-checked ion-label {
      color: ${colorFont} !important;
    }

    /* END PAGE REQUEST DISTRIBUTORS */

    /* PAGE REQUEST PRODUCTS */

    page-requests-products .resultados {
      color: ${colorFont} !important;
      background: ${colorA} !important;
    }

    page-requests-products .button-load-more button {
      color: ${colorFont} !important;
      background: ${colorA} !important;
    }

    /* END PAGE REQUEST PRODUCTS */

    /* PAGE REQUEST FINAL */

    page-requests-final .resultados {
      color: ${colorFont} !important;
      background: ${colorA} !important;
    }

    page-requests-final .inputContainer ion-icon {
      color: ${colorA} !important;
    }

    page-requests-final .segment-button {
      color: ${colorA} !important;
      background-color: ${colorFont} !important;
      border-color: ${colorA} !important;
    }

    page-requests-final .segment-button.segment-activated {
      color: ${colorFont} !important;
      background-color: ${colorA} !important;
      border-color: ${colorA} !important;
    }

    /* END PAGE REQUEST FINAL */

    /* PAGE REQUESTS COMBOS */

    page-requests-combos .resultados {
      color: ${colorFont} !important;
      background: ${colorA} !important;
    }

    page-requests-combos .button-load-more button {
      color: ${colorFont} !important;
      background: ${colorA} !important;
    }

    /* END PAGE REQUESTS COMBOS */

    /* PAGE SYNCRONIZATION */
    page-synchronization ion-card ion-label, page-synchronization ion-card ion-icon {
      color: ${colorA} !important;
    }

    page-synchronization ion-card .icon-sync {
      background: ${colorA} !important;
    }

    /* END PAGE SYNCRONIZATION */

    /* PAGE ROUTE */

    page-routes ion-list ion-card h4,
    page-routes ion-list ion-card ion-icon,
    page-routes ion-list ion-card button p,
    page-routes ion-list ion-list-header ion-icon,
    page-routes ion-list ion-list-header button p,
    page-routes ion-list ion-list-header h4 {
      color: ${colorA} !important;
    }

    page-routes ion-list ion-list-header button,
    page-routes ion-list ion-card button {
      background: transparent !important;
      border: none !important;
    }

    page-routes ion-list ion-card.store-route-card-selected,
    page-routes ion-list ion-card.store-route-card-selected p,
    page-routes ion-list ion-card.store-route-card-selected h2,
    page-routes ion-list ion-card.store-route-card-selected ion-item {
      background: ${colorA} !important;
      color: ${colorFont} !important;
      transition: all 200ms ease-out !important;
      -webkit-transition: all 200ms ease-out !important;
    }

    /* PAGE ROUTE */

    /* PAGE ROUTE ADD */

    page-routes-add ion-list ion-list-header ion-icon,
    page-routes-add ion-list ion-list-header h4,
    page-routes-add .box-results ion-icon {
      color: ${colorA} !important;
    }

    page-routes-add .segment-button {
      color: ${colorFont} !important;
      background-color: ${colorA} !important;
      border-color: ${colorFont} !important;
    }

    page-routes-add .segment-button.segment-activated {
      color: ${colorA} !important;
      background-color: ${colorFont} !important;
      border-color: ${colorFont} !important;
    }

    page-routes-add .segment-button ion-badge {
      color: ${colorA} !important;
      background-color: ${colorFont} !important;
    }

    page-routes-add .segment-button.segment-activated ion-badge {
      color: ${colorFont} !important;
      background-color: ${colorA} !important;
    }

    page-routes-add .btn-add-remove.add-item ion-icon,
    page-routes-add .btn-add-remove.remove-item ion-icon {
      color: ${colorA} !important;
    }

    /* PAGE ROUTE ADD */

    /* PAGE INDUSTRY RESEARCH */

    page-industry-research .bg-same {
      background: ${colorA} !important;
    }

    /* END PAGE INDUSTRY RESEARCH */

    /* PAGE VISITS AND RESEARCHS */

    page-visits .save-button {
      background: none;
      color: ${colorA} !important;
    }

    page-visits .save-button p {
      color: ${colorA} !important;
    }

    page-visits .save-button svg path,
    page-visits .save-button svg rect {
      fill: ${colorA} !important;
    }

    page-visits .selected {
      background-color: ${colorA};
      color: ${colorFont};
    }

    /* END PAGE VISITS AND RESEARCHS */

    /* PAGE RESEARCHS PAGE */

    page-researchs .wrapper ion-list[no-padding] [ion-item] {
      background: #8e9093;
      color: ${colorFont};
    }

    /* END RESEARCHS PAGE */

    /* PAGE RESEARCH ITEM */

    page-research-item [ion-fab] {
      background-color: ${colorA};
      color: ${colorFont};
    }

    /* END PAGE RESEARCH ITEM */

    /* PAGE RESEARCHS */
    page-research-complementary .bg-same,
    page-research-with-step .bg-same,
    page-research-item-add .bg-same  {
      background-color: ${colorA} !important;
      color: ${colorFont} !important;
    }
    /* END PAGE RESEARCH ITEM */

    /* PAGE RESEARCH TRADE */

    page-research-trade .progressbar li.active {
      color: ${colorA} !important;
    }

    page-research-trade .progressbar li.active {
      color: ${colorA} !important;
    }

    page-research-trade .progressbar li.active:before {
      border-color: ${colorA} !important;
      background-color: ${colorA} !important;
    }

    page-research-trade .progressbar li.active+li:after {
      background-color: ${colorA} !important;
    }

    /* END PAGE RESEARCH TRADE */

    /* PAGE ORDERS */
    page-orders .horizontal-list .message-sync,
    page-orders .vertical-list .message-sync {
      color: ${colorA} !important;
    }
    /* END PAGE ORDERS */

    /* PAGE CONTENT LISTING */
    page-content-listing ion-list ion-item button ion-icon {
      color: ${colorA} !important;
    }
    page-content-listing ion-list ion-item ion-spinner * {
      stroke: #bababa !important;
    }
    /* END PAGE CONTENT LISTING */
  `;
};

export function hexToRgbA(hex, opacity) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      "," +
      opacity +
      ")"
    );
  }
}
