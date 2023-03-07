export type FiltersType = {
  download?: DownloadFilterType,
  saleability?: SaleabilityFilterType
}

export type FilterObject = {
  name: string,
  display: string,
  values: string[],
  selectedValue: string
}

export type DownloadFilterType = 'pdf' | 'epub'
export type SaleabilityFilterType = 'NOT_FOR_SALE' | 'FOR_SALE'