export type TUser = {
  paymentDetails: TPaymentDetails;
  notificationSettings: TNotificationSettings | undefined;
  email: string;
  firstName: string;
  lastName?: string;
  image: TImage;
  role: string;
  auctionHistory: [];
  rating: number;
  inventory: TInventory[];
  id: string;
  _id: string;
};

export type TMiniUser = Pick<TUser, "_id" | "email" | "firstName" | "lastName" | "image">;

export interface TCart {
  userId: string;
  items: TInventory[];
  totalItems: 0;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export type TNotificationSettings = {
  biddingUpdate: string;
  paymentUpdate: string;
};

export type TImage = {
  image_url: string;
  key: string;
  id: string;
};

export type TPaymentDetails = {
  settlementAccount: {
    accountName: string;
    accountNumber: string;
    bankCode: string;
    bankName: string;
  };

  escrowAccountNumber: string;
  escrowBank: string;
  escrowAccountName: string;
};

export interface TPaginatedResponse {
  message: string;
  count: number;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface TAuctions extends TPaginatedResponse {
  auctions: TInventory[];
}

export interface TActiveBids extends TPaginatedResponse {
  bids: Bid[];
}

export interface TCategories {
  categories: {
    category: string;
    subcategories: string[];
  }[];
}
export type TPaginationSearchParams = { page: number; limit: number };

export interface TBiddersPerformance extends TPaginatedResponse {
  data: {
    rank: 1;
    bidderAlias: string;
    image: string;
    userId: string;
    totalBidsMade: number;
    totalBidsWon: number;
    badgesEarned: string[];
  }[];
}

export interface TAuctionPerformance extends TPaginatedResponse {
  data: {
    rank: 1;
    item: Pick<TInventory, "title" | "images" | "startingBidAmount" | "slug" | "status">;
    highestBid: number;
    totalBids: number;
    numberOfBidders: number;
    auctionStatus: string;
  }[];
}

export interface TPaymentTransactions extends TPaginatedResponse {
  data: {
    transactionId: string;
    auction: TInventory;
    buyer: TMiniUser;
    payment: Partial<TPayment>;
    id: string;
  }[];
}

interface TPayment {
  status: string;
  paymentMethod: string;
  paymentReference: string;
  auctions: string[];
  buyer: string;
  totalFee: number;
  totalAmount: number;
  receiptUrl: string | undefined;
  beneficiaryAccountNumber: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export type TInventory = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  startingBidAmount: number;
  currentBidAmount: number;
  seller: TMiniUser;
  bids: { bidder: TMiniUser; amount: number; timestamp: Date }[];
  status: "completed" | "ongoing" | "cancelled" | "pending";
  numberOfBidders: 0;
  startTime: Date;
  endTime: Date;
  price: number;
  escrowType: "public" | "private";
  privateUrlLink: string;
  images: TImage[];
  currentBidWinner: string | TMiniUser;
  id: string;
};

export interface TBidDataTable {
  auction: TInventory;
  bids: Bid[];
  isUseInAllBids?: boolean; //to determine if this table is used in auction bids or get all bids
}

export interface TBids extends TPaginatedResponse, TBidDataTable {}

export type TBidders = {
  bids: Bid[];
};

export interface Bid {
  _id: string;
  status: string;
  auction: TInventory;
  bidder: TMiniUser;
  amount: number;
  timestamp: string;
  __v: number;
}

interface Auction {
  _id: string;
  title: string;
  description: string;
  startingBidAmount: number;
  currentBidAmount: number;
  status: string;
  startTime: string;
  endTime: string;
  duration: number;
}

export interface INotification {
  userId: string;
  title: string;
  auctionId: TInventory;
  type: "new_listing" | "bid_status" | "auction_ended" | "payment_reminder" | "watch_list";
  message: string;
  status: "new" | "read";
  timestamp: Date;
  id: string;
}

export interface TBank {
  id: number;
  InstitutionCode: string;
  InstitutionName: string;
  Category: string;
  dump: null | string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  logo: string;
}
