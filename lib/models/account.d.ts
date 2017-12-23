declare namespace RevolutSDK {
  interface Account {
    id: UUID;
    name: string;
    balance: number;
    currency: ThreeLettersISOCurrencyCode;
    state: 'active' | 'inactive';
    public: boolean;
    created_at: ISODate;
    updated_at: ISODate;
    type: 'pocket' | 'beneficiary';
  }
}
