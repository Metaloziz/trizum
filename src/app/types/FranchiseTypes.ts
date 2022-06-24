export type ResponseFranchise = {
  shortName: string;
  id: string;
};
export type RequestCreateFranchise = {
  fullName: string;
  shortName: string;
  inn: string;
  legalAddress: string;
  actualAddress: string;
  schoolName: string;
  ogrn: string;
  kpp: string;
  checkingAccount: string;
  phone: string;
  email: string;
  city: string;
  bankBill: string;
  bankName: string;
  bankBIK: string;
  bankINN: string;
  bankKPP: string;
};
export type Franchise = Partial<RequestCreateFranchise> & ResponseFranchise;