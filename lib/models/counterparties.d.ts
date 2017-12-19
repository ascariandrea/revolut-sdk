declare namespace RevolutSDK {

  interface CounterPartyPayload {
    name: string;
    profile_type: 'business' | 'personal';
    phone: string;
    email: string;
  }
  interface CounterParty {
    id: UUID;
    name: string;
    phone: string;
    profile_type: 'business' | 'personal';
    country: string;
    state: 'created' | 'deleted';
    type: 'revolut' | 'external';
    created_at: string;
    updated_at: string;
    accounts: Account[];

  }
}
