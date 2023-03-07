export interface Books {
  kind: string;
  totalItems: number;
  items?: (BookEntity)[] | null;
}
export interface BookEntity {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo?: SearchInfo | null;
}
export interface VolumeInfo {
  title: string;
  publisher?: string | null;
  industryIdentifiers?: (IndustryIdentifiersEntity)[] | null;
  readingModes: ReadingModes;
  pageCount: number;
  printType: string;
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary?: PanelizationSummary | null;
  imageLinks?: ImageLinks | null;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  authors?: (string)[] | null;
  description?: string | null;
  averageRating?: number | null;
  ratingsCount?: number | null;
  subtitle?: string | null;
  publishedDate?: string | null;
  categories?: (string)[] | null;
}
export interface IndustryIdentifiersEntity {
  type: string;
  identifier: string;
}
export interface ReadingModes {
  text: boolean;
  image: boolean;
}
export interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}
export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}
export interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice?: ListPriceOrRetailPrice | null;
  retailPrice?: ListPriceOrRetailPrice1 | null;
  buyLink?: string | null;
  offers?: (OffersEntity)[] | null;
}
export interface ListPriceOrRetailPrice {
  amount: number;
  currencyCode: string;
}
export interface ListPriceOrRetailPrice1 {
  amount: number;
  currencyCode: string;
}
export interface OffersEntity {
  finskyOfferType: number;
  listPrice: ListPriceOrRetailPrice2;
  retailPrice: ListPriceOrRetailPrice2;
  giftable: boolean;
}
export interface ListPriceOrRetailPrice2 {
  amountInMicros: number;
  currencyCode: string;
}
export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: PdfOrEpub;
  pdf: PdfOrEpub;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}
export interface PdfOrEpub {
  isAvailable: boolean;
  acsTokenLink?: string | null;
}
export interface SearchInfo {
  textSnippet: string;
}
